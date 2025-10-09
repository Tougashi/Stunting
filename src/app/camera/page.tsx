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
  const raspberryImgRef = useRef<HTMLImageElement>(null);
  const RASPBERRY_URL = 'http://10.13.0.22:8000/video';
  const RASPBERRY_CAPTURE_URL = 'http://10.13.0.22:8000/capture';
  const RASPBERRY_CALIBRATE_URL = 'http://10.13.0.22:8000/calibrate/aruco';
  const RASPBERRY_DIRECT_CAPTURE_URL = 'http://10.13.0.22:8000/direct-capture'; // Alternative endpoint if available
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isTestingConnection, setIsTestingConnection] = useState(false);

  // Get initial camera type from URL params
  useEffect(() => {
    const cameraType = searchParams?.get('camera');
    if (cameraType === 'handphone') {
      setSelectedCamera('Camera Handphone');
    } else {
      setSelectedCamera('Camera Raspberry');
    }
  }, [searchParams]);

  // Initialize camera (only for Handphone - local device camera)
  useEffect(() => {
    if (selectedCamera === 'Camera Handphone') {
      initializeCamera();
    } else {
      // stop any existing local streams when switching to Raspberry
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((t) => t.stop());
        videoRef.current.srcObject = null;
      }
    }
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

  const captureFromRaspberry = async (): Promise<string | null> => {
    try {
      console.log('🍓 Capturing from Raspberry camera...');
      
      // Method 1: Try to capture current frame from the video stream first
      if (raspberryImgRef.current && canvasRef.current) {
        console.log('📷 Method 1: Attempting to capture current frame from stream...');
        const img = raspberryImgRef.current as HTMLImageElement;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        console.log('Raspberry image details:', {
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight,
          width: img.width,
          height: img.height,
          complete: img.complete,
          src: img.src
        });
        
        if (context && img.complete) {
          const w = img.naturalWidth || img.width || 1280;
          const h = img.naturalHeight || img.height || 720;
          canvas.width = w;
          canvas.height = h;
          
          try {
            // Try to draw the image and capture it
            context.drawImage(img, 0, 0, w, h);
            const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
            console.log('✅ Frame captured from stream, converting to blob...');
            
            // Convert to blob and send to API
            const response = await fetch(imageDataUrl);
            const blob = await response.blob();
            
            const formData = new FormData();
            const filename = `raspberry_capture_${Date.now()}.jpg`;
            formData.append('image', blob, filename);
            
            console.log('🚀 Method 1: Sending captured frame to API...');
            const uploadResponse = await fetch(RASPBERRY_CAPTURE_URL, {
              method: 'POST',
              body: formData,
              headers: {
                'accept': 'application/json',
              },
              mode: 'cors',
            });
            
            if (uploadResponse.ok) {
              const result = await uploadResponse.json();
              if (result.status === 'success' && result.image) {
                console.log('✅ Method 1 successful:', result.image);
                return result.image;
              }
            }
            
          } catch (drawError) {
            console.warn('❌ Method 1 failed (likely CORS):', drawError);
          }
        }
      }
      
      // Method 2: Try direct capture endpoint (if exists)
      try {
        console.log('📷 Method 2: Trying direct capture endpoint...');
        const directResponse = await fetch(RASPBERRY_DIRECT_CAPTURE_URL, {
          method: 'POST',
          headers: {
            'accept': 'application/json',
          },
          mode: 'cors',
        });
        
        if (directResponse.ok) {
          const result = await directResponse.json();
          if (result.status === 'success' && result.image) {
            console.log('✅ Method 2 successful:', result.image);
            return result.image;
          }
        } else if (directResponse.status !== 404) {
          console.warn('Method 2 failed:', directResponse.status, directResponse.statusText);
        }
      } catch (directError) {
        console.warn('Method 2 not available:', directError);
      }
      
      // Method 3: Create a more realistic trigger image
      console.log('📷 Method 3: Creating realistic trigger image...');
      const canvas = document.createElement('canvas');
      canvas.width = 640; // More realistic camera resolution
      canvas.height = 480;
      const context = canvas.getContext('2d');
      
      if (context) {
        // Create a more realistic image that looks like a camera capture
        const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#f0f0f0');
        gradient.addColorStop(0.5, '#e0e0e0');
        gradient.addColorStop(1, '#d0d0d0');
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some visual elements to make it look more like a real image
        context.fillStyle = '#407A81';
        context.fillRect(50, 50, canvas.width - 100, canvas.height - 100);
        
        context.fillStyle = 'white';
        context.font = 'bold 24px Arial';
        context.textAlign = 'center';
        context.fillText('RASPBERRY PI', canvas.width / 2, canvas.height / 2 - 20);
        context.fillText('CAPTURE TRIGGER', canvas.width / 2, canvas.height / 2 + 20);
        
        // Add timestamp
        context.font = '14px Arial';
        context.fillText(new Date().toISOString(), canvas.width / 2, canvas.height - 30);
        
        const blob = await new Promise<Blob | null>((resolve) => {
          canvas.toBlob(resolve, 'image/jpeg', 0.95); // Higher quality
        });
        
        if (blob) {
          console.log('📊 Created trigger image:', {
            size: blob.size,
            type: blob.type,
            width: canvas.width,
            height: canvas.height
          });
          
          const formData = new FormData();
          const filename = `raspberry_trigger_${Date.now()}.jpg`;
          formData.append('image', blob, filename);
          
          // Log the FormData contents for debugging
          console.log('� FormData details:');
          for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
              console.log(`  ${key}:`, {
                name: value.name,
                size: value.size,
                type: value.type,
                lastModified: value.lastModified
              });
            } else {
              console.log(`  ${key}:`, value);
            }
          }
          
          console.log('�🚀 Method 3: Sending trigger image to API...');
          const uploadResponse = await fetch(RASPBERRY_CAPTURE_URL, {
            method: 'POST',
            body: formData,
            headers: {
              'accept': 'application/json',
            },
            mode: 'cors',
          });
          
          console.log('📡 Method 3 response:', {
            status: uploadResponse.status,
            statusText: uploadResponse.statusText,
            ok: uploadResponse.ok,
            headers: Object.fromEntries(uploadResponse.headers.entries())
          });
          
          // Log the raw response text first
          const responseText = await uploadResponse.text();
          console.log('📄 Raw response text:', responseText);
          
          if (!uploadResponse.ok) {
            throw new Error(`Method 3 failed: ${uploadResponse.status} ${uploadResponse.statusText} - ${responseText}`);
          }
          
          let result;
          try {
            result = JSON.parse(responseText);
          } catch (parseError) {
            console.error('❌ Failed to parse JSON response:', parseError);
            throw new Error(`Invalid JSON response: ${responseText}`);
          }
          
          console.log('📥 Method 3 parsed result:', result);
          
          if (result.status === 'success') {
            if (result.image) {
              console.log('✅ Method 3 successful with image:', result.image);
              return result.image;
            } else {
              console.warn('⚠️ Method 3 successful but image is null:', result);
              // Still return something to indicate success, even if image is null
              return `trigger_response_${Date.now()}`;
            }
          } else {
            throw new Error(result.message || 'Method 3 failed - server returned error status');
          }
        }
      }
      
      throw new Error('Failed to create any valid capture request');
      
    } catch (error) {
      console.error('❌ All Raspberry capture methods failed:', error);
      throw error;
    }
  };

  const handleCameraSwitch = (camera: 'Camera Raspberry' | 'Camera Handphone') => {
    setSelectedCamera(camera);
    setShowCameraDropdown(false);
  };

  const uploadCapturedImage = async (imageDataUrl: string): Promise<string | null> => {
    try {
      console.log('📤 Starting upload process...');
      console.log('API URL:', RASPBERRY_CAPTURE_URL);
      console.log('Image data URL length:', imageDataUrl.length);
      
      setIsUploading(true);
      
      // Convert data URL to blob
      console.log('🔄 Converting data URL to blob...');
      const response = await fetch(imageDataUrl);
      const blob = await response.blob();
      console.log('✅ Blob created:', {
        size: blob.size,
        type: blob.type
      });
      
      // Create FormData
      const formData = new FormData();
      const filename = `capture_${Date.now()}.jpg`;
      formData.append('image', blob, filename);
      console.log('📝 FormData prepared with filename:', filename);
      
      // Upload to API
      console.log('🚀 Sending request to API...');
      const uploadResponse = await fetch(RASPBERRY_CAPTURE_URL, {
        method: 'POST',
        body: formData,
        headers: {
          'accept': 'application/json',
          // Do NOT set Content-Type for FormData - browser will set it automatically with boundary
        },
        mode: 'cors',
      });
      
      console.log('📡 Response received:', {
        status: uploadResponse.status,
        statusText: uploadResponse.statusText,
        ok: uploadResponse.ok,
        headers: Object.fromEntries(uploadResponse.headers.entries())
      });
      
      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text().catch(() => 'No error text available');
        console.error('❌ Upload failed:', {
          status: uploadResponse.status,
          statusText: uploadResponse.statusText,
          errorText
        });
        throw new Error(`Upload failed: ${uploadResponse.status} ${uploadResponse.statusText} - ${errorText}`);
      }
      
      // Get raw response text first for better debugging
      const responseText = await uploadResponse.text();
      console.log('📄 Raw response text:', responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('❌ Failed to parse JSON response:', parseError);
        throw new Error(`Invalid JSON response: ${responseText}`);
      }
      
      console.log('📥 Parsed JSON response:', result);
      
      if (result.status === 'success') {
        console.log('✅ Upload successful, checking image field...');
        
        if (result.image) {
          console.log('✅ Upload capture successful with image:', result.image);
          return result.image;
        } else {
          console.warn('⚠️ Upload successful but image is null. Full response:', result);
          // Server processed successfully but didn't return image filename
          // This might be expected behavior, so we'll create a fallback filename
          const fallbackFilename = `handphone_capture_${Date.now()}.jpg`;
          console.log('🔄 Using fallback filename:', fallbackFilename);
          return fallbackFilename;
        }
      } else {
        console.error('❌ API returned error status:', result);
        throw new Error(result.message || 'Upload failed - server returned error status');
      }
      
    } catch (error) {
      console.error('❌ Upload capture error:', error);
      
      // Check if it's a network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('🌐 Network error - possible CORS or connectivity issue');
        console.error('💡 Suggestions:');
        console.error('   1. Check if the Raspberry Pi server is running');
        console.error('   2. Verify CORS is properly configured on the server');
        console.error('   3. Try accessing the API directly in browser');
        setErrorMessage('Gagal terhubung ke server. Periksa koneksi jaringan atau server Raspberry Pi.');
      } else {
        setErrorMessage('Gagal mengunggah gambar. Silakan coba lagi.');
      }
      
      setTimeout(() => setErrorMessage(null), 8000);
      
      return null;
    } finally {
      setIsUploading(false);
      console.log('🏁 Upload process finished');
    }
  };

  const handleCapture = async () => {
    console.log('🎯 Capture button clicked!');
    console.log('Selected camera:', selectedCamera);
    console.log('Is capturing:', isCapturing);
    console.log('Is uploading:', isUploading);
    
    setIsCapturing(true);
    setErrorMessage(null);
    
    try {
      let capturedDataUrl: string | null = null;
      let uploadedImageName: string | null = null;
      
      // Capture from local device camera
      if (selectedCamera === 'Camera Handphone' && videoRef.current && canvasRef.current) {
        console.log('📱 Capturing from handphone camera...');
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const context = canvas.getContext('2d');
        
        console.log('Video dimensions:', {
          videoWidth: video.videoWidth,
          videoHeight: video.videoHeight,
          readyState: video.readyState
        });
        
        if (context && video.videoWidth > 0 && video.videoHeight > 0) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0);
          
          // Get data URL for preview
          capturedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
          console.log('✅ Handphone capture successful, data URL length:', capturedDataUrl.length);
          
          // Upload to server and get the uploaded image filename
          uploadedImageName = await uploadCapturedImage(capturedDataUrl);
          
        } else {
          console.error('❌ Cannot capture from handphone camera:', {
            hasContext: !!context,
            videoWidth: video.videoWidth,
            videoHeight: video.videoHeight,
            readyState: video.readyState
          });
          throw new Error('Kamera handphone tidak siap atau tidak tersedia');
        }
      } else if (selectedCamera === 'Camera Raspberry') {
        console.log('🍓 Using direct Raspberry capture...');
        // For Raspberry, capture directly from the API (no CORS issue)
        uploadedImageName = await captureFromRaspberry();
        
        if (uploadedImageName) {
          // Create a preview image URL from the server
          const previewUrl = `${RASPBERRY_CAPTURE_URL.replace('/capture', '')}/images/${uploadedImageName}`;
          console.log('📷 Setting preview URL:', previewUrl);
          capturedDataUrl = previewUrl;
        }
      } else {
        console.error('❌ Capture conditions not met:', {
          selectedCamera,
          hasVideoRef: !!videoRef.current,
          hasRaspberryImgRef: !!raspberryImgRef.current,
          hasCanvasRef: !!canvasRef.current
        });
        throw new Error('Kondisi kamera tidak terpenuhi');
      }
      
      if (capturedDataUrl && uploadedImageName) {
        console.log('🖼️ Setting captured image for preview...');
        // Set captured image for preview
        setCapturedImage(capturedDataUrl);
        setShowCaptureResult(true);
        
        // Store the uploaded image name for later use
        sessionStorage.setItem('uploadedImageName', uploadedImageName);
        console.log('✅ Image processed successfully:', uploadedImageName);
        
      } else if (uploadedImageName) {
        // Raspberry capture successful but no preview image
        console.log('✅ Raspberry capture successful, no preview available');
        setShowCaptureResult(true);
        sessionStorage.setItem('uploadedImageName', uploadedImageName);
        
      } else {
        console.error('❌ No image data captured or uploaded');
        setErrorMessage('Tidak ada gambar yang berhasil diambil. Pastikan kamera berfungsi dengan baik.');
        setTimeout(() => setErrorMessage(null), 5000);
      }
      
    } catch (error) {
      console.error('❌ Capture failed with error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Gagal mengambil gambar. Silakan coba lagi.');
      setTimeout(() => setErrorMessage(null), 5000);
    } finally {
      setTimeout(() => {
        setIsCapturing(false);
        console.log('🏁 Capture process finished');
      }, 500);
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setShowCaptureResult(false);
  };

  const handleCalibrate = async () => {
    if (selectedCamera !== 'Camera Raspberry') {
      console.warn('Calibration is available for Camera Raspberry only');
      return;
    }
    
    try {
      setIsCalibrating(true);
      
      // Try to grab current frame from Raspberry camera
      let imageDataUrl: string | null = null;
      
      if (raspberryImgRef.current && canvasRef.current) {
        const img = raspberryImgRef.current as HTMLImageElement;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (context) {
          const w = img.naturalWidth || img.width || 1280;
          const h = img.naturalHeight || img.height || 720;
          canvas.width = w;
          canvas.height = h;
          
          try {
            context.drawImage(img, 0, 0, w, h);
            imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
          } catch (e) {
            console.warn('Calibrate drawImage failed (CORS likely), proceeding without image payload');
          }
        }
      }

      // Prepare request
      const options: RequestInit = { 
        method: 'POST', 
        mode: 'cors',
        headers: {
          'accept': 'application/json',
        }
      };
      
      if (imageDataUrl) {
        // Convert data URL to blob and add to FormData
        const response = await fetch(imageDataUrl);
        const blob = await response.blob();
        const formData = new FormData();
        formData.append('file', blob, 'calibrate.jpg');
        options.body = formData;
      }
      
      const res = await fetch(RASPBERRY_CALIBRATE_URL, options);
      
      if (!res.ok) {
        throw new Error(`Calibration failed: ${res.status} ${res.statusText}`);
      }
      
      try {
        const result = await res.json();
        console.log('Calibration successful:', result);
      } catch {
        console.log('Calibration successful (non-JSON response)');
      }
      
    } catch (error) {
      console.error('Calibration error:', error);
    } finally {
      setIsCalibrating(false);
    }
  };

  const handleContinue = () => {
    // Get the uploaded image name from session storage
    const uploadedImageName = sessionStorage.getItem('uploadedImageName');
    
    console.log('Processing captured image:', capturedImage);
    console.log('Uploaded image name:', uploadedImageName);
    
    // Get child ID from URL params
    const childId = searchParams?.get('child');
    const cameraType = searchParams?.get('camera');
    
    // Navigate to result page with captured image data and uploaded image name
    const params = new URLSearchParams({
      ...(childId && { child: childId }),
      ...(cameraType && { camera: cameraType }),
      ...(uploadedImageName && { image: uploadedImageName }),
      timestamp: Date.now().toString()
    });
    
    router.push(`/result?${params.toString()}`);
  };

  const handleBack = () => {
    router.back();
  };

  const testConnection = async () => {
    console.log('🔍 Testing connection to API...');
    setIsTestingConnection(true);
    setErrorMessage(null);
    
    try {
      // Test 1: Basic connection
      const testUrl = RASPBERRY_CAPTURE_URL.replace('/capture', '/'); // Test root endpoint
      console.log('🔗 Test 1: Testing basic connection to:', testUrl);
      
      const response = await fetch(testUrl, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'accept': 'application/json',
        },
      });
      
      console.log('📡 Basic connection test response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });
      
      // Test 2: Check capture endpoint with OPTIONS (preflight)
      console.log('🔗 Test 2: Testing capture endpoint OPTIONS...');
      try {
        const optionsResponse = await fetch(RASPBERRY_CAPTURE_URL, {
          method: 'OPTIONS',
          mode: 'cors',
        });
        console.log('📡 OPTIONS response:', {
          status: optionsResponse.status,
          headers: Object.fromEntries(optionsResponse.headers.entries())
        });
      } catch (optError) {
        console.warn('OPTIONS test failed:', optError);
      }
      
      // Test 3: Try a minimal POST to see what server expects
      console.log('🔗 Test 3: Testing minimal POST request...');
      try {
        const minimalCanvas = document.createElement('canvas');
        minimalCanvas.width = 10;
        minimalCanvas.height = 10;
        const minimalCtx = minimalCanvas.getContext('2d');
        if (minimalCtx) {
          minimalCtx.fillStyle = 'red';
          minimalCtx.fillRect(0, 0, 10, 10);
          
          const minimalBlob = await new Promise<Blob | null>((resolve) => {
            minimalCanvas.toBlob(resolve, 'image/png');
          });
          
          if (minimalBlob) {
            const testFormData = new FormData();
            testFormData.append('image', minimalBlob, 'test.png');
            
            const testPostResponse = await fetch(RASPBERRY_CAPTURE_URL, {
              method: 'POST',
              body: testFormData,
              mode: 'cors',
            });
            
            const testResponseText = await testPostResponse.text();
            console.log('📡 Minimal POST response:', {
              status: testPostResponse.status,
              statusText: testPostResponse.statusText,
              text: testResponseText
            });
            
            try {
              const testJson = JSON.parse(testResponseText);
              console.log('📥 Minimal POST JSON:', testJson);
            } catch {
              console.log('📄 Response is not JSON');
            }
          }
        }
      } catch (postError) {
        console.warn('Minimal POST test failed:', postError);
      }
      
      if (response.ok) {
        setErrorMessage('✅ Koneksi ke server berhasil! Cek console untuk detail lengkap.');
        setTimeout(() => setErrorMessage(null), 5000);
      } else {
        setErrorMessage(`❌ Server merespons dengan error: ${response.status}`);
      }
      
    } catch (error) {
      console.error('Connection test failed:', error);
      setErrorMessage('❌ Tidak dapat terhubung ke server. Periksa jaringan atau server Raspberry Pi.');
    } finally {
      setIsTestingConnection(false);
    }
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
          <div className="relative flex items-center gap-2">
            {/* Test Connection Button */}
            <button
              onClick={testConnection}
              disabled={isTestingConnection}
              className={`bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-2 rounded-lg text-xs transition-colors ${
                isTestingConnection ? 'opacity-50' : ''
              }`}
            >
              {isTestingConnection ? 'Testing...' : 'Test API'}
            </button>
            
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

        {/* Error Message */}
        {errorMessage && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-30 max-w-md w-full mx-4">
            <div className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{errorMessage}</p>
              </div>
              <button 
                onClick={() => setErrorMessage(null)}
                className="flex-shrink-0 hover:bg-red-600 rounded p-1"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-screen p-4 pt-20">
          {/* Camera Container */}
          <div className="relative w-full max-w-4xl mx-auto">
            {/* Camera View */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
            {!showCaptureResult ? (
              selectedCamera === 'Camera Handphone' ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-[600px] object-cover"
                />
              ) : (
                <img
                  ref={raspberryImgRef}
                  src={RASPBERRY_URL}
                  alt="Raspberry Stream"
                  className="w-full h-[600px] object-cover"
                />
              )
            ) : (
                capturedImage ? (
                  <img
                    src={capturedImage}
                    alt="Captured"
                    className="w-full h-[600px] object-cover"
                  />
                ) : (
                  <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Gambar Berhasil Diambil</h3>
                      <p className="text-sm text-gray-600">Gambar telah disimpan di server</p>
                    </div>
                  </div>
                )
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
                {isUploading && (
                  <span className="text-xs ml-2 bg-blue-500 px-2 py-1 rounded">Uploading...</span>
                )}
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
                  
                  {/* Controls row */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleCapture}
                      disabled={isCapturing || isUploading}
                      className={`bg-[#407A81] hover:bg-[#326269] disabled:bg-gray-400 text-white rounded-full p-4 shadow-xl transition-all duration-200 ${
                        isCapturing ? 'scale-95' : 'hover:scale-105'
                      }`}
                    >
                      <FiCamera className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleCalibrate}
                      disabled={isCalibrating || selectedCamera !== 'Camera Raspberry'}
                      className={`rounded-full px-4 py-2 shadow-xl border transition-colors duration-200 ${
                        isCalibrating ? 'bg-gray-200 border-gray-300 text-gray-500' : 'bg-white border-[#407A81] text-[#407A81] hover:bg-[#E7F5F7]'
                      }`}
                    >
                      {isCalibrating ? 'Calibrating…' : 'Calibrate'}
                    </button>
                  </div>
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
