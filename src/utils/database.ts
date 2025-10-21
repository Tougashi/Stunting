import { supabase } from '@/lib/supabase';

// Test RLS and permissions
export const testRLSAndPermissions = async () => {
  try {
    console.log('Testing RLS and permissions...');
    
    // Test 1: Try to get all data from DataOrangTua
    const { data: allData, error: allError } = await supabase
      .from('DataOrangTua')
      .select('*');
    
    console.log('All DataOrangTua data:', { allData, allError });
    console.log('Number of records:', allData?.length || 0);
    
    // Test 2: Try to get all data from DataKeluarga
    const { data: keluargaData, error: keluargaError } = await supabase
      .from('DataKeluarga')
      .select('*');
    
    console.log('All DataKeluarga data:', { keluargaData, keluargaError });
    console.log('Number of families:', keluargaData?.length || 0);
    
    // Test 3: Try to get all data from DataAnak
    const { data: anakData, error: anakError } = await supabase
      .from('DataAnak')
      .select('*');
    
    console.log('All DataAnak data:', { anakData, anakError });
    console.log('Number of children:', anakData?.length || 0);
    
    return { success: true };
  } catch (err) {
    console.error('RLS test failed:', err);
    return { success: false, error: err };
  }
};

// Test function to check Supabase connection
export const testSupabaseConnection = async () => {
  try {
    console.log('Testing Supabase connection with correct flow...');
    
    // Test 1: DataKeluarga (Primary table)
    console.log('Testing DataKeluarga...');
    const { data: familiesData, error: familiesError } = await supabase
      .from('DataKeluarga')
      .select('no_kk')
      .limit(1);
    
    console.log('DataKeluarga result:', { familiesData, familiesError });
    
    if (familiesError) {
      console.error('DataKeluarga failed:', familiesError);
      return { success: false, error: familiesError };
    }
    
    // Test 2: DataOrangTua (Foreign table)
    console.log('Testing DataOrangTua...');
    const { data: parentsData, error: parentsError } = await supabase
      .from('DataOrangTua')
      .select('nik, nama, role, no_kk')
      .limit(1);
    
    console.log('DataOrangTua result:', { parentsData, parentsError });
    
    if (parentsError) {
      console.error('DataOrangTua failed:', parentsError);
      return { success: false, error: parentsError };
    }
    
    // Test 3: DataAnak (Foreign table)
    console.log('Testing DataAnak...');
    const { data: childrenData, error: childrenError } = await supabase
      .from('DataAnak')
      .select('no_kk')
      .limit(1);
    
    console.log('DataAnak result:', { childrenData, childrenError });
    
    if (childrenError) {
      console.error('DataAnak failed:', childrenError);
      return { success: false, error: childrenError };
    }
    
    console.log('✅ All tables accessible!');
    return { 
      success: true, 
      error: null, 
      data: { familiesData, parentsData, childrenData } 
    };
  } catch (err) {
    console.error('Supabase connection test failed:', err);
    return { success: false, error: err };
  }
};

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

export const fetchParentsData = async (): Promise<ParentData[]> => {
  try {
    console.log('🚀 Starting to fetch parents data...');
    
    // Direct approach: Get all parents from DataOrangTua
    console.log('📋 Step 1: Fetching all parents from DataOrangTua...');
    const { data: allParentsData, error: allParentsError } = await supabase
      .from('DataOrangTua')
      .select('nik, nama, role, no_kk');
      
    console.log('👥 All parents data:', { allParentsData, allParentsError });
    console.log('📊 Number of parents found:', allParentsData?.length || 0);
    
    if (allParentsError) {
      console.error('❌ Error fetching parents data:', allParentsError);
      throw allParentsError;
    }
    
    if (!allParentsData || allParentsData.length === 0) {
      console.log('⚠️ No parents found in DataOrangTua');
      return [];
    }
    
    // Extract unique no_kk from parents
    const uniqueNoKk = [...new Set(allParentsData.map(parent => parent.no_kk))];
    console.log('🏠 Unique no_kk from parents:', uniqueNoKk);
    
    // Get children count for these families
    console.log('👶 Step 2: Fetching children count from DataAnak...');
    const { data: childrenData, error: childrenError } = await supabase
      .from('DataAnak')
      .select('no_kk')
      .in('no_kk', uniqueNoKk);
      
    console.log('👶 Children data result:', { childrenData, childrenError });
    console.log('📊 Number of children found:', childrenData?.length || 0);

    if (childrenError) {
      console.error('❌ Error fetching children data:', childrenError);
      // Don't throw, just continue with 0 children count
    }

    // Group parents by family (no_kk)
    console.log('👨‍👩‍👧‍👦 Step 3: Grouping parents by family...');
    const familyGroups: { [key: string]: { father?: any; mother?: any; no_kk: string } } = {};

    // Initialize families from parents data
    uniqueNoKk.forEach(no_kk => {
      familyGroups[no_kk] = { no_kk };
    });

    // Add parents to their families
    allParentsData.forEach(parent => {
      const no_kk = parent.no_kk;
      if (familyGroups[no_kk]) {
        if (parent.role === 'ayah') {
          familyGroups[no_kk].father = parent;
          console.log(`👨 Added father: ${parent.nama} to family ${no_kk}`);
        } else if (parent.role === 'ibu') {
          familyGroups[no_kk].mother = parent;
          console.log(`👩 Added mother: ${parent.nama} to family ${no_kk}`);
        }
      }
    });

    console.log('🏠 Family groups:', familyGroups);

    // Count children per family
    console.log('🔢 Step 4: Counting children per family...');
    const childrenCount: { [key: string]: number } = {};
    childrenData?.forEach(child => {
      childrenCount[child.no_kk] = (childrenCount[child.no_kk] || 0) + 1;
    });

    console.log('👶 Children count:', childrenCount);

    // Transform data to ParentData format
    console.log('🔄 Step 5: Transforming data...');
    const result: ParentData[] = Object.values(familyGroups)
      .filter(family => family.father || family.mother) // Include families with at least one parent
      .map((family, index) => ({
        id: String(index + 1),
        fatherName: family.father?.nama || 'Tidak ada',
        motherName: family.mother?.nama || 'Tidak ada',
        nik: family.no_kk,
        childrenCount: childrenCount[family.no_kk] || 0,
        fatherImage: '/image/icon/pengukuran-anak.jpg', // Default image
        motherImage: '/image/icon/pengukuran-anak.jpg', // Default image
        no_kk: family.no_kk,
      }));

    console.log('✅ Final result:', result);
    console.log('📊 Total families to display:', result.length);
    return result;
  } catch (error) {
    console.error('❌ Error in fetchParentsData:', error);
    return [];
  }
};
