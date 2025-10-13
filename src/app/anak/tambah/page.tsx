'use client';

import React, { useMemo, useState, useEffect, useRef } from 'react';
import { Layout } from '@/components';
import Image from 'next/image';
import { FiFilter, FiSearch } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

type ParentProfile = {
  id: string;
  fatherName: string;
  motherName: string;
  nik: string;
  childrenCount: number;
  fatherImage: string;
  motherImage: string;
};

const parents: ParentProfile[] = Array.from({ length: 16 }).map((_, i) => ({
  id: String(i + 1),
  fatherName: 'Mustofa',
  motherName: 'Khoridoh',
  nik: `008211021122${String(i + 3).padStart(1, '0')}`,
  childrenCount: (i % 3) + 1,
  fatherImage: '/image/icon/pengukuran-anak.jpg',
  motherImage: '/image/icon/pengukuran-anak.jpg',
}));

export default function TambahAnakPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [sortOption, setSortOption] = useState('latest');
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

  const filtered = useMemo(() => {
    const results = parents.filter(p =>
      `${p.fatherName} ${p.motherName}`.toLowerCase().includes(query.toLowerCase()) ||
      p.nik.includes(query)
    );

    // Sort data
    results.sort((a, b) => {
      switch (sortOption) {
        case 'az':
          return a.fatherName.localeCompare(b.fatherName);
        case 'za':
          return b.fatherName.localeCompare(a.fatherName);
        case 'children':
          return b.childrenCount - a.childrenCount;
        case 'latest':
        default:
          return parseInt(b.id) - parseInt(a.id);
      }
    });

    return results;
  }, [query, sortOption]);

  const handleSelectParent = (parentId: string) => {
    // Navigate to form tambah anak with parent ID
    router.push(`/anak/tambah/form?parentId=${parentId}`);
  };

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
            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-black">Pilih Orang Tua Bayi</h1>
            </div>

            {/* Actions Card */}
            <div 
              className="mb-4 bg-white rounded-xl border border-gray-200 shadow-sm"
              style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}
            >
              <div className="p-4 flex flex-col sm:flex-row sm:items-center gap-3">
                <button 
                  onClick={() => router.push('/orang-tua/tambah')}
                  className="px-4 py-2 rounded-md bg-[#407A81] text-white hover:bg-[#326269] font-medium w-fit"
                >
                  Tambah Orang Tua
                </button>
                
                {/* Filter Dropdown */}
                <div className="relative" ref={filterRef}>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors whitespace-nowrap"
                  >
                    <FiFilter className="text-gray-500" />
                    <span className="text-gray-700">Filter by</span>
                  </button>

                  {/* Filter Dropdown Content */}
                  {showFilters && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-w-[calc(100vw-2rem)] overflow-hidden">
                      <div className="p-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">Urutkan:</label>
                          <div className="space-y-2">
                            {[
                              { value: 'latest', label: 'Terbaru' },
                              { value: 'az', label: 'Nama A-Z' },
                              { value: 'za', label: 'Nama Z-A' },
                              { value: 'children', label: 'Jumlah Anak' }
                            ].map((option) => (
                              <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors">
                                <input
                                  type="radio"
                                  name="sortFilter"
                                  value={option.value}
                                  checked={sortOption === option.value}
                                  onChange={(e) => setSortOption(e.target.value)}
                                  className="w-4 h-4 border-gray-300 focus:ring-0 focus:ring-offset-0"
                                  style={{
                                    accentColor: '#407A81'
                                  }}
                                />
                                <span className="text-sm text-gray-700 whitespace-nowrap">{option.label}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="relative flex-1 min-w-[240px]">
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari Orang Tua"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {filtered.map((p) => (
                <ParentCard key={p.id} parent={p} onSelect={() => handleSelectParent(p.id)} />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center text-gray-500 py-10">Tidak ada data</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function ParentCard({ parent, onSelect }: { parent: ParentProfile; onSelect: () => void }) {
  return (
    <div 
      onClick={onSelect}
      className="relative bg-white rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-[#407A81]"
      style={{ boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D' }}
    >
      {/* Father row */}
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <Image src={parent.fatherImage} alt={`Foto ${parent.fatherName}`} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <div className="text-lg font-bold text-gray-900 leading-tight truncate">{parent.fatherName}</div>
        </div>
      </div>

      {/* Mother row */}
      <div className="flex items-center gap-3 mt-3">
        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
          <Image src={parent.motherImage} alt={`Foto ${parent.motherName}`} fill className="object-cover" />
        </div>
        <div className="min-w-0">
          <div className="text-lg font-bold text-gray-900 leading-tight truncate">{parent.motherName}</div>
        </div>
      </div>

      {/* Info lines */}
      <div className="mt-4 space-y-2 text-sm">
        <div>
          <span className="font-semibold text-[#407A81]">No KK:</span>
          <span className="ml-1 text-gray-500">{parent.nik}</span>
        </div>
        <div>
          <span className="font-semibold text-[#407A81]">Jumlah Anak:</span>
          <span className="ml-1 text-gray-500">{parent.childrenCount} Anak</span>
        </div>
      </div>
    </div>
  );
}
