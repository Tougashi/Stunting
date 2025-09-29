'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Layout } from '@/components';
import { Bayi } from '@/types/bayi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiMoreVertical, FiFilter, FiSearch } from 'react-icons/fi';

// Data dummy untuk demo
const dummyChildren: Bayi[] = [
  {
    id: '1',
    name: 'Emma Jhon',
    age: 2,
    gender: 'Laki Laki',
    height: 85,
    weight: 12,
    status: 'normal',
    created_at: '2024-09-23'
  },
  {
    id: '2',
    name: 'Siti Rosidah',
    age: 3,
    gender: 'Perempuan',
    height: 90,
    weight: 14,
    status: 'beresiko',
    created_at: '2024-09-23'
  },
  {
    id: '3',
    name: 'Rehand',
    age: 1,
    gender: 'Laki Laki',
    height: 75,
    weight: 9,
    status: 'stunting',
    created_at: '2024-09-23'
  },
  {
    id: '4',
    name: 'Emma Jhon',
    age: 2,
    gender: 'Laki Laki',
    height: 85,
    weight: 12,
    status: 'normal',
    created_at: '2024-09-23'
  },
  {
    id: '5',
    name: 'Siti Rosidah',
    age: 3,
    gender: 'Perempuan',
    height: 90,
    weight: 14,
    status: 'beresiko',
    created_at: '2024-09-23'
  },
  {
    id: '6',
    name: 'Rehand',
    age: 1,
    gender: 'Laki Laki',
    height: 75,
    weight: 9,
    status: 'stunting',
    created_at: '2024-09-23'
  }
];

export default function ScanPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [selectedChild, setSelectedChild] = useState<Bayi | null>(null);
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

  // Handle child card click
  const handleChildClick = (child: Bayi) => {
    setSelectedChild(child);
    setShowCameraModal(true);
  };

  // Handle camera selection
  const handleCameraSelect = (cameraType: 'Raspberry' | 'handphone') => {
    console.log(`Selected ${cameraType} camera for ${selectedChild?.name}`);
    setShowCameraModal(false);
    setSelectedChild(null);
    
    // Navigate to camera page with camera type and child info
    const cameraParam = cameraType === 'Raspberry' ? 'raspberry' : 'handphone';
    const childParam = selectedChild?.id || '';
    router.push(`/camera?camera=${cameraParam}&child=${childParam}`);
  };

  const filteredAndSortedChildren = useMemo(() => {
    let filtered = dummyChildren.filter(child => {
      const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Sort data
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'az':
          return a.name.localeCompare(b.name);
        case 'za':
          return b.name.localeCompare(a.name);
        case 'age':
          return a.age - b.age;
        case 'latest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return filtered;
  }, [searchTerm, sortOption]);

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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-black mb-4">
                Profil Anak
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                List data Anak yang sudah terdaftar.
              </p>
            </div>

            {/* Container dengan drop shadow */}
            <div 
              className="bg-white rounded-2xl p-6 border border-gray-200"
              style={{
                boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D'
              }}
            >
              {/* Action Bar */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
                {/* Left side - Tambah Anak and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <button className="bg-[#407A81] text-white px-6 py-2 rounded-md hover:bg-[#326269] transition-colors font-medium whitespace-nowrap">
                    Tambah Anak
                  </button>
                  
                  {/* Filter Button */}
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
                                { value: 'az', label: 'A→Z' },
                                { value: 'za', label: 'Z→A' },
                                { value: 'age', label: 'Usia Bayi' },
                                { value: 'latest', label: 'Terbaru' }
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
                </div>
                
                {/* Right side - Search Input */}
                <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari Anak"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none w-full"
                  />
                </div>
              </div>

              {/* Grid Card Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedChildren.map((child) => (
                  <ChildCard key={child.id} child={child} onClick={handleChildClick} />
                ))}
              </div>

              {/* No Results */}
              {filteredAndSortedChildren.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Tidak ada data anak yang ditemukan</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Camera Selection Modal */}
        {showCameraModal && (
          <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-center text-gray-900 mb-6">
                Pilih Camera Pemindaian
              </h2>
              
              <div className="space-y-4">
                {/* Camera Raspberry Button */}
                <button
                  onClick={() => handleCameraSelect('Raspberry')}
                  className="w-full bg-[#407A81] text-white py-3 px-6 rounded-lg hover:bg-[#326269] transition-colors font-medium"
                >
                  Camera Raspberry
                </button>
                
                {/* Camera Handphone Button */}
                <button
                  onClick={() => handleCameraSelect('handphone')}
                  className="w-full border-2 border-[#407A81] text-[#407A81] py-3 px-6 rounded-lg hover:bg-[#407A81] hover:text-white transition-colors font-medium"
                >
                  Camera Handphone
                </button>
              </div>
              
              {/* Close button */}
              <button
                onClick={() => {
                  setShowCameraModal(false);
                  setSelectedChild(null);
                }}
                className="mt-6 w-full text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                Batal
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

// Child Card Component
interface ChildCardProps {
  child: Bayi;
  onClick: (child: Bayi) => void;
}

function ChildCard({ child, onClick }: ChildCardProps) {
  return (
    <div 
      onClick={() => onClick(child)}
      className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D'
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            {child.name === 'Rehand' ? (
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#9CA3AF"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#9CA3AF"/>
                </svg>
              </div>
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <Image
                  src="/image/icon/bayi-icon.svg"
                  alt={child.name}
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>
          
          {/* Info */}
          <div>
            <h3 className="font-semibold text-gray-900 text-sm">{child.name}</h3>
            <p className="text-xs text-[#407A81] font-medium">{child.gender}</p>
            <p className="text-xs text-[#407A81]">Umur: <span className="text-gray-500">{child.age} Tahun</span></p>
          </div>
        </div>
        
        {/* More Options */}
        <button className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
          <FiMoreVertical size={16} />
        </button>
      </div>
    </div>
  );
}
