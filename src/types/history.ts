// Types untuk history dan data table
export interface HistoryRecord {
  id: string;
  name: string;
  nik?: string;
  age: number;
  gender: 'male' | 'female';
  height: number;
  weight: number;
  status: 'normal' | 'beresiko' | 'stunting';
  date: string;
  scanTime?: string;
  imageUrl?: string;
}

export interface SummaryCard {
  title: string;
  value: number;
  description: string;
  bgGradient: string;
  status: 'normal' | 'beresiko' | 'stunting';
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
