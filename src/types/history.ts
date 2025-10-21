// Types untuk history dan data table
export interface HistoryRecord {
  id: string;
  name: string;
  nik?: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  status: 'severely stunted' | 'stunted' | 'tall' | 'normal';
  date: string;
  scanTime?: string;
  imageUrl?: string;
}

export interface SummaryCard {
  title: string;
  value: number;
  description: string;
  bgGradient: string;
  status: 'severely stunted' | 'stunted' | 'tall' | 'normal';
}

export interface FilterOptions {
  status: string[];
  ageRange: string;
  dateRange: string;
}

export interface SortOption {
  field: keyof HistoryRecord;
  direction: 'asc' | 'desc';
}
