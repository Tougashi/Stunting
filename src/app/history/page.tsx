'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Layout } from '@/components';
import { SummaryCards } from '@/components/sections/SummaryCards';
import { SummaryCard, HistoryRecord } from '@/types/history';
import Image from 'next/image';
import { FiFilter, FiSearch, FiClock, FiArrowRightCircle } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

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
    nik: '029102910920191',
    age: 1,
    gender: 'female',
    height: 75,
    weight: 10,
    status: 'stunting',
    date: '2024-08-20',
    scanTime: '09:30 WIB',
    imageUrl: '/image/icon/pengukuran-anak.jpg'
  },
  {
    id: '2',
    name: 'Emma Jhon',
    nik: '029102910920192',
    age: 2,
    gender: 'female',
    height: 85,
    weight: 12,
    status: 'normal',
    date: '2024-08-19',
    scanTime: '10:05 WIB',
    imageUrl: '/image/icon/pengukuran-anak.jpg'
  },
  {
    id: '3',
    name: 'Liam Chen',
    nik: '029102910920193',
    age: 3,
    gender: 'male',
    height: 90,
    weight: 14,
    status: 'beresiko',
    date: '2024-08-18',
    scanTime: '14:20 WIB',
    imageUrl: '/image/icon/pengukuran-anak.jpg'
  },
  {
    id: '4',
    name: 'Shopia Davis',
    nik: '029102910920194',
    age: 1,
    gender: 'female',
    height: 75,
    weight: 10,
    status: 'stunting',
    date: '2024-08-17',
    scanTime: '11:15 WIB',
    imageUrl: '/image/icon/pengukuran-anak.jpg'
  }
];

export default function HistoryPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleStatusFilter = (status: string) => {
    setStatusFilter(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const filtered = useMemo(() => {
    const result = historyData.filter((it) => {
      const matchesSearch = it.name.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter.length === 0 || statusFilter.includes(it.status);
      return matchesSearch && matchesStatus;
    });

    // Sort data
    result.sort((a, b) => {
      switch (sortOption) {
        case 'az':
          return a.name.localeCompare(b.name);
        case 'za':
          return b.name.localeCompare(a.name);
        case 'age':
          return a.age - b.age;
        case 'latest':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

    return result;
  }, [query, statusFilter, sortOption]);

  const handleViewDetail = (record: HistoryRecord) => {
    router.push(`/history/${record.id}`);
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
        <div className="relative z-20 py-8 sm:py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-3 sm:mb-4 text-center">
                Riwayat Pemindaian
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto text-center">
                Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi Deskripsi
              </p>
            </div>

            {/* Summary Cards */}
            <SummaryCards data={summaryData} />

            {/* Filter + Search + List */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                {/* Filter Button */}
                <div className="relative flex justify-center sm:justify-start" ref={filterRef}>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-white cursor-pointer hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: 'rgba(57, 119, 137, 1)' }}
                  >
                    <FiFilter size={16} />
                    <span className="text-xs sm:text-sm font-medium">Filter by</span>
                  </button>

                  {/* Filter Dropdown Content */}
                  {showFilters && (
                    <div 
                      className={`absolute left-0 w-56 sm:w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] overflow-auto max-h-[400px] ${
                        filtered.length <= 3 ? 'bottom-full mb-2' : 'top-full mt-2'
                      }`}
                    >
                      <div className="p-3 sm:p-4">
                        <div className="mb-3 sm:mb-4">
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Urutkan:</label>
                          <div className="space-y-1 sm:space-y-2">
                            {[
                              { value: 'az', label: 'A→Z' },
                              { value: 'za', label: 'Z→A' },
                              { value: 'age', label: 'Usia Anak' },
                              { value: 'latest', label: 'Pemindaian Terbaru' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors">
                                <input
                                  type="radio"
                                  name="sortFilter"
                                  value={option.value}
                                  checked={sortOption === option.value}
                                  onChange={(e) => setSortOption(e.target.value)}
                                  className="w-3 h-3 sm:w-4 sm:h-4 border-gray-300 focus:ring-0 focus:ring-offset-0"
                                  style={{
                                    accentColor: '#397789'
                                  }}
                                />
                                <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">Status:</label>
                          <div className="space-y-1 sm:space-y-2">
                            {[
                              { value: 'normal', label: 'Sehat' },
                              { value: 'beresiko', label: 'Monitor' },
                              { value: 'stunting', label: 'Kritis' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors">
                                <input
                                  type="checkbox"
                                  checked={statusFilter.includes(option.value)}
                                  onChange={() => toggleStatusFilter(option.value)}
                                  className="w-3 h-3 sm:w-4 sm:h-4 rounded border-gray-300 focus:ring-0 focus:ring-offset-0"
                                  style={{
                                    accentColor: '#397789'
                                  }}
                                />
                                <span className="text-xs sm:text-sm text-gray-700 whitespace-nowrap">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:w-auto flex justify-center sm:justify-end">
                  <div className="relative w-full max-w-sm sm:w-80">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Cari Pasien/Anak"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-2.5 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#397789] focus:border-transparent outline-none text-sm sm:text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-3">
                {filtered.map((row) => (
                  <div key={row.id} className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 border-b border-gray-100 last:border-b-0">
                    {/* Mobile Layout */}
                    <div className="flex items-center gap-3 sm:hidden">
                      {/* avatar */}
                      <div className="w-10 h-10 rounded-full bg-[#E5F3F5] flex items-center justify-center text-[#397789] shrink-0">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8Z" fill="#397789"/>
                        </svg>
                      </div>

                      {/* name & meta */}
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-sm mb-1">{row.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
                            </svg>
                            {row.age} Tahun
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <FiClock size={12} />
                            2 Jam yang lalu
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden sm:flex sm:items-center gap-4 flex-1">
                      {/* avatar */}
                      <div className="w-12 h-12 rounded-full bg-[#E5F3F5] flex items-center justify-center text-[#397789] shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8Z" fill="#397789"/>
                        </svg>
                      </div>

                      {/* name & meta */}
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-base mb-1">{row.name}</div>
                        <div className="text-sm text-gray-500 flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" fill="currentColor"/>
                            </svg>
                            {row.age} Tahun
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <FiClock size={14} />
                            2 Jam yang lalu
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Measurement pills and status */}
                    <div className="sm:hidden flex flex-wrap items-center justify-center gap-2">
                      {/* height pill */}
                      <div 
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#397789] bg-[#EFFFFE]"
                        style={{ minWidth: '80px' }}
                      >
                        <Image 
                          src="/image/icon/tinggi-badan.svg" 
                          alt="tinggi" 
                          width={16} 
                          height={20}
                        />
                        <span className="text-xs font-semibold text-[#397789]">{row.height} cm</span>
                      </div>

                      {/* weight pill */}
                      <div 
                        className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#397789] bg-[#EFFFFE]"
                        style={{ minWidth: '80px' }}
                      >
                        <Image 
                          src="/image/icon/berat-badan.svg" 
                          alt="berat" 
                          width={12} 
                          height={20}
                        />
                        <span className="text-xs font-semibold text-[#397789]">{row.weight} Kg</span>
                      </div>

                      {/* status */}
                      <div className="flex items-center gap-2">
                        {row.status === 'normal' && (
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-[#E8F5E9] text-[#4CAF50]">
                            Sehat
                          </span>
                        )}
                        {row.status === 'beresiko' && (
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-[#FFF9E6] text-[#FFA726]">
                            Beresiko
                          </span>
                        )}
                        {row.status === 'stunting' && (
                          <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-[#FFEBEE] text-[#EF5350]">
                            Stunting
                          </span>
                        )}

                        {/* action button */}
                        <button 
                          onClick={() => handleViewDetail(row)}
                          className="w-8 h-8 rounded-full border-2 border-[#397789] flex items-center justify-center text-[#397789] hover:bg-[#397789] hover:text-white transition-colors cursor-pointer"
                        >
                          <FiArrowRightCircle size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Desktop: Measurement pills and status */}
                    <div className="hidden sm:flex sm:items-center gap-4">
                      {/* height pill */}
                      <div 
                        className="flex items-center justify-center gap-2.5"
                        style={{
                          width: '140px',
                          height: '56px',
                          borderRadius: '16px',
                          border: '1px solid rgba(57, 119, 137, 1)',
                          backgroundColor: 'rgba(239, 255, 254, 1)'
                        }}
                      >
                        <Image 
                          src="/image/icon/tinggi-badan.svg" 
                          alt="tinggi" 
                          width={31} 
                          height={38}
                          style={{ width: '31px', height: '38px' }}
                        />
                        <span className="text-base font-semibold text-[#397789]">{row.height} cm</span>
                      </div>

                      {/* weight pill */}
                      <div 
                        className="flex items-center justify-center gap-2.5"
                        style={{
                          width: '140px',
                          height: '56px',
                          borderRadius: '16px',
                          border: '1px solid rgba(57, 119, 137, 1)',
                          backgroundColor: 'rgba(239, 255, 254, 1)'
                        }}
                      >
                        <Image 
                          src="/image/icon/berat-badan.svg" 
                          alt="berat" 
                          width={20} 
                          height={38}
                          style={{ width: '20px', height: '38px' }}
                        />
                        <span className="text-base font-semibold text-[#397789]">{row.weight} Kg</span>
                      </div>

                      {/* status */}
                      <div className="shrink-0" style={{ width: '100px' }}>
                        {row.status === 'normal' && (
                          <span className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full text-sm font-medium bg-[#E8F5E9] text-[#4CAF50]">
                            Sehat
                          </span>
                        )}
                        {row.status === 'beresiko' && (
                          <span className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full text-sm font-medium bg-[#FFF9E6] text-[#FFA726]">
                            Beresiko
                          </span>
                        )}
                        {row.status === 'stunting' && (
                          <span className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full text-sm font-medium bg-[#FFEBEE] text-[#EF5350]">
                            Stunting
                          </span>
                        )}
                      </div>

                      {/* action button */}
                      <button 
                        onClick={() => handleViewDetail(row)}
                        className="shrink-0 w-10 h-10 rounded-full border-2 border-[#397789] flex items-center justify-center text-[#397789] hover:bg-[#397789] hover:text-white transition-colors cursor-pointer"
                      >
                        <FiArrowRightCircle size={20} />
                      </button>
                    </div>
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
