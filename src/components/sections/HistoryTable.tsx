'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HistoryRecord, FilterOptions, SortOption } from '@/types/history';

interface HistoryTableProps {
  data: HistoryRecord[];
  onEdit?: (record: HistoryRecord) => void;
  onDelete?: (id: string) => void;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ 
  data, 
  onEdit, 
  onDelete 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({
    status: [],
    ageRange: '',
    dateRange: ''
  });
  const [sortOption, setSortOption] = useState<SortOption>({
    field: 'date',
    direction: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSort, setSelectedSort] = useState<string>('latest');
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800';
      case 'beresiko':
        return 'bg-yellow-100 text-yellow-800';
      case 'stunting':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'normal':
        return 'Sehat';
      case 'beresiko':
        return 'Beresiko';
      case 'stunting':
        return 'Kritis';
      default:
        return status;
    }
  };

  const filteredAndSortedData = React.useMemo(() => {
    let filtered = data.filter(record => {
      const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filters.status.length === 0 || filters.status.includes(record.status);
      return matchesSearch && matchesStatus;
    });

    // Sort data
    filtered.sort((a, b) => {
      const aValue = a[sortOption.field];
      const bValue = b[sortOption.field];
      
      if (aValue == null || bValue == null) return 0;
      if (aValue < bValue) return sortOption.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOption.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [data, searchTerm, filters, sortOption]);

  const toggleFilter = (category: string, value: string) => {
    if (category === 'status') {
      setFilters(prev => ({
        ...prev,
        status: prev.status.includes(value)
          ? prev.status.filter(s => s !== value)
          : [...prev.status, value]
      }));
    }
  };

  return (
    <div 
      className="bg-white rounded-2xl overflow-visible relative border border-gray-200 table-shadow"
    >
      {/* Header dengan Search dan Filter */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Filter Dropdown - Sebelah Kiri */}
          <div className="relative flex-shrink-0" ref={filterRef}>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors whitespace-nowrap"
            >
              <svg className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter by.
            </button>
            
            {/* Filter Dropdown Content */}
            {showFilters && (
              <div 
                className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-w-[calc(100vw-2rem)] overflow-hidden">
                <div className="p-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Status Filter by:</label>
                    <div className="space-y-2">
                      {[
                        { value: 'az', label: 'A→Z' },
                        { value: 'za', label: 'Z→A' },
                        { value: 'age', label: 'Usia Bayi' },
                        { value: 'latest', label: 'Pemindaian Terbaru' }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors">
                          <input
                            type="radio"
                            name="sortFilter"
                            value={option.value}
                            checked={selectedSort === option.value}
                            onChange={(e) => {
                              setSelectedSort(e.target.value);
                              // Handle sorting logic here
                              if (e.target.value === 'az') {
                                setSortOption({ field: 'name', direction: 'asc' });
                              } else if (e.target.value === 'za') {
                                setSortOption({ field: 'name', direction: 'desc' });
                              } else if (e.target.value === 'age') {
                                setSortOption({ field: 'age', direction: 'asc' });
                              } else if (e.target.value === 'latest') {
                                setSortOption({ field: 'date', direction: 'desc' });
                              }
                            }}
                            className="w-4 h-4 border-2 border-gray-300 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-teal-600"
                          />
                          <span className="text-sm text-gray-700 whitespace-nowrap">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="space-y-2">
                      {[
                        { value: 'normal', label: 'Sehat', checked: filters.status.includes('normal') },
                        { value: 'beresiko', label: 'Monitor', checked: filters.status.includes('beresiko') },
                        { value: 'stunting', label: 'Kritis', checked: filters.status.includes('stunting') }
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded transition-colors">
                          <input
                            type="checkbox"
                            checked={option.checked}
                            onChange={() => toggleFilter('status', option.value)}
                            className="w-4 h-4 rounded border-2 border-gray-300 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 text-teal-600"
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
          
          {/* Search Bar - Sebelah Kanan */}
          <div className="relative w-full sm:w-auto sm:min-w-[250px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari Pasien/Anak"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-700 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-b-2xl">
        <table className="min-w-full divide-y divide-gray-200 rounded-b-2xl overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Nama
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Umur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Tanggal
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAndSortedData.map((record, index) => (
              <tr key={record.id} className={`hover:bg-gray-50 ${index === filteredAndSortedData.length - 1 ? 'border-b border-gray-200' : ''}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-teal-700 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {record.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {record.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {record.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{record.age} tahun</div>
                  <div className="text-sm text-gray-500">{record.height} cm | {record.weight} kg</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                    {getStatusLabel(record.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(record.date).toLocaleDateString('id-ID')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => onEdit?.(record)}
                    className="text-teal-700 hover:text-teal-800 mr-3"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAndSortedData.length === 0 && (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Tidak ada data</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || filters.status.length > 0 
                ? 'Tidak ada hasil yang sesuai dengan pencarian atau filter.'
                : 'Belum ada riwayat pemindaian.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
