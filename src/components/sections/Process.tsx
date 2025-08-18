'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ProcessCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  borderClass: string;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ icon, title, subtitle, description, borderClass }) => {
  return (
    <motion.div 
      className={`p-8 text-center bg-gradient-to-br from-[rgba(158,202,214,0.7)] via-[rgba(255,255,255,0.7)] to-[rgba(158,202,214,0.7)] opacity-100 shadow-[0px_1px_3px_1px_#00000026,0px_1px_2px_0px_#0000004D] h-96 flex flex-col justify-between ${borderClass}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.05, y: -10 }}
    >
      <motion.div 
        className="flex justify-center mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {icon}
      </motion.div>
      <div className="flex-grow flex flex-col justify-center">
        <motion.h3 
          className="text-lg font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h3>
        <motion.h4 
          className="text-base font-semibold text-gray-700 mb-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.h4>
        <motion.p 
          className="text-sm text-gray-600 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {description}
        </motion.p>
      </div>
    </motion.div>
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
      borderClass: "rounded-tl-[20px] rounded-tr-[100px] rounded-br-[20px] rounded-bl-[100px]"
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
      borderClass: "rounded-[20px]"
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
      borderClass: "rounded-tl-[100px] rounded-tr-[20px] rounded-br-[100px] rounded-bl-[20px]"
    }
  ];

  return (
    <motion.section 
      className={`py-20 px-6 lg:px-12 bg-white ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#9ECAD6] mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Cara Kerja dalam 3 Langkah Mudah
          </motion.h2>
        </motion.div>

        {/* Process Cards Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {processes.map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <ProcessCard
                icon={process.icon}
                title={process.title}
                subtitle={process.subtitle}
                description={process.description}
                borderClass={process.borderClass}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Process;
