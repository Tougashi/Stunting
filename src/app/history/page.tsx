'use client';

import React from 'react';
import { Layout } from '@/components';
import { SummaryCards } from '@/components/sections/SummaryCards';
import { HistoryTable } from '@/components/sections/HistoryTable';
import { SummaryCard, HistoryRecord } from '@/types/history';

// Data dummy untuk demo
const summaryData: SummaryCard[] = [
  {
    title: 'Normal',
    value: 2,
    description: 'Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi',
    bgGradient: 'linear-gradient(180deg, #FFFFFF 4.31%, #7BFFBB 100%)',
    status: 'normal'
  },
  {
    title: 'Beresiko',
    value: 10,
    description: 'Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi',
    bgGradient: 'linear-gradient(180deg, #FFFFFF 4.31%, #FFE090 100%)',
    status: 'beresiko'
  },
  {
    title: 'Stunting',
    value: 5,
    description: 'Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi',
    bgGradient: 'linear-gradient(180deg, #FFFFFF 4.31%, #FDABAB 100%)',
    status: 'stunting'
  }
];

const historyData: HistoryRecord[] = [
  {
    id: '1',
    name: 'Shopia Davis',
    age: 1,
    gender: 'female',
    height: 75,
    weight: 10,
    status: 'stunting',
    date: '2024-08-20'
  },
  {
    id: '2',
    name: 'Emma Jhon',
    age: 2,
    gender: 'female',
    height: 85,
    weight: 12,
    status: 'normal',
    date: '2024-08-19'
  },
  {
    id: '3',
    name: 'Liam Chen',
    age: 3,
    gender: 'male',
    height: 90,
    weight: 14,
    status: 'beresiko',
    date: '2024-08-18'
  },
  {
    id: '4',
    name: 'Shopia Davis',
    age: 1,
    gender: 'female',
    height: 75,
    weight: 10,
    status: 'stunting',
    date: '2024-08-17'
  }
];

export default function HistoryPage() {
  const handleEdit = (record: HistoryRecord) => {
    console.log('Edit record:', record);
  };

  const handleDelete = (id: string) => {
    console.log('Delete record:', id);
  };

  return (
    <Layout>
      <div className="min-h-screen relative">
        {/* Background Gradient */}
        <div 
          className="absolute inset-0 w-full h-72"
          style={{
            background: `radial-gradient(circle at center top, rgba(158, 202, 214, 1) 0%, rgba(158, 202, 214, 0.3) 30%, rgba(158, 202, 214, 0) 50%)`,
            zIndex: 0
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-black mb-4">
                Riwayat Pemindaian
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi
              </p>
            </div>

            {/* Summary Cards */}
            <SummaryCards data={summaryData} />

            {/* History Table */}
            <HistoryTable 
              data={historyData}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
