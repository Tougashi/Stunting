'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileButtonProps {
  className?: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  className = '',
}) => {
  const { user } = useAuth();

  const displayName = user?.name || 'Profile';
  const profileImage = user?.profile_image;

  return (
    <Link href="/profile" className={`flex items-center space-x-2 bg-[#407A81] text-white px-4 py-2 rounded-full hover:bg-[#326269] transition-colors duration-200 cursor-pointer ${className}`}>
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
        {profileImage ? (
          <img
            src={profileImage}
            alt={displayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const fallback = target.parentElement?.querySelector('.fallback-avatar') as HTMLElement;
              if (fallback) fallback.classList.remove('hidden');
            }}
          />
        ) : null}
        <div className={`fallback-avatar w-full h-full bg-white bg-opacity-20 flex items-center justify-center ${profileImage ? 'hidden' : ''}`}>
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
      </div>
      <span className="font-medium">{displayName}</span>
    </Link>
  );
};

export default ProfileButton;
