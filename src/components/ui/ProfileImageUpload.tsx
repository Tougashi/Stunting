'use client';

import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { uploadProfileImage, deleteProfileImage } from '@/utils/storage';

interface ProfileImageUploadProps {
  currentImageUrl?: string;
  onImageUpdate?: (imageUrl: string) => void;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  currentImageUrl,
  onImageUpdate
}) => {
  const { user, updateProfileImage } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    setSelectedFile(file);
    setShowConfirm(true);
  };

  const handleConfirmUpload = async () => {
    if (!selectedFile || !user) return;

    setError('');
    setUploading(true);
    setShowConfirm(false);

    try {
      // Delete old image if exists
      if (currentImageUrl && currentImageUrl.includes('supabase')) {
        try {
          await deleteProfileImage(user.id);
        } catch (deleteError) {
          console.warn('Failed to delete old image:', deleteError);
          // Continue with upload even if delete fails
        }
      }

      // Upload new image to Supabase Storage
      const uploadResult = await uploadProfileImage(selectedFile, user.id);

      if (!uploadResult.success) {
        setError(uploadResult.error || 'Upload failed');
        return;
      }

      // Update profile image in database
      const updateResult = await updateProfileImage(uploadResult.url!);

      if (!updateResult.success) {
        setError(updateResult.error || 'Update failed');
        return;
      }

      // Call callback if provided
      if (onImageUpdate) {
        onImageUpdate(uploadResult.url!);
      }

    } catch (error) {
      console.error('Upload error:', error);
      setError('An unexpected error occurred');
    } finally {
      setUploading(false);
      setSelectedFile(null);
      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleCancelUpload = () => {
    setShowConfirm(false);
    setSelectedFile(null);
    setError('');
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="text-center">
      <div className="relative inline-block">
        {/* Profile Image */}
        <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 cursor-pointer group relative" onClick={handleClick}>
          {currentImageUrl ? (
            <img 
              src={currentImageUrl} 
              alt={user?.name || 'User'}
              className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
            />
          ) : (
            <div className="w-full h-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
              <svg className="w-16 h-16 text-teal-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          )}
          
          {/* Upload Overlay - Bulat */}
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
            <div className="text-white text-center">
              <svg className="w-8 h-8 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs">Upload</p>
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Confirmation Modal */}
      {showConfirm && selectedFile && (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Konfirmasi Upload</h3>
            
            {/* Preview Image */}
            <div className="mb-4">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="w-32 h-32 mx-auto rounded-full object-cover"
              />
            </div>
            
            <p className="text-gray-600 mb-4">
              Apakah Anda yakin ingin mengupload gambar ini? 
              {currentImageUrl && ' Gambar lama akan diganti.'}
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={handleCancelUpload}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmUpload}
                className="flex-1 px-4 py-2 bg-[#407A81] text-white rounded-md hover:bg-[#326269] transition-colors"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mt-4 text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Uploading Indicator */}
      {uploading && (
        <div className="mt-4 text-[#407A81] text-sm">
          Uploading...
        </div>
      )}
    </div>
  );
};

export default ProfileImageUpload;
