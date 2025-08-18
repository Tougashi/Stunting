'use client';

import React from 'react';
import Image from 'next/image';

interface ProcessCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  borderStyle: React.CSSProperties;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ icon, title, subtitle, description, borderStyle }) => {
  return (
    <div 
      className="p-8 text-center"
      style={{
        background: 'linear-gradient(120deg, rgba(158, 202, 214, 0.7) 0.59%, rgba(255, 255, 255, 0.7) 38.12%, rgba(255, 255, 255, 0.7) 68.77%, rgba(158, 202, 214, 0.7) 99.41%)',
        opacity: 1,
        boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D',
        ...borderStyle
      }}
    >
      <div className="flex justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">
        {title}
      </h3>
      <h4 className="text-base font-semibold text-gray-700 mb-3">
        {subtitle}
      </h4>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

interface ProcessProps {
  className?: string;
}

const Process: React.FC<ProcessProps> = ({ className = '' }) => {
  const processes = [
    {
      icon: (
        <Image 
          src="/image/icon/ambil-gambar-anak.svg" 
          alt="Ambil Gambar Anak Icon" 
          width={128} 
          height={128}
          className="w-32 h-32"
        />
      ),
      title: "Ambil Gambar Anak",
      subtitle: "Sistem mengenali tubuh dengan sensor Computer Vision",
      description: "",
      borderStyle: {
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '100px',
        borderBottomRightRadius: '20px',
        borderBottomLeftRadius: '100px'
      }
    },
    {
      icon: (
        <Image 
          src="/image/icon/pengolahan-otomatis.svg" 
          alt="Pengolahan Otomatis Icon" 
          width={128} 
          height={128}
          className="w-32 h-32"
        />
      ),
      title: "Pengolahan Otomatis",
      subtitle: "Data tinggi & berat dihitung secara akurat",
      description: "",
      borderStyle: {
        borderRadius: '20px'
      }
    },
    {
      icon: (
        <Image 
          src="/image/icon/lihat-hasil-rekomendasi.svg" 
          alt="Lihat Hasil Rekomendasi Icon" 
          width={128} 
          height={128}
          className="w-32 h-32"
        />
      ),
      title: "Lihat Hasil & Rekomendasi",
      subtitle: "Status gizi langsung ditampilkan",
      description: "",
      borderStyle: {
        borderTopLeftRadius: '100px',
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '100px',
        borderBottomLeftRadius: '20px'
      }
    }
  ];

  return (
    <section className={`py-20 px-6 lg:px-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9ECAD6] mb-4">
            Cara Kerja dalam 3 Langkah Mudah
          </h2>
        </div>

        {/* Process Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {processes.map((process, index) => (
            <ProcessCard
              key={index}
              icon={process.icon}
              title={process.title}
              subtitle={process.subtitle}
              description={process.description}
              borderStyle={process.borderStyle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
