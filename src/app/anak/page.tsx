'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Layout } from '@/components';
import { Bayi } from '@/types/bayi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiMoreVertical, FiFilter, FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [childToDelete, setChildToDelete] = useState<Bayi | null>(null);
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
    // Navigate to child profile page
    router.push(`/anak/${child.id}`);
  };

  // Handle edit child
  const handleEditChild = (child: Bayi) => {
    console.log('Edit child:', child);
    router.push(`/anak/edit/${child.id}`);
  };

  // Handle delete child
  const handleDeleteChild = (child: Bayi) => {
    setChildToDelete(child);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    if (childToDelete) {
      console.log('Deleting child:', childToDelete);
      // Here you would implement the actual delete logic
      // For now, just close the modal
      setShowDeleteModal(false);
      setChildToDelete(null);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setChildToDelete(null);
  };

  const filteredAndSortedChildren = useMemo(() => {
    const filtered = dummyChildren.filter(child => {
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
                  <button 
                    onClick={() => router.push('/anak/tambah')}
                    className="bg-[#407A81] text-white px-6 py-2 rounded-md hover:bg-[#326269] transition-colors font-medium whitespace-nowrap cursor-pointer"
                  >
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
                  <ChildCard 
                    key={child.id} 
                    child={child} 
                    onClick={handleChildClick}
                    onEdit={handleEditChild}
                    onDelete={handleDeleteChild}
                  />
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

        {/* Delete Confirmation Modal */}
        {showDeleteModal && childToDelete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-center text-gray-900 mb-4">
                {childToDelete.name}
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Apakah anda yakin ingin menghapusnya?
              </p>
              
              <div className="space-y-3">
                {/* Delete Button */}
                <button
                  onClick={confirmDelete}
                  className="w-full bg-[#407A81] text-white py-3 px-6 rounded-lg hover:bg-[#326269] transition-colors font-medium"
                >
                  Hapus
                </button>
                
                {/* Cancel Button */}
                <button
                  onClick={cancelDelete}
                  className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Batalkan
                </button>
              </div>
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
  onEdit: (child: Bayi) => void;
  onDelete: (child: Bayi) => void;
}

function ChildCard({ child, onClick, onEdit, onDelete }: ChildCardProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click if clicking on dropdown or its button
    if (dropdownRef.current && dropdownRef.current.contains(e.target as Node)) {
      return;
    }
    onClick(child);
  };

  const handleDropdownClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    onEdit(child);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDropdown(false);
    onDelete(child);
  };
  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
      style={{
        boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D'
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            {child.name === 'Rehand' ? (
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#9CA3AF"/>
                  <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#9CA3AF"/>
                </svg>
              </div>
            ) : (
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                <Image
                  src="/image/icon/bayi-icon.svg"
                  alt={child.name}
                  width={40}
                  height={40}
                />
              </div>
            )}
          </div>
          
          {/* Info */}
          <div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1.5">{child.name}</h3>
            <p className="text-base text-[#407A81] font-medium mb-1">{child.gender}</p>
            <p className="text-base text-[#407A81]">Umur: <span className="text-gray-600">{child.age} Tahun</span></p>
          </div>
        </div>
        
        {/* More Options with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={handleDropdownClick}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
          >
            <FiMoreVertical size={20} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
              <button
                onClick={handleEdit}
                className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
              >
                <FiEdit2 size={16} />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <FiTrash2 size={16} />
                Hapus
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
