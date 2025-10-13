'use client';

import React, { useState } from 'react';
import { Layout } from '@/components';
import { FiArrowLeft, FiCalendar } from 'react-icons/fi';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

// Mock data - in real app this would come from API/database
const getChildById = (id: string) => {
  const children = [
    {
      id: '1',
      name: 'Emma Jhon',
      nik: '008211102131223',
      birthPlace: 'Tasikmalaya',
      birthDate: '2024-02-11',
      currentAge: 28,
      ageUnit: 'Bulan',
      gender: 'Laki Laki',
      childNumber: 2,
      birthWeight: 0.5,
      birthHeight: 30,
      birthHeadCircumference: 15,
      imageUrl: '/image/icon/bayi-icon.svg'
    },
    {
      id: '2',
      name: 'Siti Rosidah',
      nik: '008211102131224',
      birthPlace: 'Bandung',
      birthDate: '2023-03-15',
      currentAge: 3,
      ageUnit: 'Tahun',
      gender: 'Perempuan',
      childNumber: 1,
      birthWeight: 3.2,
      birthHeight: 48,
      birthHeadCircumference: 33,
      imageUrl: '/image/icon/bayi-icon.svg'
    }
  ];
  
  return children.find(c => c.id === id);
};

export default function EditChildPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const childData = id ? getChildById(id) : null;
  
  // Form state
  const [formData, setFormData] = useState({
    name: childData?.name || '',
    nik: childData?.nik || '',
    birthPlace: childData?.birthPlace || '',
    birthDate: childData?.birthDate || '',
    currentAge: childData?.currentAge || 0,
    ageUnit: childData?.ageUnit || 'Bulan',
    gender: childData?.gender || 'Laki Laki',
    childNumber: childData?.childNumber || 1,
    birthWeight: childData?.birthWeight || 0,
    birthHeight: childData?.birthHeight || 0,
    birthHeadCircumference: childData?.birthHeadCircumference || 0
  });

  if (!childData) {
    return (
      <Layout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Data tidak ditemukan</h1>
            <button
              onClick={() => router.push('/anak')}
              className="text-[#407A81] hover:underline cursor-pointer"
            >
              Kembali ke Anak
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const handleBack = () => {
    router.push('/anak');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGenderSelect = (gender: string) => {
    setFormData(prev => ({
      ...prev,
      gender
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    // TODO: Implement update functionality
    router.push('/anak');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="max-w-3xl mx-auto px-4 py-8">
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
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden p-8">
            {/* Title */}
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Edit Profile Anak
            </h1>

            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                  <Image
                    src={childData.imageUrl}
                    alt={formData.name}
                    width={80}
                    height={80}
                  />
                </div>
                {/* Camera icon overlay */}
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#407A81] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#326269] transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Identitas Anak Section */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Identitas Anak</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Nama Anak */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Anak
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none"
                      placeholder="Emma Jhon"
                    />
                  </div>

                  {/* NIK Anak */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NIK Anak
                    </label>
                    <input
                      type="text"
                      name="nik"
                      value={formData.nik}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none"
                      placeholder="008211102131223"
                    />
                  </div>

                  {/* Tempat Lahir */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tempat Lahir
                    </label>
                    <input
                      type="text"
                      name="birthPlace"
                      value={formData.birthPlace}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none"
                      placeholder="Tasikmalaya"
                    />
                  </div>

                  {/* Tanggal Lahir */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Lahir
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none"
                      />
                      <FiCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Usia Bayi saat ini */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usia Bayi saat ini
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        name="currentAge"
                        value={formData.currentAge}
                        onChange={handleInputChange}
                        className="w-16 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none text-center"
                        placeholder="28"
                      />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, ageUnit: 'Bulan' }))}
                        className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors cursor-pointer ${
                          formData.ageUnit === 'Bulan'
                            ? 'bg-[#407A81] text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Bulan
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, ageUnit: 'Tahun' }))}
                        className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors cursor-pointer ${
                          formData.ageUnit === 'Tahun'
                            ? 'bg-[#407A81] text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Tahun
                      </button>
                    </div>
                  </div>

                  {/* Jenis Kelamin */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Jenis Kelamin
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleGenderSelect('Laki Laki')}
                        className={`py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer ${
                          formData.gender === 'Laki Laki'
                            ? 'bg-[#407A81] text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Laki Laki
                      </button>
                      <button
                        type="button"
                        onClick={() => handleGenderSelect('Perempuan')}
                        className={`py-2 px-4 rounded-lg font-medium transition-colors cursor-pointer ${
                          formData.gender === 'Perempuan'
                            ? 'bg-[#407A81] text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Perempuan
                      </button>
                    </div>
                  </div>

                  {/* Anak Ke- */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Anak Ke-
                    </label>
                    <input
                      type="number"
                      name="childNumber"
                      value={formData.childNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none"
                      placeholder="2"
                    />
                  </div>
                </div>
              </div>

              {/* Data Timbangan saat Lahir Section */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Data Timbangan saat Lahir</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Berat Badan Lahir */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Berat Badan Lahir
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      name="birthWeight"
                      value={formData.birthWeight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none"
                      placeholder="0.5 Kg"
                    />
                  </div>

                  {/* Tinggi Badan Lahir */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tinggi Badan Lahir
                    </label>
                    <input
                      type="number"
                      name="birthHeight"
                      value={formData.birthHeight}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none"
                      placeholder="30 Cm"
                    />
                  </div>

                  {/* Lingkar Kepala Lahir */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lingkar Kepala Lahir
                    </label>
                    <input
                      type="number"
                      name="birthHeadCircumference"
                      value={formData.birthHeadCircumference}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#407A81] focus:border-transparent outline-none"
                      placeholder="15 Cm"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full md:w-2/3 lg:w-1/2 bg-[#407A81] text-white py-4 px-8 rounded-xl hover:bg-[#326269] transition-colors font-semibold text-lg shadow-lg cursor-pointer"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
