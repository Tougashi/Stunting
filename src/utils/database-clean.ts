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

export const fetchParentsData = async (): Promise<ParentData[]> => {
  try {
    // Get all parents data
    const { data: parentsData, error: parentsError } = await supabase
      .from('DataOrangTua')
      .select('nik, nama, role, no_kk')
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
        fatherImage: '/image/icon/pengukuran-anak.jpg',
        motherImage: '/image/icon/pengukuran-anak.jpg',
        no_kk: family.no_kk,
      }));

    console.log('Final mapped result:', result);
    return result;
    
  } catch (error) {
    console.error('Error fetching parents data:', error);
    throw error;
  }
};