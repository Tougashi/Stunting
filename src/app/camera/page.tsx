'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components';
import { FiChevronDown, FiCamera, FiArrowLeft, FiArrowRightCircle } from 'react-icons/fi';
import { LuUndo2 } from 'react-icons/lu';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CameraPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCamera, setSelectedCamera] = useState<'Camera Raspberry' | 'Camera Handphone'>('Camera Raspberry');
  const [showCameraDropdown, setShowCameraDropdown] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showCaptureResult, setShowCaptureResult] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Get initial camera type from URL params
  useEffect(() => {
    const cameraType = searchParams?.get('camera');
    if (cameraType === 'handphone') {
      setSelectedCamera('Camera Handphone');
    } else {
      setSelectedCamera('Camera Raspberry');
    }
  }, [searchParams]);

  // Initialize camera
  useEffect(() => {
    initializeCamera();
  }, [selectedCamera]);

  const initializeCamera = async () => {
    try {
      if (videoRef.current) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: 1280, 
            height: 720,
            facingMode: selectedCamera === 'Camera Handphone' ? 'user' : 'environment'
          } 
        });
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const handleCameraSwitch = (camera: 'Camera Raspberry' | 'Camera Handphone') => {
    setSelectedCamera(camera);
    setShowCameraDropdown(false);
  };

  const handleCapture = () => {
    setIsCapturing(true);
    
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        // Convert to data URL and show capture result
        const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageDataUrl);
        setShowCaptureResult(true);
      }
    }
    
    setTimeout(() => setIsCapturing(false), 500);
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowCaptureResult(false);
  };

  const handleContinue = () => {
    // Process the captured image and navigate to result page
    console.log('Processing captured image:', capturedImage);
    
    // Get child ID from URL params
    const childId = searchParams?.get('child');
    const cameraType = searchParams?.get('camera');
    
    // Navigate to result page with captured image data
    router.push(`/result?child=${childId}&camera=${cameraType}&timestamp=${Date.now()}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <Layout>
      <div className="min-h-screen relative">
        {/* Header */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white/90 transition-colors shadow-lg"
          >
            <FiArrowLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Camera Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowCameraDropdown(!showCameraDropdown)}
              className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-white transition-colors shadow-lg border border-gray-200"
            >
              <span className="text-gray-700 font-medium text-sm">{selectedCamera}</span>
              <FiChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showCameraDropdown && (
              <div className="absolute top-full right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-30 p-3">
                <div className="space-y-2">
                  <button
                    onClick={() => handleCameraSwitch('Camera Raspberry')}
                    className={`w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                      selectedCamera === 'Camera Raspberry' 
                        ? 'bg-[#407A81] text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Camera Rusbery
                  </button>
                  <button
                    onClick={() => handleCameraSwitch('Camera Handphone')}
                    className={`w-full text-center py-3 px-4 rounded-lg font-medium transition-colors border border-[#407A81] ${
                      selectedCamera === 'Camera Handphone' 
                        ? 'bg-[#407A81] text-white' 
                        : 'bg-white text-[#407A81] hover:bg-[#407A81] hover:text-white'
                    }`}
                  >
                    Camera Handphone
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-20">
          {/* Camera Container */}
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Camera View */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              {!showCaptureResult ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-[600px] object-cover"
                />
              ) : (
                <img
                  src={capturedImage || ''}
                  alt="Captured"
                  className="w-full h-[600px] object-cover"
                />
              )}
              
              {/* Overlay Frame */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Corner brackets */}
                <div className="absolute top-8 left-8 w-12 h-12">
                  <div className="absolute top-0 left-0 w-full h-2 bg-cyan-400 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-2 h-full bg-cyan-400 rounded-full"></div>
                </div>
                <div className="absolute top-8 right-8 w-12 h-12">
                  <div className="absolute top-0 right-0 w-full h-2 bg-cyan-400 rounded-full"></div>
                  <div className="absolute top-0 right-0 w-2 h-full bg-cyan-400 rounded-full"></div>
                </div>
                <div className="absolute bottom-8 left-8 w-12 h-12">
                  <div className="absolute bottom-0 left-0 w-full h-2 bg-cyan-400 rounded-full"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-full bg-cyan-400 rounded-full"></div>
                </div>
                <div className="absolute bottom-8 right-8 w-12 h-12">
                  <div className="absolute bottom-0 right-0 w-full h-2 bg-cyan-400 rounded-full"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-full bg-cyan-400 rounded-full"></div>
                </div>

                {/* Center guidelines */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-32 h-0.5 bg-cyan-400/50 mb-2"></div>
                  <div className="w-0.5 h-32 bg-cyan-400/50 mx-auto"></div>
                </div>
              </div>

              {/* Camera Status - Left Bottom */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 text-white px-3 py-2 rounded-lg">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm">{selectedCamera}</span>
              </div>

              {/* Instruction and Controls - Center Bottom */}
              {!showCaptureResult ? (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3">
                  {/* Instruction Text */}
                  <div className="bg-black/70 text-white px-4 py-2 rounded-lg">
                    <p className="text-sm text-center">
                      Posisikan subjek dalam bingkai
                      <br />
                      <span className="text-xs text-gray-300">Ketuk tombol kamera saat siap</span>
                    </p>
                  </div>
                  
                  {/* Camera Capture Button */}
                  <button
                    onClick={handleCapture}
                    disabled={isCapturing}
                    className={`bg-[#407A81] hover:bg-[#326269] disabled:bg-gray-400 text-white rounded-full p-4 shadow-xl transition-all duration-200 ${
                      isCapturing ? 'scale-95' : 'hover:scale-105'
                    }`}
                  >
                    <FiCamera className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                  {/* Retake Button */}
                  <button
                    onClick={handleRetake}
                    className="bg-white hover:bg-gray-100 text-[#407A81] rounded-full p-4 shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200"
                  >
                    <LuUndo2 className="w-6 h-6" />
                  </button>
                  
                  {/* Continue Button */}
                  <button
                    onClick={handleContinue}
                    className="bg-[#407A81] hover:bg-[#326269] text-white rounded-full p-4 shadow-xl transition-all duration-200 hover:scale-105"
                  >
                    <FiArrowRightCircle className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hidden canvas for capturing */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </Layout>
  );
}
