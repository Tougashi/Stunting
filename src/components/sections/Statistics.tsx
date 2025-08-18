'use client';

import React from 'react';

interface StatisticsProps {
  className?: string;
}

const Statistics: React.FC<StatisticsProps> = ({ className = '' }) => {
  return (
    <section className={`py-20 px-6 lg:px-12 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left Content - Chart/Infographic */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              {/* Chart Container */}
              <div className="bg-white p-0 shadow-lg" style={{
                borderTopLeftRadius: '100px',
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '100px',
                borderBottomLeftRadius: '20px',
                opacity: 1
              }}>
                <div className="text-white text-center py-4 px-6 mb-6 text-sm font-semibold" style={{
                  backgroundColor: '#9ECAD6',
                  borderTopLeftRadius: '100px',
                  borderTopRightRadius: '20px'
                }}>
                  PREVALENSI STUNTING DI INDONESIA
                </div>
                
                {/* Bar Chart */}
                <div className="px-8 mb-6">
                  <div className="flex items-end justify-between h-40">
                    {/* Year bars with exact data */}
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-xs font-medium" style={{color: '#9ECAD6'}}>36.8%</span>
                      <div className="w-12 rounded-t" style={{
                        height: '100%',
                        backgroundColor: '#9ECAD6'
                      }}></div>
                      <span className="text-xs text-gray-600 font-medium">2007</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-xs font-medium" style={{color: '#9ECAD6'}}>35.6%</span>
                      <div className="w-12 rounded-t" style={{
                        height: '95%',
                        backgroundColor: '#9ECAD6'
                      }}></div>
                      <span className="text-xs text-gray-600 font-medium">2010</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-xs font-medium" style={{color: '#9ECAD6'}}>37.2%</span>
                      <div className="w-12 rounded-t" style={{
                        height: '98%',
                        backgroundColor: '#9ECAD6'
                      }}></div>
                      <span className="text-xs text-gray-600 font-medium">2013</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-xs font-medium" style={{color: '#9ECAD6'}}>29%</span>
                      <div className="w-12 rounded-t" style={{
                        height: '70%',
                        backgroundColor: '#9ECAD6'
                      }}></div>
                      <span className="text-xs text-gray-600 font-medium">2015</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-xs font-medium" style={{color: '#9ECAD6'}}>27.5%</span>
                      <div className="w-12 rounded-t" style={{
                        height: '65%',
                        backgroundColor: '#9ECAD6'
                      }}></div>
                      <span className="text-xs text-gray-600 font-medium">2016</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-xs font-medium" style={{color: '#9ECAD6'}}>29.6%</span>
                      <div className="w-12 rounded-t" style={{
                        height: '72%',
                        backgroundColor: '#9ECAD6'
                      }}></div>
                      <span className="text-xs text-gray-600 font-medium">2017</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-xs font-medium" style={{color: '#9ECAD6'}}>27.7%</span>
                      <div className="w-12 rounded-t" style={{
                        height: '68%',
                        backgroundColor: '#9ECAD6'
                      }}></div>
                      <span className="text-xs text-gray-600 font-medium">2019</span>
                    </div>
                  </div>
                </div>

                {/* Legend and Icons */}
                <div className="px-8 pb-8">
                  {/* Icons */}
                  <div className="flex justify-center space-x-6 mb-4">
                    <div className="flex space-x-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#9ECAD6'}}>
                        <div className="w-4 h-5 bg-white rounded-sm"></div>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#9ECAD6'}}>
                        <div className="w-4 h-5 bg-white rounded-sm"></div>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#B8D4DB'}}>
                        <div className="w-4 h-5 bg-white rounded-sm"></div>
                      </div>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: '#4A5B6B'}}>
                        <div className="w-4 h-5 bg-white rounded-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-semibold" style={{color: '#9ECAD6'}}>
                      1 dari 4 anak balita Indonesia
                    </p>
                    <p className="text-sm font-semibold" style={{color: '#9ECAD6'}}>
                      berisiko mengalami <em>stunting</em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Text */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-primary)] leading-tight">
              Stunting Masih Mengancam Masa Depan Anak Indonesia
            </h2>
            
            <div className="space-y-4 text-gray-700">
              <p className="text-lg font-semibold">
                1 dari 4 anak di Indonesia mengalami stunting
              </p>
              
              <p className="text-base leading-relaxed">
                Menurut tim survei terdahulu tercatat bahwa keterlambatan 
                pengukuran merupakan salah satu penyebab permanen dari 
                tingginya permeasuran turun.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
