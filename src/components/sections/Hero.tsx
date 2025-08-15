'use client';

import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

interface HeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  heroImage?: string;
  onButtonClick?: () => void;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Cegah Stunting Lebih Awal, Demi Generasi Sehat dan Cerdas",
  subtitle = "",
  description = "Pantau tinggi dan berat badan anak secara otomatis dengan teknologi Computer Vision & IoT yang akurat dan terpercaya.",
  buttonText = "Mulai Deteksi Sekarang",
  heroImage = "/hero-main-placeholder.png", // besar
  onButtonClick,
  className = '',
}) => {
  return (
  <section className={`wave-background min-h-screen flex items-center pt-24 pb-40 px-6 lg:px-12 relative ${className}`}>
      <div className="hero-container mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-14 items-center">
          {/* Left Content */}
          <div className="space-y-8 max-w-xl">
            {subtitle && (
              <p className="text-[var(--color-primary)] font-semibold text-lg">
                {subtitle}
              </p>
            )}
            
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white leading-tight tracking-tight drop-shadow-sm">
              {title}
            </h1>
            
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              {description}
            </p>
            
            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={onButtonClick}
                className="!bg-white !text-black hover:!bg-gray-100 focus:ring-white shadow-md px-10 py-4 text-sm font-semibold tracking-wide"
              >
                {buttonText}
              </Button>
            </div>
          </div>

          {/* Right Content - Large main image with small overlay */}
          <div className="relative flex justify-center lg:justify-start">
            {/* Main image container with doctor measuring child's height */}
            <div className="relative w-[580px] max-w-full rounded-[48px] overflow-hidden shadow-[0_8px_40px_-10px_rgba(0,0,0,0.15)] bg-white">
              <div className="relative w-full h-[420px] bg-gray-50 flex items-center justify-center">
                <div className="text-center text-gray-400 text-sm font-medium">
                  Doctor measuring child height
                </div>
              </div>
            </div>
            {/* Small overlay card showing weighing scale */}
            <div className="absolute -bottom-8 -left-4 w-48 h-40 rounded-[32px] overflow-hidden shadow-lg bg-white">
              <div className="relative w-full h-full bg-gray-50 flex items-center justify-center text-gray-400 text-xs font-medium">
                Baby weighing scale
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Wave scallop edge */}
      <div className="wave-edge" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path d="M0 60c60 0 60 60 120 60s60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60 60 60 120 60 60-60 120-60v60H0Z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
