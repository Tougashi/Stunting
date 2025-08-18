'use client';

import React from 'react';
import Image from 'next/image';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div 
      className="bg-white p-8 text-center"
      style={{
        borderTopLeftRadius: '100px',
        borderTopRightRadius: '100px',
        borderBottomRightRadius: '10px',
        borderBottomLeftRadius: '10px',
        opacity: 1,
        border: '2px solid #9ECAD6'
      }}
    >
      <div className="flex justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-gray-800 mb-3 leading-tight">
        {title}
      </h3>
      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

interface FeaturesProps {
  className?: string;
}

const Features: React.FC<FeaturesProps> = ({ className = '' }) => {
  const features = [
    {
      icon: (
        <Image 
          src="/image/icon/tinggi-berat-badan.svg" 
          alt="Tinggi Berat Badan Icon" 
          width={128} 
          height={128}
          className="w-32 h-32"
        />
      ),
      title: "Mengukur tinggi dan berat badan anak otomatis dari kamera",
      description: ""
    },
    {
      icon: (
        <Image 
          src="/image/icon/status-gizi.svg" 
          alt="Status Gizi Icon" 
          width={128} 
          height={128}
          className="w-32 h-32"
        />
      ),
      title: "Memberikan status gizi dan potensi risiko stunting secara real-time",
      description: ""
    },
    {
      icon: (
        <Image 
          src="/image/icon/data-pertumbuhan.svg" 
          alt="Data Pertumbuhan Icon" 
          width={128} 
          height={128}
          className="w-32 h-32"
        />
      ),
      title: "Menyimpan data pertumbuhan anak secara digital dan aman",
      description: ""
    },
    {
      icon: (
        <Image 
          src="/image/icon/pertumbuhan-gizi.svg" 
          alt="Pertumbuhan Gizi Icon" 
          width={128} 
          height={128}
          className="w-32 h-32"
        />
      ),
      title: "Memberikan rekomendasi gizi dan pola makan sesuai kebutuhan",
      description: ""
    }
  ];

  return (
    <section className={`py-20 px-6 lg:px-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9ECAD6] mb-4">
            Deteksi Cepat & Akurat dengan CompViT
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Dengan teknologi Computer Vision dan IoT, CompViT mampu:
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
