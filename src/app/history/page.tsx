'use client';

import React, { useMemo, useState } from 'react';
import { Layout } from '@/components';
import { SummaryCards } from '@/components/sections/SummaryCards';
import { SummaryCard, HistoryRecord } from '@/types/history';
import Image from 'next/image';
import { FiFilter, FiSearch, FiClock, FiArrowRightCircle } from 'react-icons/fi';

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
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return historyData.filter((it) => it.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);
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
          className="absolute bottom-0 right-0 w-96 h-96 z-0"
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
                Riwayat Pemindaian
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi
              </p>
            </div>

            {/* Summary Cards */}
            <SummaryCards data={summaryData} />

            {/* Filter + Search + List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E7F5F7] text-gray-700">
                  <FiFilter />
                  <span className="text-sm font-medium">Filter by</span>
                </button>
                <div className="relative flex-1">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari Pasien/Anak"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mt-4 divide-y">
                {filtered.map((row) => (
                  <div key={row.id} className="py-4 flex items-center gap-4">
                    {/* avatar */}
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8Z" fill="#9CA3AF"/></svg>
                    </div>

                    {/* name & meta */}
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm truncate">{row.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-3 mt-0.5">
                        {/* age below name (no gender) */}
                        <span>{row.age} Tahun</span>
                        <span className="inline-flex items-center gap-1">
                          <FiClock />
                          2 Jam yang lalu
                        </span>
                      </div>
                    </div>

                    {/* height pill */}
                    <div className="shrink-0">
                      <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 bg-[#F1F8F9]">
                        <Image src="/image/icon/tinggi-badan.svg" alt="tinggi" width={20} height={20} />
                        <span className="text-xs font-medium text-[#407A81]">{row.height} cm</span>
                      </div>
                    </div>

                    {/* weight pill */}
                    <div className="shrink-0">
                      <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 bg-[#F1F8F9]">
                        <Image src="/image/icon/berat-badan.svg" alt="berat" width={20} height={20} />
                        <span className="text-xs font-medium text-[#407A81]">{row.weight} Kg</span>
                      </div>
                    </div>

                    {/* status */}
                    <div className="shrink-0">
                      {row.status === 'normal' && (
                        <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">Sehat</span>
                      )}
                      {row.status === 'beresiko' && (
                        <span className="px-3 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">Beresiko</span>
                      )}
                      {row.status === 'stunting' && (
                        <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-600">Stunting</span>
                      )}
                    </div>

                    {/* action button - arrow circle right */}
                    <button className="ml-2 shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50">
                      <FiArrowRightCircle />
                    </button>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="py-10 text-center text-gray-500 text-sm">Tidak ada data</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
