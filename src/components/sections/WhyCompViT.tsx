'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

interface WhyCardProps {
  title: string;
  description: string;
  borderStyle: React.CSSProperties;
}

const WhyCard: React.FC<WhyCardProps> = ({ title, description, borderStyle }) => {
  return (
    <div 
      className="bg-white p-6 text-center h-40 flex flex-col justify-center"
      style={{
        boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D',
        opacity: 1,
        ...borderStyle
      }}
    >
      <h3 className="text-sm font-bold text-gray-800 mb-2 leading-tight">
        {title}
      </h3>
      <p className="text-xs text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

interface CTACardProps {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick?: () => void;
  borderStyle: React.CSSProperties;
}

const CTACard: React.FC<CTACardProps> = ({ image, title, subtitle, buttonText, onButtonClick, borderStyle }) => {
  return (
    <div 
      className="relative overflow-hidden text-center h-96"
      style={{
        boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D',
        opacity: 1,
        ...borderStyle
      }}
    >
      {/* Background Image */}
      <Image 
        src={image}
        alt="Pengukuran Anak" 
        fill
        className="object-cover"
      />
      
      {/* Overlay Content */}
      <div className="absolute inset-0 bg-black/30 flex flex-col justify-end p-8">
        <h3 className="text-xl font-bold text-white mb-2 leading-tight">
          {title}
        </h3>
        <h4 className="text-lg font-bold text-white mb-6">
          {subtitle}
        </h4>
        <Button
          variant="primary"
          size="lg"
          onClick={onButtonClick}
          className="!bg-white !text-black hover:!bg-gray-100 focus:ring-white shadow-md px-8 py-3 text-sm font-semibold tracking-wide rounded-full"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

interface WhyCompViTProps {
  className?: string;
  onStartDetection?: () => void;
}

const WhyCompViT: React.FC<WhyCompViTProps> = ({ className = '', onStartDetection }) => {
  const whyFeatures = [
    {
      title: "Akurat & Cepat",
      description: "Tanpa alat ukur manual yang rawan kesalahan"
    },
    {
      title: "Praktis & Hemat Waktu",
      description: "Cocok untuk posyandu, sekolah, dan rumah sakit"
    },
    {
      title: "Data Tersimpan Aman",
      description: "Mudah dipantau dari ponsel atau komputer"
    },
    {
      title: "Dukung Pencegahan Dini",
      description: "Membantu intervensi sebelum terlambat"
    }
  ];

  const cardBorderStyle = {
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px',
    borderBottomRightRadius: '10px',
    borderBottomLeftRadius: '10px'
  };

  const ctaBorderStyle = {
    borderTopLeftRadius: '100px',
    borderTopRightRadius: '100px',
    borderBottomRightRadius: '20px',
    borderBottomLeftRadius: '20px'
  };

  return (
    <section className={`wave-background min-h-screen py-20 px-6 lg:px-12 relative ${className}`}>
      {/* Wave scallop edge at top */}
      <div className="wave-edge-top" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0 60c60 0 60 60 120 60s60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60v60H0Z" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 pt-32">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
            Kenapa Harus<br />Menggunakan CompViT?
          </h2>
        </div>

        {/* Why Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {whyFeatures.map((feature, index) => (
            <WhyCard
              key={index}
              title={feature.title}
              description={feature.description}
              borderStyle={cardBorderStyle}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="flex flex-col items-center space-y-8">
          {/* Image Card */}
          <div className="w-full max-w-sm">
            <div 
              className="relative overflow-hidden h-64"
              style={{
                boxShadow: '0px 1px 3px 1px #00000026, 0px 1px 2px 0px #0000004D',
                opacity: 1,
                ...ctaBorderStyle
              }}
            >
              <Image 
                src="/image/icon/pengukuran-anak.png"
                alt="Pengukuran Anak" 
                fill
                className="object-cover"
              />
            </div>
          </div>
          
          {/* Heading */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">
              Mulai Deteksi Dini, Wujudkan
            </h3>
            <h4 className="text-xl font-bold text-white">
              Generasi Bebas Stunting
            </h4>
          </div>
          
          {/* Button */}
          <Button
            variant="primary"
            size="lg"
            onClick={onStartDetection}
            className="!bg-white !text-black hover:!bg-gray-100 focus:ring-white shadow-md px-8 py-3 text-sm font-semibold tracking-wide rounded-full"
          >
            Mulai Deteksi Sekarang
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyCompViT;
