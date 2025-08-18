'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

interface WhyCardProps {
  title: string;
  description: string;
}

const WhyCard: React.FC<WhyCardProps> = ({ title, description }) => {
  return (
    <motion.div 
      className="bg-white p-6 text-center h-40 flex flex-col justify-center shadow-[0px_1px_3px_1px_#00000026,0px_1px_2px_0px_#0000004D] opacity-100 rounded-tl-[100px] rounded-tr-[100px] rounded-br-[10px] rounded-bl-[10px]"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -5 }}
    >
      <motion.h3 
        className="text-sm font-bold text-gray-800 mb-2 leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {title}
      </motion.h3>
      <motion.p 
        className="text-xs text-gray-600 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        {description}
      </motion.p>
    </motion.div>
  );
};

interface CTACardProps {
  image: string;
  title: string;
  subtitle: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const CTACard: React.FC<CTACardProps> = ({ image, title, subtitle, buttonText, onButtonClick }) => {
  return (
    <div className="relative overflow-hidden text-center h-96 shadow-[0px_1px_3px_1px_#00000026,0px_1px_2px_0px_#0000004D] opacity-100 rounded-tl-[100px] rounded-tr-[100px] rounded-br-[20px] rounded-bl-[20px]">
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

  return (
    <motion.section 
      className={`wave-background-bottom min-h-screen py-20 px-6 lg:px-12 relative ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Wave scallop edge at top */}
      <div className="wave-edge-top" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0 60c60 0 60 60 120 60s60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60v60H0Z" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10 pt-32">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Kenapa Harus<br />Menggunakan CompViT?
          </motion.h2>
        </motion.div>

        {/* Why Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {whyFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <WhyCard
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="flex flex-col items-center space-y-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {/* Image Card */}
          <motion.div 
            className="w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative overflow-hidden h-64 opacity-100 rounded-tl-[100px] rounded-tr-[100px] rounded-br-[20px] rounded-bl-[20px]">
              <Image 
                src="/image/icon/pengukuran-anak.png"
                alt="Pengukuran Anak" 
                fill
              />
            </div>
          </motion.div>
          
          {/* Heading */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.h3 
              className="text-2xl font-bold text-white mb-2 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              Mulai Deteksi Dini, Wujudkan
            </motion.h3>
            <motion.h4 
              className="text-xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              viewport={{ once: true }}
            >
              Generasi Bebas Stunting
            </motion.h4>
          </motion.div>
          
          {/* Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="primary"
              size="lg"
              onClick={onStartDetection}
              className="!bg-white !text-black hover:!bg-gray-100 focus:ring-white shadow-md px-8 py-3 text-sm font-semibold tracking-wide rounded-full"
            >
              Mulai Deteksi Sekarang
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default WhyCompViT;
