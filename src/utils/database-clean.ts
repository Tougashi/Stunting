import { supabase } from '@/lib/supabase';

export interface ParentData {
  id: string;
  fatherName: string;
  motherName: string;
  nik: string;
  childrenCount: number;
  fatherImage: string;
  motherImage: string;
  no_kk: string;
}

export interface ChildData {
  id: string;
  nik: string;
  no_kk: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  gender: string;
  umur_tahun: number;
  umur_bulan: number;
  bb_lahir: number;
  tb_lahir: number;
  lk_lahir: number;
  created_at: string;
  updated_at: string;
  nama: string;
  aktif: boolean;
  image_anak: string | null;
}

export interface AddressData {
  id: string;
  provinsi: string;
  kota: string;
  kecamatan: string;
  desa: string;
  jalan: string;
  kode_pos: string;
  no_kk: string;
}

export interface AnalysisData {
  id: string;
  nik: string;
  tinggi: number;
  berat: number;
  status: string;
  created_at: string;
  image: string | null;
  tanggal_pemeriksaan: string;
}

export const fetchAnalysisDetail = async (scanId: string) => {
  console.log('🔍 Fetching analysis detail for scanId:', scanId);
  
  try {
    // Get analysis data by ID
    const { data: analysisData, error: analysisError } = await supabase
      .from('Analisis')
      .select('*')
      .eq('id', scanId)
      .single();
      
    if (analysisError) {
      console.error('Error fetching analysis data:', analysisError);
      return null;
    }
    
    if (!analysisData) {
      console.log('Analysis not found');
      return null;
    }
    
    console.log('✅ Analysis data found:', analysisData);
    
    // Get child data using nik from analysis
    const { data: childData, error: childError } = await supabase
      .from('DataAnak')
      .select('*')
      .eq('nik', analysisData.nik)
      .single();
      
    if (childError) {
      console.error('Error fetching child data:', childError);
    }
    
    console.log('✅ Child data found:', childData);
    
    const result = {
      analysis: analysisData,
      child: childData
    };
    
    console.log('✅ Final analysis detail result:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Error fetching analysis detail:', error);
    return null;
  }
};

export const deleteAnalysis = async (scanId: string) => {
  console.log('🗑️ Deleting analysis with scanId:', scanId);
  
  try {
    // First, get the analysis data to know the image path
    const { data: analysisData, error: fetchError } = await supabase
      .from('Analisis')
      .select('*')
      .eq('id', scanId)
      .single();
      
    if (fetchError) {
      console.error('Error fetching analysis for delete:', fetchError);
      throw fetchError;
    }
    
    if (!analysisData) {
      throw new Error('Analysis not found');
    }
    
    console.log('✅ Analysis data found for deletion:', analysisData);
    
    // Delete image from storage if exists
    if (analysisData.image) {
      console.log('🖼️ Deleting image from storage:', analysisData.image);
      
      // Extract the file path from the image URL or use the image field directly
      let imagePath = analysisData.image;
      
      // If image field contains full URL, extract the path
      if (imagePath.startsWith('https://')) {
        // Extract path after /storage/v1/object/public/
        const pathMatch = imagePath.match(/\/storage\/v1\/object\/public\/(.+)$/);
        if (pathMatch) {
          imagePath = pathMatch[1];
        }
      }
      
      console.log('📁 Image path for deletion:', imagePath);
      
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('pemindaian')
        .remove([imagePath]);
        
      if (storageError) {
        console.error('Error deleting image from storage:', storageError);
        // Don't throw error here, continue with database deletion
        // The image might not exist or path might be wrong
      } else {
        console.log('✅ Image deleted from storage successfully');
      }
    }
    
    // Delete analysis record from database
    const { error: deleteError } = await supabase
      .from('Analisis')
      .delete()
      .eq('id', scanId);
      
    if (deleteError) {
      console.error('Error deleting analysis from database:', deleteError);
      throw deleteError;
    }
    
    console.log('✅ Analysis deleted from database successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Error deleting analysis:', error);
    throw error;
  }
};

export interface NewChildData {
  nik: string;
  no_kk: string;
  nama: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  gender: string;
  umur_tahun: number;
  umur_bulan: number;
  bb_lahir: number;
  tb_lahir: number;
  lk_lahir: number;
  image_anak?: string | null;
  aktif: boolean;
}

export const insertChildData = async (childData: NewChildData) => {
  console.log('➕ Inserting new child data:', childData);
  
  try {
    // Validate that no_kk exists in DataOrangTua
    const { data: parentExists, error: parentError } = await supabase
      .from('DataOrangTua')
      .select('no_kk')
      .eq('no_kk', childData.no_kk)
      .limit(1);
      
    if (parentError) {
      console.error('Error checking parent existence:', parentError);
      throw parentError;
    }
    
    if (!parentExists || parentExists.length === 0) {
      throw new Error('No_kk tidak ditemukan dalam data orang tua');
    }
    
    // Check if NIK already exists
    const { data: existingChild, error: checkError } = await supabase
      .from('DataAnak')
      .select('nik')
      .eq('nik', childData.nik)
      .limit(1);
      
    if (checkError) {
      console.error('Error checking existing NIK:', checkError);
      throw checkError;
    }
    
    if (existingChild && existingChild.length > 0) {
      throw new Error('NIK anak sudah terdaftar');
    }
    
    // Insert child data
    const { data: insertedChild, error: insertError } = await supabase
      .from('DataAnak')
      .insert([childData])
      .select()
      .single();
      
    if (insertError) {
      console.error('Error inserting child data:', insertError);
      throw insertError;
    }
    
    console.log('✅ Child data inserted successfully:', insertedChild);
    return insertedChild;
    
  } catch (error) {
    console.error('❌ Error inserting child data:', error);
    throw error;
  }
};

export const uploadChildImage = async (file: File, nik: string): Promise<string> => {
  console.log('📤 Uploading child image for NIK:', nik);
  
  try {
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${nik}-${timestamp}.${fileExtension}`;
    const filePath = `${nik}/${fileName}`;
    
    console.log('📁 Upload path:', filePath);
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('anak')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }
    
    console.log('✅ Image uploaded successfully:', uploadData);
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('anak')
      .getPublicUrl(filePath);
    
    console.log('🔗 Public URL:', publicUrl);
    return publicUrl;
    
  } catch (error) {
    console.error('❌ Error uploading child image:', error);
    throw error;
  }
};

export const fetchParentsData = async (): Promise<ParentData[]> => {
  try {
    // Get all parents data
    const { data: parentsData, error: parentsError } = await supabase
      .from('DataOrangTua')
      .select('nik, nama, role, no_kk, image_orangtua')
      .in('role', ['ayah', 'ibu']);
      
    console.log('Raw parents data:', parentsData);
      
    if (parentsError) throw parentsError;
    if (!parentsData) return [];
    
    // Get children count
    const { data: childrenData } = await supabase
      .from('DataAnak')
      .select('no_kk');
    
    console.log('Raw children data:', childrenData);
    
    // Count children per family
    const childrenCount: { [key: string]: number } = {};
    childrenData?.forEach(child => {
      childrenCount[child.no_kk] = (childrenCount[child.no_kk] || 0) + 1;
    });
    
    console.log('Children count per family:', childrenCount);
    
    // Group parents by no_kk
    const familyMap = new Map<string, { 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      father?: Record<string, any>, 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      mother?: Record<string, any>, 
      no_kk: string,
      childrenCount: number 
    }>();
    
    parentsData.forEach(parent => {
      if (!familyMap.has(parent.no_kk)) {
        familyMap.set(parent.no_kk, {
          no_kk: parent.no_kk,
          childrenCount: childrenCount[parent.no_kk] || 0
        });
      }
      
      const family = familyMap.get(parent.no_kk)!;
      if (parent.role === 'ayah') {
        family.father = parent;
      } else if (parent.role === 'ibu') {
        family.mother = parent;
      }
    });
    
    console.log('Family map after grouping:', Array.from(familyMap.entries()));
    
    // Convert to result format
    const result = Array.from(familyMap.values())
      .map((family, index) => ({
        id: String(index + 1),
        fatherName: family.father?.nama || 'Tidak ada',
        motherName: family.mother?.nama || 'Tidak ada', 
        nik: family.no_kk,
        childrenCount: family.childrenCount,
        fatherImage: family.father?.image_orangtua || '/image/icon/pengukuran-anak.jpg',
        motherImage: family.mother?.image_orangtua || '/image/icon/pengukuran-anak.jpg',
        no_kk: family.no_kk,
      }));

    console.log('Final mapped result:', result);
    return result;
    
  } catch (error) {
    console.error('Error fetching parents data:', error);
    throw error;
  }
};

export const fetchChildrenData = async (): Promise<ChildData[]> => {
  try {
    console.log('🔄 Fetching children data from DataAnak...');
    
    // Get all children data
    const { data: childrenData, error: childrenError } = await supabase
      .from('DataAnak')
      .select('*')
      .order('created_at', { ascending: false });
      
    console.log('Raw children data:', childrenData);
      
    if (childrenError) {
      console.error('Error fetching children data:', childrenError);
      throw childrenError;
    }
    
    if (!childrenData) {
      console.log('No children data found');
      return [];
    }
    
    // Map data to match expected format
    const result: ChildData[] = childrenData.map(child => ({
      id: child.nik, // Using NIK as ID
      nik: child.nik,
      no_kk: child.no_kk,
      tanggal_lahir: child.tanggal_lahir,
      tempat_lahir: child.tempat_lahir,
      gender: child.gender,
      umur_tahun: child.umur_tahun || 0,
      umur_bulan: child.umur_bulan || 0,
      bb_lahir: child.bb_lahir,
      tb_lahir: child.tb_lahir,
      lk_lahir: child.lk_lahir,
      created_at: child.created_at,
      updated_at: child.updated_at,
      nama: child.nama,
      aktif: child.aktif,
      image_anak: child.image_anak
    }));

    console.log('✅ Final children data:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Error fetching children data:', error);
    throw error;
  }
};

export const fetchChildDetailWithParents = async (childNik: string): Promise<{
  child: ChildData | null;
  father: any | null;
  mother: any | null;
}> => {
  try {
    console.log('🔄 Fetching child detail for NIK:', childNik);
    
    // Get child data
    const { data: childData, error: childError } = await supabase
      .from('DataAnak')
      .select('*')
      .eq('nik', childNik)
      .single();
      
    if (childError) {
      console.error('Error fetching child data:', childError);
      throw childError;
    }
    
    if (!childData) {
      console.log('Child not found');
      return { child: null, father: null, mother: null };
    }
    
    console.log('✅ Child data found:', childData);
    
    // Get parents data using no_kk
    const { data: parentsData, error: parentsError } = await supabase
      .from('DataOrangTua')
      .select('*')
      .eq('no_kk', childData.no_kk)
      .in('role', ['ayah', 'ibu']);
      
    if (parentsError) {
      console.error('Error fetching parents data:', parentsError);
    }
    
    console.log('✅ Parents data found:', parentsData);
    
    // Get address data using no_kk
    const { data: addressData, error: addressError } = await supabase
      .from('Alamat')
      .select('*')
      .eq('no_kk', childData.no_kk)
      .single();
      
    if (addressError) {
      console.error('Error fetching address data:', addressError);
    }
    
    console.log('✅ Address data found:', addressData);
    
    // Get analysis/scan history data using child's nik
    const { data: analysisData, error: analysisError } = await supabase
      .from('Analisis')
      .select('*')
      .eq('nik', childNik)
      .order('tanggal_pemeriksaan', { ascending: false });
      
    if (analysisError) {
      console.error('Error fetching analysis data:', analysisError);
    }
    
    console.log('✅ Analysis data found:', analysisData);
    
    // Separate father and mother
    const father = parentsData?.find(parent => parent.role === 'ayah') || null;
    const mother = parentsData?.find(parent => parent.role === 'ibu') || null;
    
    const result = {
      child: {
        id: childData.nik,
        nik: childData.nik,
        no_kk: childData.no_kk,
        tanggal_lahir: childData.tanggal_lahir,
        tempat_lahir: childData.tempat_lahir,
        gender: childData.gender,
        umur_tahun: childData.umur_tahun || 0,
        umur_bulan: childData.umur_bulan || 0,
        bb_lahir: childData.bb_lahir,
        tb_lahir: childData.tb_lahir,
        lk_lahir: childData.lk_lahir,
        created_at: childData.created_at,
        updated_at: childData.updated_at,
        nama: childData.nama,
        aktif: childData.aktif,
        image_anak: childData.image_anak
      },
      father,
      mother,
      address: addressData,
      analysisHistory: analysisData || []
    };
    
    console.log('✅ Final child detail result:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Error fetching child detail:', error);
    throw error;
  }
};

// Interface for updating child data
export interface UpdateChildData {
  nik: string;
  nama: string;
  tanggal_lahir: string;
  tempat_lahir: string;
  gender: string;
  umur_tahun: number;
  umur_bulan: number;
  bb_lahir: number;
  tb_lahir: number;
  lk_lahir: number;
  image_anak?: string | null;
}

// Fetch single child by NIK
export const fetchChildByNik = async (nik: string): Promise<ChildData | null> => {
  try {
    console.log('🔍 Fetching child by NIK:', nik);
    
    const { data: childData, error } = await supabase
      .from('DataAnak')
      .select('*')
      .eq('nik', nik)
      .eq('aktif', true)
      .single();
      
    if (error) {
      console.error('Error fetching child:', error);
      throw error;
    }
    
    if (!childData) {
      console.log('Child not found');
      return null;
    }
    
    console.log('✅ Child data found:', childData);
    return childData;
    
  } catch (error) {
    console.error('❌ Error fetching child by NIK:', error);
    throw error;
  }
};

// Update child data by NIK
export const updateChildData = async (nik: string, childData: UpdateChildData): Promise<void> => {
  try {
    console.log('📝 Updating child data for NIK:', nik);
    console.log('📋 Update data:', childData);
    
    const { error } = await supabase
      .from('DataAnak')
      .update({
        ...childData,
        updated_at: new Date().toISOString()
      })
      .eq('nik', nik);
      
    if (error) {
      console.error('Error updating child:', error);
      throw error;
    }
    
    console.log('✅ Child data updated successfully');
    
  } catch (error) {
    console.error('❌ Error updating child data:', error);
    throw error;
  }
};

// Delete child image from storage
export const deleteChildImage = async (imageUrl: string): Promise<void> => {
  try {
    console.log('🗑️ Deleting image from storage:', imageUrl);
    
    if (!imageUrl) {
      console.log('No image URL provided');
      return;
    }
    
    // Extract path from full URL
    // Example: https://kgswlhiolxopunygghrs.supabase.co/storage/v1/object/public/anak/NIK/filename.jpg
    const pathMatch = imageUrl.match(/\/storage\/v1\/object\/public\/anak\/(.+)$/);
    
    if (!pathMatch) {
      console.error('Could not extract path from image URL:', imageUrl);
      return;
    }
    
    const imagePath = pathMatch[1];
    console.log('📁 Extracted image path:', imagePath);
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('anak')
      .remove([imagePath]);
      
    if (storageError) {
      console.error('Error deleting image from storage:', storageError);
      // Don't throw error, just log it as image deletion shouldn't block the update
    } else {
      console.log('✅ Image deleted from storage successfully');
    }
    
  } catch (error) {
    console.error('❌ Error deleting child image:', error);
    // Don't throw error, just log it
  }
};

// Interface for new parent data
export interface NewParentData {
  father: {
    nik: string;
    nama: string;
    no_hp: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    role: 'ayah';
    image_orangtua?: string | null;
  };
  mother: {
    nik: string;
    nama: string;
    no_hp: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    role: 'ibu';
    image_orangtua?: string | null;
  };
  family: {
    no_kk: string;
  };
  address: {
    provinsi: string;
    kota: string;
    kecamatan: string;
    desa: string;
    jalan: string;
    kode_pos: string;
  };
}

// Upload parent image to storage
export const uploadParentImage = async (file: File, nik: string): Promise<string> => {
  console.log('📤 Uploading parent image for NIK:', nik);
  
  try {
    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${nik}-${timestamp}.${fileExtension}`;
    const filePath = `${nik}/${fileName}`;
    
    console.log('📁 Upload path:', filePath);
    
    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('orang-tua')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
      
    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }
    
    console.log('✅ Image uploaded successfully:', uploadData);
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('orang-tua')
      .getPublicUrl(filePath);
      
    console.log('🔗 Public URL:', publicUrl);
    return publicUrl;
    
  } catch (error) {
    console.error('❌ Error uploading parent image:', error);
    throw error;
  }
};

// Delete parent image from storage
export const deleteParentImage = async (imageUrl: string): Promise<void> => {
  try {
    console.log('🗑️ Deleting parent image from storage:', imageUrl);
    
    if (!imageUrl) {
      console.log('No image URL provided');
      return;
    }
    
    // Extract path from full URL
    const pathMatch = imageUrl.match(/\/storage\/v1\/object\/public\/orang-tua\/(.+)$/);
    
    if (!pathMatch) {
      console.error('Could not extract path from parent image URL:', imageUrl);
      return;
    }
    
    const imagePath = pathMatch[1];
    console.log('📁 Extracted parent image path:', imagePath);
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('orang-tua')
      .remove([imagePath]);
      
    if (storageError) {
      console.error('Error deleting parent image from storage:', storageError);
    } else {
      console.log('✅ Parent image deleted from storage successfully');
    }
    
  } catch (error) {
    console.error('❌ Error deleting parent image:', error);
  }
};

// Fetch parent detail by no_kk (family number)
export const fetchParentDetailByNoKK = async (no_kk: string) => {
  try {
    console.log('🔍 Fetching parent detail for no_kk:', no_kk);
    
    // Get parents data
    const { data: parentsData, error: parentsError } = await supabase
      .from('DataOrangTua')
      .select('*')
      .eq('no_kk', no_kk)
      .in('role', ['ayah', 'ibu']);
      
    if (parentsError) {
      console.error('Error fetching parents data:', parentsError);
      throw parentsError;
    }
    
    if (!parentsData || parentsData.length === 0) {
      console.log('Parents not found');
      return null;
    }
    
    console.log('✅ Parents data found:', parentsData);
    
    // Get address data
    const { data: addressData, error: addressError } = await supabase
      .from('Alamat')
      .select('*')
      .eq('no_kk', no_kk)
      .single();
      
    if (addressError) {
      console.error('Error fetching address data:', addressError);
    }
    
    console.log('✅ Address data found:', addressData);
    
    // Get children data
    const { data: childrenData, error: childrenError } = await supabase
      .from('DataAnak')
      .select('*')
      .eq('no_kk', no_kk)
      .eq('aktif', true)
      .order('created_at', { ascending: false });
      
    if (childrenError) {
      console.error('Error fetching children data:', childrenError);
    }
    
    console.log('✅ Children data found:', childrenData);
    
    // Separate father and mother
    const father = parentsData.find(parent => parent.role === 'ayah') || null;
    const mother = parentsData.find(parent => parent.role === 'ibu') || null;
    
    const result = {
      father,
      mother,
      address: addressData,
      children: childrenData || [],
      family: {
        no_kk: no_kk,
        childrenCount: childrenData ? childrenData.length : 0
      }
    };
    
    console.log('✅ Final parent detail result:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Error fetching parent detail:', error);
    throw error;
  }
};

// Insert parent data (Family -> Parents -> Address)
export const insertParentData = async (parentData: NewParentData, fatherImageFile?: File, motherImageFile?: File): Promise<void> => {
  try {
    console.log('📝 Starting parent data insertion process');
    console.log('📋 Parent data:', parentData);
    
    // Step 1: Insert DataKeluarga
    console.log('1️⃣ Inserting family data...');
    const { error: familyError } = await supabase
      .from('DataKeluarga')
      .insert({
        no_kk: parentData.family.no_kk,
        created_at: new Date().toISOString()
      });
      
    if (familyError) {
      console.error('Error inserting family data:', familyError);
      throw familyError;
    }
    console.log('✅ Family data inserted successfully');

    // Step 2: Upload images if provided
    let fatherImageUrl: string | null = null;
    let motherImageUrl: string | null = null;
    
    if (fatherImageFile) {
      try {
        console.log('📤 Uploading father image...');
        fatherImageUrl = await uploadParentImage(fatherImageFile, parentData.father.nik);
        console.log('✅ Father image uploaded:', fatherImageUrl);
      } catch (imageError) {
        console.error('⚠️ Error uploading father image:', imageError);
        // Continue without image
      }
    }
    
    if (motherImageFile) {
      try {
        console.log('📤 Uploading mother image...');
        motherImageUrl = await uploadParentImage(motherImageFile, parentData.mother.nik);
        console.log('✅ Mother image uploaded:', motherImageUrl);
      } catch (imageError) {
        console.error('⚠️ Error uploading mother image:', imageError);
        // Continue without image
      }
    }

    // Step 3: Insert DataOrangTua (Father and Mother)
    console.log('2️⃣ Inserting parents data...');
    
    const parentsToInsert = [
      {
        ...parentData.father,
        no_kk: parentData.family.no_kk,
        image_orangtua: fatherImageUrl,
        created_at: new Date().toISOString()
      },
      {
        ...parentData.mother,
        no_kk: parentData.family.no_kk,
        image_orangtua: motherImageUrl,
        created_at: new Date().toISOString()
      }
    ];
    
    const { error: parentsError } = await supabase
      .from('DataOrangTua')
      .insert(parentsToInsert);
      
    if (parentsError) {
      console.error('Error inserting parents data:', parentsError);
      throw parentsError;
    }
    console.log('✅ Parents data inserted successfully');

    // Step 4: Insert Alamat
    console.log('3️⃣ Inserting address data...');
    const { error: addressError } = await supabase
      .from('Alamat')
      .insert({
        ...parentData.address,
        no_kk: parentData.family.no_kk,
        created_at: new Date().toISOString()
      });
      
    if (addressError) {
      console.error('Error inserting address data:', addressError);
      throw addressError;
    }
    console.log('✅ Address data inserted successfully');
    
    console.log('🎉 All parent data inserted successfully!');
    
  } catch (error) {
    console.error('❌ Error in parent data insertion process:', error);
    throw error;
  }
};

// Update parent data
export const updateParentData = async (no_kk: string, parentData: any, fatherImageFile?: File, motherImageFile?: File) => {
  console.log('🔄 Starting parent data update process for No KK:', no_kk);
  
  try {
    // Step 1: Handle image uploads if provided
    let fatherImageUrl = parentData.father?.image;
    let motherImageUrl = parentData.mother?.image;
    
    if (fatherImageFile) {
      console.log('📤 Uploading new father image...');
      fatherImageUrl = await uploadParentImage(fatherImageFile, parentData.father.nik);
    }
    
    if (motherImageFile) {
      console.log('📤 Uploading new mother image...');
      motherImageUrl = await uploadParentImage(motherImageFile, parentData.mother.nik);
    }

    // Step 2: Update father data
    console.log('1️⃣ Updating father data...');
    const { error: fatherError } = await supabase
      .from('DataOrangTua')
      .update({
        nama: parentData.father.name,
        nik: parentData.father.nik,
        no_hp: parentData.father.phone,
        tempat_lahir: parentData.father.birthPlace,
        tanggal_lahir: parentData.father.birthDate,
        image_orangtua: fatherImageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('no_kk', no_kk)
      .eq('nik', parentData.father.nik);
      
    if (fatherError) {
      console.error('Error updating father data:', fatherError);
      throw fatherError;
    }
    console.log('✅ Father data updated successfully');

    // Step 3: Update mother data
    console.log('2️⃣ Updating mother data...');
    const { error: motherError } = await supabase
      .from('DataOrangTua')
      .update({
        nama: parentData.mother.name,
        nik: parentData.mother.nik,
        no_hp: parentData.mother.phone,
        tempat_lahir: parentData.mother.birthPlace,
        tanggal_lahir: parentData.mother.birthDate,
        image_orangtua: motherImageUrl,
        updated_at: new Date().toISOString()
      })
      .eq('no_kk', no_kk)
      .eq('nik', parentData.mother.nik);
      
    if (motherError) {
      console.error('Error updating mother data:', motherError);
      throw motherError;
    }
    console.log('✅ Mother data updated successfully');

    // Step 4: Update family data (No KK)
    console.log('3️⃣ Updating family data...');
    const { error: familyError } = await supabase
      .from('DataKeluarga')
      .update({
        no_kk: parentData.family.kk,
        updated_at: new Date().toISOString()
      })
      .eq('no_kk', no_kk);
      
    if (familyError) {
      console.error('Error updating family data:', familyError);
      throw familyError;
    }
    console.log('✅ Family data updated successfully');

    // Step 5: Update address data
    console.log('4️⃣ Updating address data...');
    const { error: addressError } = await supabase
      .from('Alamat')
      .update({
        provinsi: parentData.address.provinsi,
        kota: parentData.address.kota,
        kecamatan: parentData.address.kecamatan,
        desa: parentData.address.desa,
        jalan: parentData.address.detail,
        kode_pos: parentData.address.kodePos,
        updated_at: new Date().toISOString()
      })
      .eq('no_kk', no_kk);
      
    if (addressError) {
      console.error('Error updating address data:', addressError);
      throw addressError;
    }
    console.log('✅ Address data updated successfully');
    
    console.log('🎉 All parent data updated successfully!');
    
  } catch (error) {
    console.error('❌ Error in parent data update process:', error);
    throw error;
  }
};

// Delete analysis image from storage
export const deleteAnalysisImage = async (imageUrl: string): Promise<void> => {
  try {
    console.log('🗑️ Deleting analysis image from storage:', imageUrl);
    
    if (!imageUrl) {
      console.log('No analysis image URL provided');
      return;
    }
    
    // Extract path from full URL
    // Analysis images are typically stored in 'anak' bucket under analysis folder
    const pathMatch = imageUrl.match(/\/storage\/v1\/object\/public\/anak\/(.+)$/);
    
    if (!pathMatch) {
      console.error('Could not extract path from analysis image URL:', imageUrl);
      return;
    }
    
    const imagePath = pathMatch[1];
    console.log('📁 Extracted analysis image path:', imagePath);
    
    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('anak')
      .remove([imagePath]);
      
    if (storageError) {
      console.error('Error deleting analysis image from storage:', storageError);
    } else {
      console.log('✅ Analysis image deleted from storage successfully');
    }
    
  } catch (error) {
    console.error('❌ Error deleting analysis image:', error);
  }
};

// Delete parent data and all related data
export const deleteParentData = async (no_kk: string) => {
  console.log('🗑️ Starting parent data deletion process for No KK:', no_kk);
  
  try {
    // Step 1: Get all related data before deletion to collect image URLs
    console.log('1️⃣ Fetching all related data to collect image URLs...');
    
    // Get parent images
    const { data: parentData, error: parentError } = await supabase
      .from('DataOrangTua')
      .select('image_orangtua')
      .eq('no_kk', no_kk);
      
    if (parentError) {
      console.error('Error fetching parent data:', parentError);
    }
    
    // Get children images and NIKs
    const { data: childrenData, error: childrenError } = await supabase
      .from('DataAnak')
      .select('image_anak, nik')
      .eq('no_kk', no_kk);
      
    if (childrenError) {
      console.error('Error fetching children data:', childrenError);
    }
    
    // Get analysis images
    const { data: analysisData, error: analysisError } = await supabase
      .from('Analisis')
      .select('image, nik')
      .in('nik', 
        childrenData?.map(child => child.nik) || []
      );
      
    if (analysisError) {
      console.error('Error fetching analysis data:', analysisError);
    }

    // Step 2: Delete all images from storage
    console.log('2️⃣ Deleting all related images from storage...');
    
    // Delete parent images
    if (parentData && parentData.length > 0) {
      for (const parent of parentData) {
        if (parent.image_orangtua && parent.image_orangtua !== '/image/icon/pengukuran-anak.jpg') {
          try {
            await deleteParentImage(parent.image_orangtua);
          } catch (error) {
            console.error('Error deleting parent image:', error);
          }
        }
      }
    }
    
    // Delete children images
    if (childrenData && childrenData.length > 0) {
      for (const child of childrenData) {
        if (child.image_anak && child.image_anak !== '/image/icon/pengukuran-anak.jpg') {
          try {
            await deleteChildImage(child.image_anak);
          } catch (error) {
            console.error('Error deleting child image:', error);
          }
        }
      }
    }
    
    // Delete analysis images
    if (analysisData && analysisData.length > 0) {
      for (const analysis of analysisData) {
        if (analysis.image) {
          try {
            await deleteAnalysisImage(analysis.image);
          } catch (error) {
            console.error('Error deleting analysis image:', error);
          }
        }
      }
    }

    // Step 3: Delete database records (with CASCADE)
    console.log('3️⃣ Deleting family data (will cascade delete all related data)...');
    
    const { error: deleteError } = await supabase
      .from('DataKeluarga')
      .delete()
      .eq('no_kk', no_kk);
      
    if (deleteError) {
      console.error('Error deleting family data:', deleteError);
      throw deleteError;
    }
    
    console.log('✅ All images and data deleted successfully!');
    console.log('🎉 Parent deletion completed!');
    
  } catch (error) {
    console.error('❌ Error in parent data deletion process:', error);
    throw error;
  }
};