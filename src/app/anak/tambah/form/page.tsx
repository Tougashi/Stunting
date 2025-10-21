'use client';

import React, { useState, Suspense, useRef } from 'react';
import { Layout } from '@/components';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter, useSearchParams } from 'next/navigation';

function TambahAnakFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parentId = searchParams?.get('parentId');

  const [formData, setFormData] = useState({
    name: '',
    nik: '',
    birthPlace: '',
    birthDate: '',
    currentAge: 0,
    ageUnit: 'Bulan',
    gender: 'Laki Laki',
    childNumber: 1,
    birthWeight: 0,
    birthHeight: 0,
    birthHeadCircumference: 0
  });

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

  const [childImage, setChildImage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting data:', { ...formData, parentId });
    // TODO: Implement save functionality
    router.push('/anak');
  };

  const handleBack = () => {
    router.push('/anak/tambah');
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
              Tambah Anak
            </h1>

            {/* Profile Image */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-[#E5F3F5] flex items-center justify-center text-[#397789]">
                  {childImage ? (
                    <img src={childImage} alt="foto anak" className="w-full h-full object-cover" />
                  ) : (
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5Zm0 2c-4.418 0-8 3.582-8 8h16c0-4.418-3.582-8-8-8Z" fill="#397789"/>
                    </svg>
                  )}
                </div>
                {/* Camera icon overlay */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 w-10 h-10 bg-[#407A81] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#326269] transition-colors"
                >
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setChildImage(URL.createObjectURL(file));
                  }}
                />
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

export default function TambahAnakFormPage() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </Layout>
    }>
      <TambahAnakFormContent />
    </Suspense>
  );
}
