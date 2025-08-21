'use client';

import React from 'react';
import Link from 'next/link';

interface ProfileButtonProps {
  profileImage?: string;
  profileName?: string;
  className?: string;
}

const ProfileButton: React.FC<ProfileButtonProps> = ({
  profileImage = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  profileName = "Profile",
  className = '',
}) => {
  return (
    <Link href="/profile" className={`flex items-center space-x-2 bg-teal-700 text-white px-4 py-2 rounded-full hover:bg-teal-800 transition-colors duration-200 ${className}`}>
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
        <img
          src={profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <span className="font-medium">{profileName}</span>
    </Link>
  );
};

export default ProfileButton;
