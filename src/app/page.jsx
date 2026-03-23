"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, UserPlus, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Function to simulate login based on role
  const handleLogin = (role) => {
    setIsLoading(true);
    setTimeout(() => {
      router.push(`/${role}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white font-sans">
      
      {/* --- LEFT SIDE: Visual Brand Section --- */}
      <div className="hidden md:flex md:w-1/2 bg-[#0f172a] relative overflow-hidden items-center justify-center p-12">
        {/* Animated Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
        
        <div className="relative z-10 max-w-lg text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-3xl mb-8 shadow-2xl shadow-blue-500/20">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-black text-white mb-6 tracking-tight">
            Smart Attendance Management
          </h1>
          <p className="text-slate-400 text-lg font-medium leading-relaxed">
            Secure, biometric-driven attendance tracking for modern organizations. 
            Experience seamless role-based access control.
          </p>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-slate-500">
             <div className="flex flex-col items-center">
                <span className="text-white font-bold text-2xl">100%</span>
                <span className="text-xs uppercase tracking-widest font-bold">Secure</span>
             </div>
             <div className="h-8 w-px bg-slate-800"></div>
             <div className="flex flex-col items-center">
                <span className="text-white font-bold text-2xl">Real-time</span>
                <span className="text-xs uppercase tracking-widest font-bold">Tracking</span>
             </div>
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: Login Form Section --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-20 bg-gray-50 md:bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Logo / Title for Mobile */}
          <div className="text-center md:text-left">
            <div className="md:hidden inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-4 text-white">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome Back</h2>
            <p className="text-slate-500 mt-2 font-medium">Please enter your details to sign in.</p>
          </div>

          {/* Form Fields [cite: 107, 108, 109] */}
          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 md:bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <button className="text-xs font-bold text-blue-600 hover:text-blue-700">Forgot Password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 md:bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all text-slate-900 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons [cite: 110, 111, 112] */}
          <div className="space-y-4 pt-2">
            <button 
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-[0.98] disabled:bg-slate-400"
            >
              {isLoading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <><LogIn size={20} /> Sign In</>}
            </button>
            
            <button 
              onClick={() => router.push('/register-face')}
              className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              <UserPlus size={20} /> Register Face Data
            </button>
          </div>

          {/* --- DEMO ROLE SELECTOR (For Project Navigation) --- [cite: 6, 128] */}
          <div className="mt-10 p-6 bg-blue-50/50 rounded-[2rem] border border-blue-100/50">
            <p className="text-center text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-4">
              Developer Quick Access
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => handleLogin('super-admin')}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="p-2 bg-white rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-[10px] font-bold text-blue-800">S. Admin</span>
              </button>

              <button 
                onClick={() => handleLogin('admin')}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="p-2 bg-white rounded-lg text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors shadow-sm">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-[10px] font-bold text-green-800">Admin</span>
              </button>

              <button 
                onClick={() => handleLogin('user')}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all group"
              >
                <div className="p-2 bg-white rounded-lg text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors shadow-sm">
                  <CheckCircle2 size={18} />
                </div>
                <span className="text-[10px] font-bold text-indigo-800">User</span>
              </button>
            </div>
          </div>

          <p className="text-center text-slate-400 text-sm font-medium pt-4">
            Don't have an account? <span className="text-blue-600 font-bold cursor-pointer">Contact System Admin</span>
          </p>
        </div>
      </div>
    </div>
  );
}