'use client';

import React, { useMemo, useState } from 'react';
import { Layout } from '@/components';
import Image from 'next/image';
import { FiFilter, FiSearch, FiChevronRight } from 'react-icons/fi';

type HistoryItem = {
  id: string;
  name: string;
  ageYear: number;
  timeAgo: string;
  heightCm: string;
  weightKg: string;
  status: 'Sehat' | 'Beresiko' | 'Stunting';
};

const items: HistoryItem[] = [
  { id: '1', name: 'Emma Jhon', ageYear: 2, timeAgo: '2 Jam yang lalu', heightCm: '28,5 cm', weightKg: '1,2Kg', status: 'Sehat' },
  { id: '2', name: 'Liam Chen', ageYear: 2, timeAgo: '2 Jam yang lalu', heightCm: '28,5 cm', weightKg: '1,2Kg', status: 'Beresiko' },
  { id: '3', name: 'Shopia Davis', ageYear: 2, timeAgo: '2 Jam yang lalu', heightCm: '28,5 cm', weightKg: '1,2Kg', status: 'Stunting' },
  { id: '4', name: 'Emma Jhon', ageYear: 2, timeAgo: '2 Jam yang lalu', heightCm: '28,5 cm', weightKg: '1,2Kg', status: 'Sehat' },
  { id: '5', name: 'Liam Chen', ageYear: 2, timeAgo: '2 Jam yang lalu', heightCm: '28,5 cm', weightKg: '1,2Kg', status: 'Beresiko' },
  { id: '6', name: 'Shopia Davis', ageYear: 2, timeAgo: '2 Jam yang lalu', heightCm: '28,5 cm', weightKg: '1,2Kg', status: 'Stunting' },
];

export default function RiwayatPage() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return items.filter((it) => it.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  return (
    <Layout>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Background */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-60 z-10"
          style={{
            background: `radial-gradient(ellipse at center top, rgba(158, 202, 214, 0.6) 0%, rgba(158, 202, 214, 0.3) 30%, rgba(158, 202, 214, 0.1) 50%, transparent 70%)`
          }}
        />

        <div className="relative z-20 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl sm:text-4xl font-bold text-black mb-3">Riwayat Pemindaian</h1>
              <p className="text-sm sm:text-base text-gray-600">Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi</p>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <SummaryCardUI colorFrom="#D9F7E7" title="2" subtitle="Normal" />
              <SummaryCardUI colorFrom="#FFE9BA" title="10" subtitle="Beresiko" />
              <SummaryCardUI colorFrom="#FFD1D1" title="5" subtitle="Stunting" />
            </div>

            {/* Filter & Search */}
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

              {/* List */}
              <div className="mt-4 divide-y">
                {filtered.map((it) => (
                  <Row key={it.id} item={it} />
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

function SummaryCardUI({ colorFrom, title, subtitle }: { colorFrom: string; title: string; subtitle: string; }) {
  return (
    <div
      className="rounded-xl p-6 text-center"
      style={{ background: `linear-gradient(180deg, #FFFFFF 4.31%, ${colorFrom} 100%)` }}
    >
      <div className="text-3xl font-bold text-gray-900">{title}</div>
      <div className="text-sm text-gray-700 mt-1">{subtitle}</div>
    </div>
  );
}

function StatusPill({ status }: { status: HistoryItem['status'] }) {
  const map: Record<HistoryItem['status'], { bg: string; text: string }> = {
    Sehat: { bg: 'bg-green-100', text: 'text-green-600' },
    Beresiko: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    Stunting: { bg: 'bg-red-100', text: 'text-red-600' },
  };
  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs ${map[status].bg} ${map[status].text}`}>{status}</span>
  );
}

function Row({ item }: { item: HistoryItem }) {
  return (
    <div className="py-4 flex items-center gap-4">
      {/* avatar */}
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">{/* avatar placeholder */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8Z" fill="#9CA3AF"/></svg>
      </div>

      {/* name & meta */}
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-gray-900 text-sm truncate">{item.name}</div>
        <div className="text-xs text-gray-500 flex items-center gap-3">
          <span>{item.ageYear} Tahun</span>
          <span>{item.timeAgo}</span>
        </div>
      </div>

      {/* height pill */}
      <div className="shrink-0">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 bg-[#F1F8F9]">
          <Image src="/image/icon/tinggi-badan.svg" alt="tinggi" width={20} height={20} />
          <span className="text-xs font-medium text-[#407A81]">{item.heightCm}</span>
        </div>
      </div>

      {/* weight pill */}
      <div className="shrink-0">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 bg-[#F1F8F9]">
          <Image src="/image/icon/berat-badan.svg" alt="berat" width={20} height={20} />
          <span className="text-xs font-medium text-[#407A81]">{item.weightKg}</span>
        </div>
      </div>

      {/* status */}
      <div className="shrink-0">
        <StatusPill status={item.status} />
      </div>

      {/* go button */}
      <button className="ml-2 shrink-0 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-50">
        <FiChevronRight />
      </button>
    </div>
  );
}


