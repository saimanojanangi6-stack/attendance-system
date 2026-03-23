"use client";
import { useState, useRef, useEffect } from "react";
import { Camera, CheckCircle2, ScanFace, X, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function MarkAttendance() {
  // --- States ---
  const [cameraState, setCameraState] = useState("IDLE"); // IDLE, STARTING, SCANNING, SUCCESS
  const [toast, setToast] = useState(null);
  
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  // --- THE FIX: Bind video stream as soon as it's ready ---
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, cameraState]);

  // --- Camera Functions ---
  const startCameraAndScan = async () => {
    setCameraState("STARTING");
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      
      // Automatically transition to scanning mode
      setTimeout(() => setCameraState("SCANNING"), 800);

      // Simulate the AI processing time (3.5 seconds), then auto-verify
      setTimeout(() => {
        handleSuccess();
      }, 3500);

    } catch (err) {
      console.error("Error accessing camera:", err);
      showToast("Camera access denied. Please allow camera permissions in your browser.");
      setCameraState("IDLE");
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCameraState("IDLE");
  };

  const handleSuccess = () => {
    setCameraState("SUCCESS");

    // Wait 2 seconds on the success screen, then close camera
    setTimeout(() => {
      stopCamera();
      showToast("Attendance successfully recorded for today!");
    }, 2000);
  };

  // Clean up camera on unmount
  useEffect(() => {
    return () => stopCamera();
  }, [stream]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="relative min-h-full w-full bg-gradient-to-br from-slate-50 via-gray-50 to-indigo-50/40 p-4 sm:p-6 md:p-8 flex flex-col items-center justify-center">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-5">
          <CheckCircle2 size={24} />
          <div>
            <p className="font-bold text-lg">Success!</p>
            <p className="text-sm text-green-100">{toast}</p>
          </div>
        </div>
      )}

      {/* Main Kiosk Card */}
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex flex-col items-center animate-in zoom-in-95 duration-500 relative overflow-hidden">
        
        {/* Header */}
        <div className="w-full flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-black text-[#1e293b] tracking-tight">Live Capture</h1>
            <p className="text-gray-500 font-medium text-sm mt-1">Please align your face within the frame.</p>
          </div>
          {cameraState !== "IDLE" && (
            <button onClick={stopCamera} className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors" title="Close Camera">
              <X size={24} />
            </button>
          )}
        </div>

        {/* ========================================= */}
        {/* THE CAMERA BOX (Matches Screenshot Exactly) */}
        {/* ========================================= */}
        <div className="relative w-full aspect-[3/4] bg-[#111827] rounded-[2.5rem] overflow-hidden flex flex-col items-center justify-center mb-8 shadow-inner">
          
          {/* IDLE STATE (Offline UI) */}
          {cameraState === "IDLE" && (
            <div className="flex flex-col items-center text-gray-500 animate-in fade-in z-20">
              <Camera size={64} className="mb-4 opacity-40" strokeWidth={1.5} />
              <p className="text-lg font-medium opacity-60">Camera Offline</p>
            </div>
          )}

          {/* STARTING STATE */}
          {cameraState === "STARTING" && (
            <div className="flex flex-col items-center text-white animate-pulse z-20">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-lg font-bold">Accessing Camera...</p>
            </div>
          )}

          {/* LIVE CAMERA & SCANNING OVERLAY */}
          {(cameraState === "SCANNING" || cameraState === "SUCCESS" || cameraState === "STARTING") && (
            <>
              {/* The Live Video Feed */}
              <video 
                ref={videoRef} 
                autoPlay 
                playsInline 
                muted 
                className={`absolute inset-0 w-full h-full object-cover scale-x-[-1] transition-opacity duration-500 z-0 ${cameraState === "STARTING" ? "opacity-0" : "opacity-100"}`} 
              />
              
              {/* PERFECT FACE CUTOUT OVERLAY */}
              {(cameraState === "SCANNING" || cameraState === "SUCCESS") && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                  {/* Dark overlay around the oval using box-shadow */}
                  <div 
                    className={`relative w-[65%] h-[60%] sm:w-56 sm:h-72 rounded-[50%] transition-colors duration-500 border-4 ${
                      cameraState === "SUCCESS" ? "border-green-500" : "border-white/80 border-dashed"
                    } overflow-hidden`}
                    style={{ boxShadow: '0 0 0 9999px rgba(17,24,39,0.85)' }}
                  >
                    
                    {/* Scanning Laser Animation */}
                    {cameraState === "SCANNING" && (
                      <div className="absolute left-0 w-full h-1 bg-green-400 shadow-[0_0_20px_#4ade80] animate-[bounce_2s_infinite_ease-in-out]"></div>
                    )}
                    
                    {/* Success Checkmark */}
                    {cameraState === "SUCCESS" && (
                      <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center rounded-[50%] animate-in fade-in zoom-in">
                        <CheckCircle2 size={80} className="text-green-400 bg-white rounded-full shadow-lg" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Status Banner */}
              {(cameraState === "SCANNING" || cameraState === "SUCCESS") && (
                <div className="absolute bottom-6 left-0 w-full text-center z-20">
                  <span className={`px-6 py-2.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-md transition-colors ${
                    cameraState === "SUCCESS" ? "bg-green-500 text-white" : "bg-gray-900/90 text-white"
                  }`}>
                    {cameraState === "SUCCESS" ? "Verification Successful!" : "Analyzing Face Shape..."}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* ========================================= */}
        {/* SMART ACTION BUTTON                         */}
        {/* ========================================= */}
        {cameraState === "IDLE" ? (
          <button 
            onClick={startCameraAndScan} 
            className="w-full flex items-center justify-center gap-2 py-4 sm:py-5 bg-[#0fa958] text-white rounded-2xl font-bold text-lg hover:bg-[#0d944c] hover:shadow-xl hover:-translate-y-1 transition-all shadow-md"
          >
            <ScanFace size={24} /> Tap to Capture & Scan
          </button>
        ) : (
          <button 
            disabled 
            className="w-full py-4 sm:py-5 bg-gray-100 text-gray-400 rounded-2xl font-bold text-lg cursor-not-allowed transition-all"
          >
            {cameraState === "STARTING" ? "Opening Camera..." : cameraState === "SUCCESS" ? "Attendance Logged!" : "Scanning Biometrics..."}
          </button>
        )}

      </div>
      
      {/* Return to Dashboard Link */}
      <Link href="/user" className="mt-8 flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-colors">
        <ArrowLeft size={18} /> Return to Dashboard
      </Link>

    </div>
  );
}