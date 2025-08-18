'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface StatisticsProps {
  className?: string;
}

const Statistics: React.FC<StatisticsProps> = ({ className = '' }) => {
  return (
    <motion.section 
      className={`py-20 px-6 lg:px-12 bg-white ${className}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left Content - Chart/Infographic */}
          <motion.div 
            className="flex justify-center lg:justify-start"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full max-w-md">
              {/* Chart Container */}
              <motion.div 
                className="bg-white p-0 shadow-lg rounded-tl-[100px] rounded-tr-[20px] rounded-br-[100px] rounded-bl-[20px] opacity-100"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-white text-center py-4 px-6 mb-6 text-sm font-semibold bg-[#9ECAD6] rounded-tl-[100px] rounded-tr-[20px]">
                  PREVALENSI STUNTING DI INDONESIA
                </div>
                
                {/* Bar Chart */}
                <div className="px-8 mb-6">
                  <div className="flex items-end justify-between h-36 relative pt-6">
                    {/* Year bars with exact data */}
                    <motion.div 
                      className="flex flex-col items-center space-y-2"
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-xs font-medium text-[#9ECAD6]">36.8%</span>
                      <motion.div 
                        className="w-8 rounded-t bg-[#9ECAD6]"
                        initial={{ height: 0 }}
                        whileInView={{ height: '95px' }}
                        transition={{ duration: 1, delay: 0.8 }}
                        viewport={{ once: true }}
                        style={{ height: '95px' }}
                      ></motion.div>
                      <span className="text-xs text-gray-600 font-medium">2007</span>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col items-center space-y-2"
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.7 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-xs font-medium text-[#9ECAD6]">35.6%</span>
                      <motion.div 
                        className="w-8 rounded-t bg-[#9ECAD6]"
                        initial={{ height: 0 }}
                        whileInView={{ height: '90px' }}
                        transition={{ duration: 1, delay: 0.9 }}
                        viewport={{ once: true }}
                        style={{ height: '90px' }}
                      ></motion.div>
                      <span className="text-xs text-gray-600 font-medium">2010</span>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col items-center space-y-2"
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-xs font-medium text-[#9ECAD6]">37.2%</span>
                      <motion.div 
                        className="w-8 rounded-t bg-[#9ECAD6]"
                        initial={{ height: 0 }}
                        whileInView={{ height: '98px' }}
                        transition={{ duration: 1, delay: 1.0 }}
                        viewport={{ once: true }}
                        style={{ height: '98px' }}
                      ></motion.div>
                      <span className="text-xs text-gray-600 font-medium">2013</span>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col items-center space-y-2"
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-xs font-medium text-[#9ECAD6]">29%</span>
                      <motion.div 
                        className="w-8 rounded-t bg-[#9ECAD6]"
                        initial={{ height: 0 }}
                        whileInView={{ height: '75px' }}
                        transition={{ duration: 1, delay: 1.1 }}
                        viewport={{ once: true }}
                        style={{ height: '75px' }}
                      ></motion.div>
                      <span className="text-xs text-gray-600 font-medium">2015</span>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col items-center space-y-2"
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.0 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-xs font-medium text-[#9ECAD6]">27.5%</span>
                      <motion.div 
                        className="w-8 rounded-t bg-[#9ECAD6]"
                        initial={{ height: 0 }}
                        whileInView={{ height: '70px' }}
                        transition={{ duration: 1, delay: 1.2 }}
                        viewport={{ once: true }}
                        style={{ height: '70px' }}
                      ></motion.div>
                      <span className="text-xs text-gray-600 font-medium">2016</span>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col items-center space-y-2"
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-xs font-medium text-[#9ECAD6]">29.6%</span>
                      <motion.div 
                        className="w-8 rounded-t bg-[#9ECAD6]"
                        initial={{ height: 0 }}
                        whileInView={{ height: '77px' }}
                        transition={{ duration: 1, delay: 1.3 }}
                        viewport={{ once: true }}
                        style={{ height: '77px' }}
                      ></motion.div>
                      <span className="text-xs text-gray-600 font-medium">2017</span>
                    </motion.div>
                    <motion.div 
                      className="flex flex-col items-center space-y-2"
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 1.2 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-xs font-medium text-[#9ECAD6]">27.7%</span>
                      <motion.div 
                        className="w-8 rounded-t bg-[#9ECAD6]"
                        initial={{ height: 0 }}
                        whileInView={{ height: '71px' }}
                        transition={{ duration: 1, delay: 1.4 }}
                        viewport={{ once: true }}
                        style={{ height: '71px' }}
                      ></motion.div>
                      <span className="text-xs text-gray-600 font-medium">2019</span>
                    </motion.div>
                  </div>
                </div>

                {/* Legend and Icons */}
                <div className="px-8 pb-8">
                  {/* Icons */}
                  <motion.div 
                    className="flex justify-center space-x-6 mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.5 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex space-x-1">
                      {/* Baby Icon 1 - Light Blue */}
                      <motion.div 
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-[#9ECAD6]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                          {/* Baby head */}
                          <circle cx="12" cy="8" r="3" fill="currentColor"/>
                          {/* Baby body */}
                          <path d="M12 13c-2.5 0-4.5 1.5-4.5 3.5v2c0 0.5 0.5 1 1 1h7c0.5 0 1-0.5 1-1v-2c0-2-2-3.5-4.5-3.5z" fill="currentColor"/>
                          {/* Arms */}
                          <circle cx="8" cy="15" r="1" fill="currentColor"/>
                          <circle cx="16" cy="15" r="1" fill="currentColor"/>
                        </svg>
                      </motion.div>
                      {/* Baby Icon 2 - Light Blue */}
                      <motion.div 
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-[#9ECAD6]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.7 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                          {/* Baby head */}
                          <circle cx="12" cy="8" r="3" fill="currentColor"/>
                          {/* Baby body */}
                          <path d="M12 13c-2.5 0-4.5 1.5-4.5 3.5v2c0 0.5 0.5 1 1 1h7c0.5 0 1-0.5 1-1v-2c0-2-2-3.5-4.5-3.5z" fill="currentColor"/>
                          {/* Arms */}
                          <circle cx="8" cy="15" r="1" fill="currentColor"/>
                          <circle cx="16" cy="15" r="1" fill="currentColor"/>
                        </svg>
                      </motion.div>
                    </div>
                    <div className="flex space-x-1">
                      {/* Baby Icon 3 - Medium Blue */}
                      <motion.div 
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-[#B8D4DB]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.8 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                          {/* Baby head */}
                          <circle cx="12" cy="8" r="3" fill="currentColor"/>
                          {/* Baby body */}
                          <path d="M12 13c-2.5 0-4.5 1.5-4.5 3.5v2c0 0.5 0.5 1 1 1h7c0.5 0 1-0.5 1-1v-2c0-2-2-3.5-4.5-3.5z" fill="currentColor"/>
                          {/* Arms */}
                          <circle cx="8" cy="15" r="1" fill="currentColor"/>
                          <circle cx="16" cy="15" r="1" fill="currentColor"/>
                        </svg>
                      </motion.div>
                      {/* Baby Icon 4 - Dark Blue */}
                      <motion.div 
                        className="w-8 h-8 rounded-full flex items-center justify-center bg-[#4A5B6B]"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.9 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                          {/* Baby head */}
                          <circle cx="12" cy="8" r="3" fill="currentColor"/>
                          {/* Baby body */}
                          <path d="M12 13c-2.5 0-4.5 1.5-4.5 3.5v2c0 0.5 0.5 1 1 1h7c0.5 0 1-0.5 1-1v-2c0-2-2-3.5-4.5-3.5z" fill="currentColor"/>
                          {/* Arms */}
                          <circle cx="8" cy="15" r="1" fill="currentColor"/>
                          <circle cx="16" cy="15" r="1" fill="currentColor"/>
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                  
                  <div className="text-center">
                    <p className="text-sm font-semibold text-[#9ECAD6]">
                      1 dari 4 anak balita Indonesia
                    </p>
                    <p className="text-sm font-semibold text-[#9ECAD6]">
                      berisiko mengalami <em>stunting</em>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Content - Text */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] leading-tight"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              Stunting Masih Mengancam Masa Depan Anak Indonesia
            </motion.h2>
            
            <div className="space-y-4 text-gray-700">
              <motion.p 
                className="text-lg font-semibold"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
              >
                1 dari 4 anak di Indonesia mengalami stunting
              </motion.p>
              
              <motion.p 
                className="text-base leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
              >
                Menurut tim survei terdahulu tercatat bahwa keterlambatan 
                pengukuran merupakan salah satu penyebab permanen dari 
                tingginya permeasuran turun.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Statistics;
