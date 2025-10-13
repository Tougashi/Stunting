'use client';

import React, { useState } from 'react';
import { Layout } from '@/components';
import { FiArrowLeft, FiTrash2, FiHelpCircle } from 'react-icons/fi';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

// Interface for scan record
interface ScanRecord {
  id: string;
  childId: string;
  childName: string;
  nik: string;
  age: number;
  ageMonths: number;
  gender: string;
  height: number;
  weight: number;
  status: 'normal' | 'beresiko' | 'stunting';
  date: string;
  scanTime: string;
  imageUrl: string;
}

// Mock data - in real app this would come from API/database
const getScanRecordById = (childId: string, scanId: string) => {
  const scanRecords: { [key: string]: ScanRecord } = {
    'scan-1': {
      id: 'scan-1',
      childId: '1',
      childName: 'Emma Jhon',
      nik: '0291029102192',
      age: 2,
      ageMonths: 2,
      gender: 'male',
      height: 28.5,
      weight: 1.2,
      status: 'normal',
      date: '2024-09-02',
      scanTime: '10:05 WIB',
      imageUrl: '/image/icon/pengukuran-anak.jpg'
    },
    'scan-2': {
      id: 'scan-2',
      childId: '1',
      childName: 'Emma Jhon',
      nik: '0291029102192',
      age: 2,
      ageMonths: 1,
      gender: 'male',
      height: 28.5,
      weight: 1.2,
      status: 'normal',
      date: '2024-08-19',
      scanTime: '10:05 WIB',
      imageUrl: '/image/icon/pengukuran-anak.jpg'
    },
    'scan-3': {
      id: 'scan-3',
      childId: '1',
      childName: 'Emma Jhon',
      nik: '0291029102192',
      age: 2,
      ageMonths: 0,
      gender: 'male',
      height: 28.5,
      weight: 1.2,
      status: 'normal',
      date: '2024-08-18',
      scanTime: '14:20 WIB',
      imageUrl: '/image/icon/pengukuran-anak.jpg'
    },
    'scan-4': {
      id: 'scan-4',
      childId: '2',
      childName: 'Siti Rosidah',
      nik: '0291029102193',
      age: 3,
      ageMonths: 0,
      gender: 'female',
      height: 30,
      weight: 1.5,
      status: 'beresiko',
      date: '2024-08-20',
      scanTime: '11:15 WIB',
      imageUrl: '/image/icon/pengukuran-anak.jpg'
    },
    'scan-5': {
      id: 'scan-5',
      childId: '3',
      childName: 'Rehand',
      nik: '0291029102194',
      age: 1,
      ageMonths: 0,
      gender: 'male',
      height: 25,
      weight: 1.0,
      status: 'stunting',
      date: '2024-08-20',
      scanTime: '09:30 WIB',
      imageUrl: '/image/icon/pengukuran-anak.jpg'
    }
  };
  
  return scanRecords[scanId];
};

export default function HasilAnalisisPage() {
  const router = useRouter();
  const params = useParams();
  const childId = params?.id as string;
  const scanId = params?.scanId as string;
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  const record = scanId ? getScanRecordById(childId, scanId) : null;

  if (!record) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Data tidak ditemukan</h1>
            <button
              onClick={() => router.push(`/anak/${childId}`)}
              className="text-[#407A81] hover:underline cursor-pointer"
            >
              Kembali ke Profile Anak
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleBack = () => {
    router.push(`/anak/${childId}`);
  };

  const handleDelete = () => {
    console.log('Deleting scan record:', scanId);
    // TODO: Implement delete functionality
    router.push(`/anak/${childId}`);
  };

  const handleDetailLengkap = () => {
    setShowDetailModal(true);
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

        {/* Main Content */}
        <div className="relative z-20 max-w-3xl mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <FiArrowLeft className="w-6 h-6" />
              <span className="font-semibold text-lg">Anak</span>
            </button>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Title inside card */}
            <div className="px-8 pt-8 pb-6">
              <h1 className="text-3xl font-bold text-center text-gray-900">
                Hasil Analisis
              </h1>
            </div>
            <div className="px-8 pb-8">
              {/* Photo and Child Info Section */}
              <div className="space-y-8 mb-8">
                {/* Photo */}
                <div className="flex justify-center">
                  <div className="relative w-full max-w-md">
                    <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-md" style={{ backgroundColor: '#FFE5F0' }}>
                      {/* Captured image */}
                      <Image
                        src={record.imageUrl || "/image/icon/pengukuran-anak.jpg"}
                        alt="Hasil pengukuran"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Child Info */}
                <div className="space-y-5">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {record.childName}
                    </h2>
                  </div>
                  
                  <div className="space-y-5">
                    <div>
                      <span className="text-sm text-gray-500 font-medium mb-2 block">NIK Anak</span>
                      <div className="text-lg font-medium text-gray-900">
                        {record.nik}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <span className="text-sm text-gray-500 font-medium mb-2 block">Usia Bayi saat ini</span>
                        <div className="text-lg font-medium text-gray-900">
                          {record.age} Tahun {record.ageMonths > 0 ? `${record.ageMonths} ` : ''}Bulan
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500 font-medium mb-2 block">Jenis Kelamin</span>
                        <div className="text-lg font-medium text-gray-900">
                          {record.gender === 'male' ? 'Laki Laki' : 'Perempuan'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <span className="text-sm text-gray-500 font-medium mb-2 block">Waktu Pemeriksaan</span>
                        <div className="text-lg font-medium text-gray-900">
                          {new Date(record.date).toLocaleDateString('id-ID', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <div className="flex items-end">
                        <div className="bg-[#9ECAD6] text-white rounded-lg px-5 py-3 text-center w-full">
                          <span className="font-semibold text-sm">{record.scanTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-base font-semibold text-gray-500 text-center mb-6">
                  Hasil Utama
                </h3>

                {/* Measurement Cards in Single Row */}
                <div className="bg-[#E5F5F7] rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-center gap-12">
                    {/* Height */}
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-600 mb-3 font-medium">Tinggi Badan</span>
                      <div className="flex items-center gap-3">
                        <Image
                          src="/image/icon/tinggi-badan.svg"
                          alt="Height icon"
                          width={40}
                          height={50}
                        />
                        <span className="text-3xl font-bold text-[#407A81]">{record.height} cm</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-20 bg-gray-300"></div>

                    {/* Weight */}
                    <div className="flex flex-col items-center">
                      <span className="text-sm text-gray-600 mb-3 font-medium">Berat Badan</span>
                      <div className="flex items-center gap-3">
                        <Image
                          src="/image/icon/berat-badan.svg"
                          alt="Weight icon"
                          width={30}
                          height={50}
                        />
                        <span className="text-3xl font-bold text-[#407A81]">{record.weight} kg</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 font-semibold mb-4 text-center">Status Gizi Anak</p>
                  
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className={`
                        text-white rounded-xl py-4 px-6 shadow-sm text-center
                        ${record.status === 'normal' ? 'bg-green-500' : ''}
                        ${record.status === 'beresiko' ? 'bg-yellow-500' : ''}
                        ${record.status === 'stunting' ? 'bg-red-400' : ''}
                      `}>
                        <span className="font-bold text-base">
                          {record.status === 'normal' && 'Anak Tidak Stunting'}
                          {record.status === 'beresiko' && 'Anak Beresiko Stunting'}
                          {record.status === 'stunting' && 'Anak Terkena Stunting'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={handleDetailLengkap}
                      className="bg-[#407A81] text-white rounded-full p-4 hover:bg-[#326269] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span className="text-sm font-semibold px-2">Detail Lengkap</span>
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <FiHelpCircle className="w-4 h-4 text-[#407A81]" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={handleBack}
              className="w-full bg-[#407A81] text-white py-4 px-8 rounded-xl hover:bg-[#326269] transition-colors font-semibold text-lg shadow-sm cursor-pointer"
            >
              Simpan
            </button>
            <button
              onClick={handleDelete}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-red-500 py-4 px-8 rounded-xl hover:bg-red-50 transition-colors font-semibold text-lg shadow-sm cursor-pointer"
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
                src={record.imageUrl || "/image/icon/pengukuran-anak.jpg"}
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
                  <span className="text-4xl font-bold text-[#407A81]">{record.height} cm</span>
                </div>
              </div>
              <div className="flex-1 bg-[#E5F5F7] rounded-xl p-8 flex flex-col items-center border border-[#CDE6EA]">
                <span className="text-lg font-medium text-gray-600 mb-4">Berat Badan</span>
                <div className="flex items-center gap-4">
                  <Image src="/image/icon/berat-badan.svg" alt="Berat Badan" width={80} height={80} />
                  <span className="text-4xl font-bold text-[#407A81]">{record.weight} kg</span>
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
