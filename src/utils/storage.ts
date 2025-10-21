import { supabase } from '@/lib/supabase';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
  fileName?: string;
}

export const uploadProfileImage = async (
  file: File,
  userId: string
): Promise<UploadResult> => {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'File type not supported. Please use JPEG, PNG, or WebP.'
      };
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File size too large. Maximum size is 5MB.'
      };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;

    // Upload file to Supabase Storage
    const { error } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: 'Failed to upload image. Please try again.'
      };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);

    return {
      success: true,
      url: urlData.publicUrl
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
};

export const deleteProfileImage = async (userId: string): Promise<boolean> => {
  try {
    // List all files with userId prefix
    const { data: files, error: listError } = await supabase.storage
      .from('profile-images')
      .list('', {
        search: userId
      });

    if (listError) {
      console.error('List error:', listError);
      return false;
    }

    if (!files || files.length === 0) {
      return true; // No files to delete
    }

    // Extract filenames
    const fileNames = files.map(file => file.name);

    // Delete all files with userId prefix
    const { error } = await supabase.storage
      .from('profile-images')
      .remove(fileNames);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Delete error:', error);
    return false;
  }
};

export const getTempImageUrl = (fileName: string): string => {
  const { data } = supabase.storage
    .from('temp')
    .getPublicUrl(fileName);
  
  return data.publicUrl;
};

export const uploadTempImage = async (
  file: File,
  fileName: string
): Promise<UploadResult> => {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'File type not supported. Please use JPEG, PNG, or WebP.'
      };
    }

    // Upload file to temp bucket
    const { error } = await supabase.storage
      .from('temp')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true // Allow overwriting
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: 'Failed to upload image. Please try again.'
      };
    }

    // Get public URL
    const url = getTempImageUrl(fileName);

    return {
      success: true,
      url
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
};

export const uploadTempImageWithPath = async (
  blob: Blob,
  childNik: string,
  timestamp: string
): Promise<UploadResult> => {
  try {
    // Validate blob type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(blob.type)) {
      return {
        success: false,
        error: 'File type not supported. Please use JPEG, PNG, or WebP.'
      };
    }

    // Create structured path: childNik/timestamp/capture.jpg
    const fileName = `${childNik}/${timestamp}/capture.jpg`;
    
    console.log('📁 Uploading to temp bucket with path:', fileName);

    // Upload file to temp bucket with structured path
    const { error } = await supabase.storage
      .from('temp')
      .upload(fileName, blob, {
        cacheControl: '3600',
        upsert: true // Allow overwriting
      });

    if (error) {
      console.error('Upload error:', error);
      return {
        success: false,
        error: 'Failed to upload image. Please try again.'
      };
    }

    // Get public URL
    const url = getTempImageUrl(fileName);

    console.log('✅ Upload successful, URL:', url);

    return {
      success: true,
      url,
      fileName // Return the structured path for reference
    };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.'
    };
  }
};

export const downloadProcessedImage = async (
  apiBaseUrl: string,
  imageName: string
): Promise<Blob | null> => {
  try {
    const downloadUrl = `${apiBaseUrl}/images/${imageName}`;
    console.log('📥 Downloading processed image from:', downloadUrl);
    console.log('🔍 API Base URL:', apiBaseUrl);
    console.log('🖼️ Image Name:', imageName);
    
    const response = await fetch(downloadUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'accept': 'image/*',
      },
    });
    
    console.log('📡 Download response:', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    if (!response.ok) {
      console.error('❌ Failed to download processed image:', response.status, response.statusText);
      
      // Try alternative endpoints
      const alternatives = [
        `${apiBaseUrl}/result/${imageName}`,
        `${apiBaseUrl}/processed/${imageName}`,
        `${apiBaseUrl}/output/${imageName}`
      ];
      
      for (const altUrl of alternatives) {
        console.log('🔄 Trying alternative endpoint:', altUrl);
        try {
          const altResponse = await fetch(altUrl, {
            method: 'GET',
            mode: 'cors',
            headers: {
              'accept': 'image/*',
            },
          });
          
          if (altResponse.ok) {
            console.log('✅ Success with alternative endpoint:', altUrl);
            const blob = await altResponse.blob();
            console.log('✅ Downloaded processed image via alternative:', {
              size: blob.size,
              type: blob.type,
              endpoint: altUrl
            });
            return blob;
          }
        } catch (altError) {
          console.log('❌ Alternative endpoint failed:', altUrl, altError);
        }
      }
      
      return null;
    }
    
    const blob = await response.blob();
    console.log('✅ Downloaded processed image successfully:', {
      size: blob.size,
      type: blob.type,
      url: downloadUrl
    });
    
    return blob;
  } catch (error) {
    console.error('❌ Error downloading processed image:', error);
    return null;
  }
};
