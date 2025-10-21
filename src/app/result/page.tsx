'use client';

import React, { useState } from 'react';
import { Layout } from '@/components';
import { FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ResultPage() {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const router = useRouter();

  // Mock data - in real app this would come from props or API
  const childData = {
    name: 'Emma Jhon',
    nik: '029102910920192',
    age: '2 Tahun 2 Bulan',
    gender: 'Laki Laki',
    scanDate: '02 September 2025',
    scanTime: '10:05 WIB',
    height: '28,5 cm',
    weight: '1,2 kg',
    status: 'Pertumbuhan Anak Sehat',
    statusColor: 'green'
  };

  const handleBack = () => {
    router.back();
  };

  const handleSave = () => {
    console.log('Saving result...');
    // TODO: Implement save functionality
    router.push('/history');
  };

  const handleDelete = () => {
    console.log('Deleting result...');
    // TODO: Implement delete functionality
    router.back();
  };

  const handleDetailLengkap = () => {
    setShowDetailModal(true);
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <FiArrowLeft className="w-5 h-5" />
              <span className="font-medium">Anak</span>
            </button>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Title inside card */}
            <div className="px-8 pt-8 pb-4 mb-8">
              <h1 className="text-5xl font-bold text-center text-gray-900">
                Hasil Analisis
              </h1>
            </div>
            <div className="px-8 pb-8">
              {/* Photo and Child Info Section */}
              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Photo */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-md">
                    <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
                      {/* Captured image */}
                      <Image
                        src="/image/icon/pengukuran-anak.jpg"
                        alt="Hasil pengukuran"
                        fill
                        className="object-cover"
                      />
                      {/* Measurement lines overlay */}
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-6 left-6 right-6">
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
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                      {childData.name}
                    </h2>
                    
                    <div className="space-y-4">
                      <div>
                        <span className="text-gray-400 font-medium text-sm mb-2 block">NIK Anak</span>
                        <div className="bg-[#F1F8F9] rounded-lg px-4 py-3">
                          <span className="font-semibold text-gray-900 text-sm">{childData.nik}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-gray-400 font-medium text-sm mb-2 block">Usia Bayi saat ini</span>
                          <div className="bg-[#F1F8F9] rounded-lg px-4 py-3">
                            <span className="font-semibold text-gray-900 text-sm">{childData.age}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400 font-medium text-sm mb-2 block">Jenis Kelamin</span>
                          <div className="bg-[#F1F8F9] rounded-lg px-4 py-3">
                            <span className="font-semibold text-gray-900 text-sm">{childData.gender}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-gray-400 font-medium text-sm mb-2 block">Waktu Pemeriksaan</span>
                        <div className="flex items-center gap-3">
                          <div className="bg-[#F1F8F9] rounded-lg px-4 py-3 flex-1">
                            <span className="font-semibold text-gray-900 text-sm">{childData.scanDate}</span>
                          </div>
                          <div className="bg-[#9ECAD6] text-white rounded-lg px-4 py-3 text-center min-w-[120px]">
                            <span className="font-medium text-sm">{childData.scanTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-lg font-semibold text-gray-900 text-center mb-6">
                  Hasil Utama
                </h3>

                {/* Measurement Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {/* Height Card */}
                  <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Tinggi Badan</p>
                        <p className="text-4xl font-bold text-[#407A81]">{childData.height}</p>
                      </div>
                      <div className="w-20 h-20 flex items-center justify-center p-3">
                        <Image
                          src="/image/icon/tinggi-badan.svg"
                          alt="Height icon"
                          width={50}
                          height={50}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Weight Card */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Berat Badan</p>
                        <p className="text-4xl font-bold text-[#407A81]">{childData.weight}</p>
                      </div>
                      <div className="w-20 h-20 flex items-center justify-center p-3">
                        <Image
                          src="/image/icon/berat-badan.svg"
                          alt="Weight icon"
                          width={50}
                          height={50}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="text-center mb-8">
                  <p className="text-sm text-gray-600 font-medium mb-6">Status Gizi Anak</p>
                  
                  <div className="flex items-center justify-center gap-6 mb-6">
                    <div className="flex-1 max-w-lg">
                      <div className="bg-green-500 text-white rounded-full py-4 px-8 shadow-lg">
                        <span className="font-semibold text-lg">{childData.status}</span>
                      </div>
                    </div>
                    <button
                      onClick={handleDetailLengkap}
                      className="bg-[#407A81] text-white rounded-full px-8 py-4 hover:bg-[#326269] transition-colors flex items-center gap-3 shadow-lg cursor-pointer"
                    >
                      <span className="font-medium">Detail Lengkap</span>
                      <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                        <FiArrowLeft className="w-4 h-4 text-[#407A81] rotate-180" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
            <button
              onClick={handleSave}
              className="bg-[#407A81] text-white py-4 px-8 rounded-xl hover:bg-[#326269] transition-colors font-semibold text-lg shadow-lg cursor-pointer"
            >
              Simpan
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center justify-center gap-3 bg-white border-2 border-red-500 text-red-500 py-4 px-8 rounded-xl hover:bg-red-50 transition-colors font-semibold shadow-lg cursor-pointer"
            >
              <FiTrash2 className="w-5 h-5" />
              <span>Hapus Pemindaian</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDetailModal(false)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Hasil Pemindaian</h3>

            {/* Image Section */}
            <div className="relative w-full h-64 rounded-xl overflow-hidden shadow-md mb-8" style={{ backgroundColor: '#FFE5F0' }}>
              <Image
                src="/image/icon/pengukuran-anak.jpg"
                alt="Hasil pengukuran"
                fill
                className="object-cover"
              />
            </div>

            {/* Measurement Cards */}
            <div className="flex gap-6 mb-8">
              <div className="flex-1 bg-[#E5F5F7] rounded-xl p-8 flex flex-col items-center border border-[#CDE6EA]">
                <span className="text-lg font-medium text-gray-600 mb-4">Tinggi Badan</span>
                <div className="flex items-center gap-4">
                  <Image src="/image/icon/tinggi-badan.svg" alt="Tinggi Badan" width={80} height={80} />
                  <span className="text-4xl font-bold text-[#407A81]">{childData.height}</span>
                </div>
              </div>
              <div className="flex-1 bg-[#E5F5F7] rounded-xl p-8 flex flex-col items-center border border-[#CDE6EA]">
                <span className="text-lg font-medium text-gray-600 mb-4">Berat Badan</span>
                <div className="flex items-center gap-4">
                  <Image src="/image/icon/berat-badan.svg" alt="Berat Badan" width={80} height={80} />
                  <span className="text-4xl font-bold text-[#407A81]">{childData.weight}</span>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="flex justify-center">
              <button
                onClick={() => setShowDetailModal(false)}
                className="min-w-[300px] bg-[#407A81] text-white py-3 rounded-full hover:bg-[#326269] transition-colors cursor-pointer font-semibold text-lg shadow-md"
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
