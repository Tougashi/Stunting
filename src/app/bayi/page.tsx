'use client';

import React from 'react';
import { Layout } from '@/components';
import { SummaryCards } from '@/components/sections/SummaryCards';
import { HistoryTable } from '@/components/sections/HistoryTable';
import { SummaryCard, HistoryRecord } from '@/types/history';
import { Bayi } from '@/types/bayi';
import BayiCard from './components/card';

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

const historyData: Bayi[] = [
  {
    id: '1',
    name: 'Shopia Davis',
    age: 1,
    gender: 'female',
    height: 75,
    weight: 10,
    status: 'stunting',
    created_at: '2024-08-20'
  },
  {
    id: '2',
    name: 'Emma Jhon',
    age: 2,
    gender: 'female',
    height: 85,
    weight: 12,
    status: 'normal',
    created_at: '2024-08-19'
  },
  {
    id: '3',
    name: 'Liam Chen',
    age: 3,
    gender: 'male',
    height: 90,
    weight: 14,
    status: 'beresiko',
    created_at: '2024-08-18'
  },
  {
    id: '4',
    name: 'Shopia Davis',
    age: 1,
    gender: 'female',
    height: 75,
    weight: 10,
    status: 'stunting',
    created_at: '2024-08-17'
  }
];

export default function BayiPage() {
  const handleEdit = (record: HistoryRecord) => {
    console.log('Edit record:', record);
  };

  const handleDelete = (id: string) => {
    console.log('Delete record:', id);
  };

  return (
    <Layout>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Background Gradient Top */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-60 z-10"
          style={{
            background: `radial-gradient(ellipse at center top, rgba(158, 202, 214, 0.6) 0%, rgba(158, 202, 214, 0.3) 30%, rgba(158, 202, 214, 0.1) 50%, transparent 70%)`
          }}
        />
        
        {/* Background Gradient Bottom Right */}
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 -z-1"
          style={{
            background: `linear-gradient(151.12deg, #FFFFFF 53.4%, #9ECAD6 172.54%)`
          }}
        />
        
        {/* Content */}
        <div className="relative z-20 py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-black mb-4">
                Profile Bayi
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem illum quibusdam quo praesentium facere tenetur iure atque accusantium fugiat officiis? Sed, quod. Ut, cupiditate alias?
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {historyData.map((record, index) => (
            <BayiCard key={index} image={`/image/icon/bayi-icon.svg`} bayi={record} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
