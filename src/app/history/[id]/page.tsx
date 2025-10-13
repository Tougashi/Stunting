'use client';

import React, { useState } from 'react';
import { Layout } from '@/components';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

// Mock data - in real app this would come from API/database
const getRecordById = (id: string) => {
  const records = [
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
  
  return records.find(r => r.id === id);
};

export default function HistoryDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  const record = id ? getRecordById(id) : null;

  if (!record) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Data tidak ditemukan</h1>
            <button
              onClick={() => router.push('/history')}
              className="text-[#407A81] hover:underline cursor-pointer"
            >
              Kembali ke Riwayat
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleBack = () => {
    router.push('/history');
  };

  const handleDelete = () => {
    console.log('Deleting record:', id);
    // TODO: Implement delete functionality
    router.push('/history');
  };

  const handleDetailLengkap = () => {
    setShowDetailModal(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6 lg:py-8">
          {/* Back Button */}
          <div className="mb-4 sm:mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium text-sm sm:text-base">Riwayat Anak</span>
            </button>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Title inside card */}
            <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-2 sm:pb-4 mb-4 sm:mb-6 lg:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-center text-gray-900">
                Hasil Analisis
              </h1>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6 lg:pb-8">
              {/* Photo and Child Info Section */}
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
                {/* Photo */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-sm sm:max-w-md">
                    <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
                      {/* Captured image */}
                      <Image
                        src={record.imageUrl || "/image/icon/pengukuran-anak.jpg"}
                        alt="Hasil pengukuran"
                        fill
                        className="object-cover"
                      />
                      {/* Measurement lines overlay */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6">
                          <div className="flex justify-center">
                            {Array.from({ length: 15 }).map((_, i) => (
                              <div
                                key={i}
                                className="w-0.5 bg-blue-400 mx-0.5"
                                style={{ height: i % 4 === 0 ? '16px' : '10px' }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Child Info */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center lg:text-left">
                      {record.name}
                    </h2>
                    
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <span className="text-gray-400 font-medium text-xs sm:text-sm mb-2 block">NIK Anak</span>
                        <div className="bg-[#F1F8F9] rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                          <span className="font-semibold text-gray-900 text-xs sm:text-sm">{record.nik}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                          <span className="text-gray-400 font-medium text-xs sm:text-sm mb-2 block">Usia Bayi saat ini</span>
                          <div className="bg-[#F1F8F9] rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                            <span className="font-semibold text-gray-900 text-xs sm:text-sm">{record.age} Tahun</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400 font-medium text-xs sm:text-sm mb-2 block">Jenis Kelamin</span>
                          <div className="bg-[#F1F8F9] rounded-lg px-3 sm:px-4 py-2 sm:py-3">
                            <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                              {record.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-gray-400 font-medium text-xs sm:text-sm mb-2 block">Waktu Pemeriksaan</span>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                          <div className="bg-[#F1F8F9] rounded-lg px-3 sm:px-4 py-2 sm:py-3 flex-1">
                            <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                              {new Date(record.date).toLocaleDateString('id-ID', {
                                day: '2-digit',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="bg-[#9ECAD6] text-white rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-center min-w-[100px] sm:min-w-[120px]">
                            <span className="font-medium text-xs sm:text-sm">{record.scanTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="border-t border-gray-200 pt-6 sm:pt-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 text-center mb-4 sm:mb-6">
                  Hasil Utama
                </h3>

                {/* Measurement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {/* Height Card */}
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-4 sm:p-6 border border-cyan-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Tinggi Badan</p>
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#407A81]">{record.height} cm</p>
                      </div>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-2 sm:p-3">
                        <Image
                          src="/image/icon/tinggi-badan.svg"
                          alt="Height icon"
                          width={40}
                          height={40}
                          className="sm:w-[50px] sm:h-[50px]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Weight Card */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Berat Badan</p>
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#407A81]">{record.weight} kg</p>
                      </div>
                      <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center p-2 sm:p-3">
                        <Image
                          src="/image/icon/berat-badan.svg"
                          alt="Weight icon"
                          width={40}
                          height={40}
                          className="sm:w-[50px] sm:h-[50px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="text-center mb-6 sm:mb-8">
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mb-4 sm:mb-6">Status Gizi Anak</p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="w-full sm:flex-1 sm:max-w-lg">
                      <div className={`
                        text-white rounded-full py-3 sm:py-4 px-4 sm:px-8 shadow-lg
                        ${record.status === 'normal' ? 'bg-green-500' : ''}
                        ${record.status === 'beresiko' ? 'bg-yellow-500' : ''}
                        ${record.status === 'stunting' ? 'bg-red-500' : ''}
                      `}>
                        <span className="font-semibold text-sm sm:text-lg">
                          {record.status === 'normal' && 'Pertumbuhan Anak Sehat'}
                          {record.status === 'beresiko' && 'Pertumbuhan Anak Beresiko'}
                          {record.status === 'stunting' && 'Pertumbuhan Anak Stunting'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleDetailLengkap}
                      className="bg-[#407A81] text-white rounded-full px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#326269] transition-colors flex items-center gap-2 sm:gap-3 shadow-lg cursor-pointer"
                    >
                      <span className="font-medium text-sm sm:text-base">Detail Lengkap</span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-white rounded-full flex items-center justify-center">
                        <FiArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 text-[#407A81] rotate-180" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 lg:mt-10">
            <button
              onClick={handleBack}
              className="w-full sm:w-auto bg-[#407A81] text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-[#326269] transition-colors font-semibold text-base sm:text-lg shadow-lg cursor-pointer"
            >
              Kembali
            </button>
            <button
              onClick={handleDelete}
              className="w-full sm:w-auto flex items-center justify-center gap-2 sm:gap-3 bg-white border-2 border-red-500 text-red-500 py-3 sm:py-4 px-6 sm:px-8 rounded-xl hover:bg-red-50 transition-colors font-semibold text-base sm:text-lg shadow-lg cursor-pointer"
            >
              <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Hapus Pemindaian</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6">Hasil Pemindaian</h3>

            {/* Image */}
            <div className="relative w-full h-48 sm:h-64 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-md mb-4 sm:mb-6">
              <Image
                src={record.imageUrl || "/image/icon/pengukuran-anak.jpg"}
                alt="Hasil pengukuran"
                fill
                className="object-cover"
              />
            </div>

            {/* Measurement cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="bg-[#E9F6F7] rounded-xl p-4 sm:p-6 border border-cyan-200">
                <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 text-center font-medium">Tinggi Badan</p>
                <div className="flex items-center justify-between">
                  <div className="w-16 sm:w-20 md:w-28"></div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#407A81] -mt-1">{record.height} cm</p>
                  <Image src="/image/icon/tinggi-badan.svg" alt="Tinggi" width={112} height={112} className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28" />
                </div>
              </div>
              <div className="bg-[#E9F6F7] rounded-xl p-4 sm:p-6 border border-cyan-200">
                <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 text-center font-medium">Berat Badan</p>
                <div className="flex items-center justify-between">
                  <Image src="/image/icon/berat-badan.svg" alt="Berat" width={112} height={112} className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28" />
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#407A81] -mt-1">{record.weight} kg</p>
                  <div className="w-16 sm:w-20 md:w-28"></div>
                </div>
              </div>
            </div>

            {/* Close button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full sm:w-1/2 md:w-1/2 bg-[#407A81] text-white py-3 rounded-full hover:bg-[#326269] transition-colors cursor-pointer text-sm sm:text-base"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
