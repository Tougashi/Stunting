import { supabase } from '@/lib/supabase';

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
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
