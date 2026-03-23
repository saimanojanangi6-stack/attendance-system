"use client";
import { useState, useRef, useEffect } from "react";
import { Camera, CheckCircle2, Clock, Filter, X, ScanFace } from "lucide-react";

export default function AdminAttendance() {
  const [cameraState, setCameraState] = useState("IDLE"); // IDLE, STARTING, SCANNING, SUCCESS
  const [toast, setToast] = useState(null);
  
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);

  const [logs, setLogs] = useState([
    { id: 101, name: "Alice Johnson", location: "Main Entrance Kiosk", time: "08:55 AM", status: "PRESENT" },
    { id: 102, name: "Bob Smith", location: "Main Entrance Kiosk", time: "08:58 AM", status: "PRESENT" },
    { id: 104, name: "Diana Prince", location: "Backdoor Biometric", time: "09:02 AM", status: "PRESENT" },
  ]);

  // --- THE FIX: React automatically connects the video stream AS SOON as the <video> tag is ready ---
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
      setStream(mediaStream); // The useEffect above will catch this and bind it to the video tag
      
      // Automatically transition to scanning mode
      setTimeout(() => setCameraState("SCANNING"), 800);

      // Simulate the AI processing time (3 seconds), then auto-verify
      setTimeout(() => {
        handleSuccess();
      }, 3800);

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
    
    const newLog = {
      id: Date.now(),
      name: "Verified Admin", 
      location: "Web Dashboard Capture",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "PRESENT"
    };

    setTimeout(() => {
      stopCamera();
      setLogs([newLog, ...logs]); 
      showToast("Face matched! Attendance recorded.");
    }, 1500);
  };

  useEffect(() => {
    return () => stopCamera();
  }, [stream]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="relative min-h-full w-full bg-gray-50 p-4 sm:p-6 md:p-8">
      
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-5">
          <CheckCircle2 size={20} />
          <span className="font-bold">{toast}</span>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Attendance Management</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* ========================================= */}
          {/* LIVE CAMERA CAPTURE MODULE                */}
          {/* ========================================= */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm flex flex-col items-center border border-gray-100">
            
            <div className="w-full flex justify-between items-center mb-6">
              <h3 className="font-bold text-2xl text-[#1e293b]">Live Capture</h3>
              {cameraState !== "IDLE" && (
                <button onClick={stopCamera} className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors" title="Close Camera">
                  <X size={24} />
                </button>
              )}
            </div>
            
            <div className="relative w-full sm:max-w-sm aspect-[3/4] bg-[#111827] rounded-[2rem] overflow-hidden flex flex-col items-center justify-center mb-6">
              
              {cameraState === "IDLE" && (
                <div className="flex flex-col items-center text-gray-500 animate-in fade-in z-20">
                  <Camera size={56} className="mb-3 opacity-40" strokeWidth={1.5} />
                  <p className="text-lg font-medium opacity-60">Camera Offline</p>
                </div>
              )}

              {cameraState === "STARTING" && (
                <div className="flex flex-col items-center text-white animate-pulse z-20">
                  <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mb-3"></div>
                  <p className="text-base font-bold">Accessing Camera...</p>
                </div>
              )}

              {(cameraState === "SCANNING" || cameraState === "SUCCESS" || cameraState === "STARTING") && (
                <>
                  {/* THE VIDEO ELEMENT: Explicitly set to z-0 so it stays behind the cutout */}
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
                      {/* THE FIX: Using inline style for box-shadow guarantees it works over the video feed */}
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
                      <span className={`px-5 py-2.5 rounded-full text-sm font-bold shadow-lg backdrop-blur-md transition-colors ${
                        cameraState === "SUCCESS" ? "bg-green-500 text-white" : "bg-gray-900/90 text-white"
                      }`}>
                        {cameraState === "SUCCESS" ? "Verification Successful!" : "Analyzing Face Shape..."}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            <button 
              onClick={startCameraAndScan} 
              disabled={cameraState !== "IDLE"}
              className={`w-full sm:max-w-sm flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all shadow-md ${
                cameraState === "IDLE" 
                  ? "bg-[#0fa958] text-white hover:bg-[#0d944c] hover:shadow-lg" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {cameraState === "IDLE" && <ScanFace size={24} />}
              {cameraState === "STARTING" ? "Opening Camera..." : cameraState === "SUCCESS" ? "Match Found" : cameraState === "SCANNING" ? "Scanning..." : "Tap to Capture & Scan"}
            </button>
          </div>

          {/* ========================================= */}
          {/* INTERACTIVE LOGS TABLE                    */}
          {/* ========================================= */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] shadow-sm overflow-hidden border border-gray-100 flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
               <h3 className="font-bold text-xl text-gray-900">Today's Live Logs</h3>
               <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-200 font-bold text-sm hover:bg-gray-50 transition-colors">
                 <Filter size={16}/> Filter
               </button>
            </div>
            
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-gray-50/30">
               <div className="space-y-3 sm:space-y-4">
                  {logs.map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow animate-in slide-in-from-left-4 duration-300">
                       <div className="flex items-center gap-4">
                         <div className={`p-3 rounded-xl shrink-0 ${log.status === 'LATE' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'}`}>
                           <CheckCircle2 size={20}/>
                         </div>
                         <div className="min-w-0">
                           <p className="font-bold text-gray-900 text-sm sm:text-base truncate">{log.name}</p>
                           <p className="text-xs sm:text-sm text-gray-500 font-medium truncate">{log.location}</p>
                         </div>
                       </div>
                       <div className="text-right shrink-0 pl-2">
                         <p className="font-bold text-gray-900 flex items-center justify-end gap-1 text-sm sm:text-base">
                           <Clock size={14} className="text-gray-400"/> {log.time}
                         </p>
                         <span className={`text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full mt-1 inline-block ${
                           log.status === 'LATE' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                         }`}>
                           {log.status}
                         </span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}