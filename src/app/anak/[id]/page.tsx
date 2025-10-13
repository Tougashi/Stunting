'use client';

import React, { useState } from 'react';
import { Layout } from '@/components';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { FiArrowLeft, FiMoreVertical, FiEdit2, FiTrash2, FiClock, FiArrowRightCircle } from 'react-icons/fi';

// Interfaces
interface ChildDetailData {
  id: string;
  name: string;
  photo: string | null;
  gender: string;
  age: number;
  nomorKK: string;
  nikAnak: string;
  tanggalLahir: string;
  tempatLahir: string;
  beratBadanLahir: string;
  tinggiBadanLahir: string;
  lingkarKepalaLahir: string;
  namaAyah: string;
  nikAyah: string;
  tempatLahirAyah: string;
  tanggalLahirAyah: string;
  nomorTeleponAyah: string;
  namaIbu: string;
  nikIbu: string;
  tempatLahirIbu: string;
  tanggalLahirIbu: string;
  nomorTeleponIbu: string;
}

interface ScanHistoryRecord {
  id: string;
  childId: string;
  age: number;
  height: number;
  weight: number;
  status: 'normal' | 'beresiko' | 'stunting';
  date: string;
  timeAgo: string;
}

const dummyChildrenData: { [key: string]: ChildDetailData } = {
  '1': {
    id: '1',
    name: 'Emma Jhon',
    photo: '/image/icon/bayi-icon.svg',
    gender: 'Laki Laki',
    age: 2,
    nomorKK: '0082110211223',
    nikAnak: '0082110211223',
    tanggalLahir: '11/02/2024',
    tempatLahir: 'Tasikmalaya',
    beratBadanLahir: '10.5 Kg',
    tinggiBadanLahir: '30 Cm',
    lingkarKepalaLahir: '15 Cm',
    namaAyah: 'Mustafa',
    nikAyah: '0082110211223',
    tempatLahirAyah: 'Garut',
    tanggalLahirAyah: '11/02/1999',
    nomorTeleponAyah: '0851 6127 4323',
    namaIbu: 'Aisyah Nur',
    nikIbu: '0082110211223',
    tempatLahirIbu: 'Tasikmalaya',
    tanggalLahirIbu: '24/12/1995',
    nomorTeleponIbu: '0851 6127 4323'
  },
  '2': {
    id: '2',
    name: 'Siti Rosidah',
    photo: '/image/icon/bayi-icon.svg',
    gender: 'Perempuan',
    age: 3,
    nomorKK: '0082110211223',
    nikAnak: '0082110211223',
    tanggalLahir: '11/02/2024',
    tempatLahir: 'Tasikmalaya',
    beratBadanLahir: '10.5 Kg',
    tinggiBadanLahir: '30 Cm',
    lingkarKepalaLahir: '15 Cm',
    namaAyah: 'Mustafa',
    nikAyah: '0082110211223',
    tempatLahirAyah: 'Garut',
    tanggalLahirAyah: '11/02/1999',
    nomorTeleponAyah: '0851 6127 4323',
    namaIbu: 'Aisyah Nur',
    nikIbu: '0082110211223',
    tempatLahirIbu: 'Tasikmalaya',
    tanggalLahirIbu: '24/12/1995',
    nomorTeleponIbu: '0851 6127 4323'
  },
  '3': {
    id: '3',
    name: 'Rehand',
    photo: null,
    gender: 'Laki Laki',
    age: 1,
    nomorKK: '0082110211223',
    nikAnak: '0082110211223',
    tanggalLahir: '11/02/2024',
    tempatLahir: 'Tasikmalaya',
    beratBadanLahir: '10.5 Kg',
    tinggiBadanLahir: '30 Cm',
    lingkarKepalaLahir: '15 Cm',
    namaAyah: 'Mustafa',
    nikAyah: '0082110211223',
    tempatLahirAyah: 'Garut',
    tanggalLahirAyah: '11/02/1999',
    nomorTeleponAyah: '0851 6127 4323',
    namaIbu: 'Aisyah Nur',
    nikIbu: '0082110211223',
    tempatLahirIbu: 'Tasikmalaya',
    tanggalLahirIbu: '24/12/1995',
    nomorTeleponIbu: '0851 6127 4323'
  }
};

const getChildData = (id: string) => {
  // This would typically fetch from an API
  return dummyChildrenData[id] || dummyChildrenData['1'];
};

// Dummy scan history data
const scanHistoryData: { [key: string]: ScanHistoryRecord[] } = {
  '1': [
    {
      id: 'scan-1',
      childId: '1',
      age: 2,
      height: 28.5,
      weight: 1.2,
      status: 'normal',
      date: '2024-08-20',
      timeAgo: '2 Jam yang lalu'
    },
    {
      id: 'scan-2',
      childId: '1',
      age: 2,
      height: 28.5,
      weight: 1.2,
      status: 'normal',
      date: '2024-08-19',
      timeAgo: '2 Jam yang lalu'
    },
    {
      id: 'scan-3',
      childId: '1',
      age: 2,
      height: 28.5,
      weight: 1.2,
      status: 'normal',
      date: '2024-08-18',
      timeAgo: '2 Jam yang lalu'
    }
  ],
  '2': [
    {
      id: 'scan-4',
      childId: '2',
      age: 3,
      height: 30,
      weight: 1.5,
      status: 'beresiko',
      date: '2024-08-20',
      timeAgo: '3 Jam yang lalu'
    }
  ],
  '3': [
    {
      id: 'scan-5',
      childId: '3',
      age: 1,
      height: 25,
      weight: 1.0,
      status: 'stunting',
      date: '2024-08-20',
      timeAgo: '1 Jam yang lalu'
    }
  ]
};

const getChildScanHistory = (childId: string): ScanHistoryRecord[] => {
  const existing = scanHistoryData[childId] || [];
  if (existing.length >= 3) return existing;
  const padded: ScanHistoryRecord[] = [...existing];
  const seed: ScanHistoryRecord = existing[0] || {
    id: `scan-${childId}-seed`,
    childId,
    age: 2,
    height: 28,
    weight: 1.2,
    status: 'normal',
    date: '2024-08-20',
    timeAgo: '2 Jam yang lalu',
  };
  while (padded.length < 3) {
    const n = padded.length + 1;
    padded.push({
      ...seed,
      id: `scan-${childId}-${n}`,
      timeAgo: `${n} Jam yang lalu`,
    });
  }
  return padded;
};

export default function ProfileAnakPage() {
  const router = useRouter();
  const params = useParams();
  const childId = params?.id as string;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const child = getChildData(childId);
  const scanHistory = getChildScanHistory(childId);

  // Close dropdown when clicking outside
  React.useEffect(() => {
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

  const handleBack = () => {
    router.push('/anak');
  };

  const handleEdit = () => {
    setShowDropdown(false);
    setIsEditing(true);
  };

  const handleDelete = () => {
    setShowDropdown(false);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    console.log('Deleting child:', childId);
    // Implement delete logic here
    setShowDeleteModal(false);
    router.push('/anak');
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleViewScanDetail = (scanId: string) => {
    router.push(`/anak/${childId}/hasil/${scanId}`);
  };

  return (
    <Layout>
      <div className="min-h-screen relative overflow-x-hidden bg-gray-50">
        {/* Background Gradient Top */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-60 z-10"
          style={{
            background: `radial-gradient(ellipse at center top, rgba(158, 202, 214, 0.6) 0%, rgba(158, 202, 214, 0.3) 30%, rgba(158, 202, 214, 0.1) 50%, transparent 70%)`
          }}
        />

        {/* Content */}
        <div className="relative z-20 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            {/* Header with Back Button */}
            <div className="flex items-center gap-3 mb-8">
              <button
                onClick={handleBack}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                <FiArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Anak</h1>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header dengan Title dan More Options */}
              <div className="flex items-center justify-between px-8 py-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Profile Anak</h2>
                
                {/* More Options Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                  >
                    <FiMoreVertical size={20} />
                  </button>

                  {/* Dropdown Menu */}
                  {showDropdown && (
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                      <button
                        onClick={handleEdit}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <FiEdit2 size={14} />
                        Edit
                      </button>
                      <button
                        onClick={handleDelete}
                        className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                      >
                        <FiTrash2 size={14} />
                        Hapus
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Content */}
              <div className="px-5 sm:px-8 pb-6 sm:pb-8">
                {/* Photo and Name */}
                <div className="flex flex-col items-center mb-8 sm:mb-10">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                    {child.photo ? (
                      <Image
                        src={child.photo}
                        alt={child.name}
                        width={48}
                        height={48}
                      />
                    ) : (
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" fill="#9CA3AF"/>
                        <path d="M12 14C7.58172 14 4 17.5817 4 22H20C20 17.5817 16.4183 14 12 14Z" fill="#9CA3AF"/>
                      </svg>
                    )}
                  </div>
                  {isEditing ? (
                    <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="sm:col-span-2">
                        <label className="text-xs text-gray-500 mb-1 block">Nama Anak</label>
                        <input defaultValue={child.name} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent text-sm sm:text-base" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Jenis Kelamin</label>
                        <select defaultValue={child.gender} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent text-sm sm:text-base">
                          <option>Laki Laki</option>
                          <option>Perempuan</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1 block">Umur (tahun)</label>
                        <input type="number" defaultValue={child.age} className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#9ECAD6] focus:border-transparent text-sm sm:text-base" />
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1 sm:mb-2 text-center">{child.name}</h3>
                      <p className="text-base sm:text-lg text-gray-600">{child.gender}</p>
                      <p className="text-base sm:text-lg text-gray-600">Umur : {child.age} tahun</p>
                    </>
                  )}
                </div>

                {/* Information Sections */}
                <div className="space-y-8 sm:space-y-10">
                  {/* Nomor Kartu Keluarga Section */}
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5">Nomor Kartu Keluarga</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Nomor KK</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.nomorKK}</p>
                      </div>
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">NIK Anak</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.nikAnak}</p>
                      </div>
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Tanggal Lahir</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.tanggalLahir}</p>
                      </div>
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Tanggal Lahir</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.tanggalLahir}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Tempat Lahir</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.tempatLahir}</p>
                      </div>
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Usia Ibu</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.age}</p>
                      </div>
                    </div>
                  </div>

                  {/* Data Tambahan saat Lahir */}
                  <div className="pt-6 sm:pt-8 border-t border-gray-200">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5">Data Tambahan saat Lahir</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Berat Badan Lahir</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.beratBadanLahir}</p>
                      </div>
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Tinggi Badan Lahir</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.tinggiBadanLahir}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Lingkar Kepala Lahir</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.lingkarKepalaLahir}</p>
                      </div>
                    </div>
                  </div>

                  {/* Identitas Ayah */}
                  <div className="pt-6 sm:pt-8 border-t border-gray-200">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5">Identitas Ayah</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Nama Ayah</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.namaAyah}</p>
                      </div>
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">NIK Ayah</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.nikAyah}</p>
                      </div>
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Tempat Lahir</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.tempatLahirAyah}</p>
                      </div>
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Tanggal Lahir</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.tanggalLahirAyah}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Nomor Telepon Ayah</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.nomorTeleponAyah}</p>
                      </div>
                    </div>
                  </div>

                  {/* Identitas Ibu */}
                  <div className="pt-6 sm:pt-8 border-t border-gray-200">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-5">Identitas Ibu</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Nama Ibu</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.namaIbu}</p>
                      </div>
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">NIK Ibu</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.nikIbu}</p>
                      </div>
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Tempat Lahir</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.tempatLahirIbu}</p>
                      </div>
                      <div>
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Tanggal Lahir</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.tanggalLahirIbu}</p>
                      </div>
                      <div className="col-span-2">
                        <label className="text-sm sm:text-base text-gray-500 font-medium block mb-1.5 sm:mb-2">Nomor Telepon Ibu</label>
                        <p className="text-base sm:text-lg text-gray-900">{child.nomorTeleponIbu}</p>
                      </div>
                    </div>
                  </div>
                </div>
                {isEditing && (
                  <div className="mt-6 flex items-center justify-end gap-3">
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50">Batal</button>
                    <button onClick={() => setIsEditing(false)} className="px-4 py-2 rounded-md bg-[#407A81] text-white hover:bg-[#326269]">Simpan</button>
                  </div>
                )}
              </div>
            </div>

            {/* Riwayat Pemindaian Anak */}
            <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-5 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Riwayat Pemindaian Anak</h2>
              </div>

              {/* History List */}
              <div className="px-6 py-6">
                {scanHistory.length > 0 ? (
                  <div className="space-y-2 sm:space-y-3">
                    {scanHistory.map((row) => (
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
                            <div className="font-bold text-gray-900 text-sm mb-1">{child.name}</div>
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
                                {row.timeAgo}
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
                            <div className="font-bold text-gray-900 text-base mb-1">{child.name}</div>
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
                                {row.timeAgo}
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
                            <Image src="/image/icon/tinggi-badan.svg" alt="tinggi" width={16} height={20} />
                            <span className="text-xs font-semibold text-[#397789]">{row.height} cm</span>
                          </div>
                          {/* weight pill */}
                          <div 
                            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-[#397789] bg-[#EFFFFE]"
                            style={{ minWidth: '80px' }}
                          >
                            <Image src="/image/icon/berat-badan.svg" alt="berat" width={12} height={20} />
                            <span className="text-xs font-semibold text-[#397789]">{row.weight} Kg</span>
                          </div>
                          {/* status */}
                          <div className="flex items-center gap-2">
                            {row.status === 'normal' && (
                              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-[#E8F5E9] text-[#4CAF50]">Sehat</span>
                            )}
                            {row.status === 'beresiko' && (
                              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-[#FFF9E6] text-[#FFA726]">Beresiko</span>
                            )}
                            {row.status === 'stunting' && (
                              <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-medium bg-[#FFEBEE] text-[#EF5350]">Stunting</span>
                            )}
                            {/* action button */}
                            <button onClick={() => handleViewScanDetail(row.id)} className="w-8 h-8 rounded-full border-2 border-[#397789] flex items-center justify-center text-[#397789] hover:bg-[#397789] hover:text-white transition-colors cursor-pointer">
                              <FiArrowRightCircle size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Desktop: Measurement pills and status */}
                        <div className="hidden sm:flex sm:items-center gap-4">
                          {/* height pill */}
                          <div 
                            className="flex items-center justify-center gap-2.5"
                            style={{ width: '140px', height: '56px', borderRadius: '16px', border: '1px solid rgba(57, 119, 137, 1)', backgroundColor: 'rgba(239, 255, 254, 1)' }}
                          >
                            <Image src="/image/icon/tinggi-badan.svg" alt="tinggi" width={31} height={38} style={{ width: '31px', height: '38px' }} />
                            <span className="text-base font-semibold text-[#397789]">{row.height} cm</span>
                          </div>
                        {/* weight pill */}
                          <div 
                            className="flex items-center justify-center gap-2.5"
                            style={{ width: '140px', height: '56px', borderRadius: '16px', border: '1px solid rgba(57, 119, 137, 1)', backgroundColor: 'rgba(239, 255, 254, 1)' }}
                          >
                            <Image src="/image/icon/berat-badan.svg" alt="berat" width={20} height={38} style={{ width: '20px', height: '38px' }} />
                            <span className="text-base font-semibold text-[#397789]">{row.weight} Kg</span>
                        </div>
                        {/* status */}
                          <div className="shrink-0" style={{ width: '100px' }}>
                            {row.status === 'normal' && (
                              <span className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full text-sm font-medium bg-[#E8F5E9] text-[#4CAF50]">Sehat</span>
                            )}
                            {row.status === 'beresiko' && (
                              <span className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full text-sm font-medium bg-[#FFF9E6] text-[#FFA726]">Beresiko</span>
                            )}
                            {row.status === 'stunting' && (
                              <span className="inline-flex items-center justify-center w-full px-4 py-2 rounded-full text-sm font-medium bg-[#FFEBEE] text-[#EF5350]">Stunting</span>
                          )}
                        </div>
                          {/* action button */}
                          <button onClick={() => handleViewScanDetail(row.id)} className="shrink-0 w-10 h-10 rounded-full border-2 border-[#397789] flex items-center justify-center text-[#397789] hover:bg-[#397789] hover:text-white transition-colors cursor-pointer">
                          <FiArrowRightCircle size={20} />
                        </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-10 text-center text-gray-500 text-sm">Belum ada riwayat pemindaian</div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-center text-gray-900 mb-4">
                {child.name}
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
