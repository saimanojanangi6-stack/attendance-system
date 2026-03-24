"use client";
import { useState } from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  Calendar, 
  Camera, 
  Shield, 
  Key,
  Edit3,
  CheckCircle2
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSave = () => {
    setIsEditing(false);
    setToast("Profile updated successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="relative min-h-full w-full overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/40 p-4 sm:p-6 md:p-8">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-5">
          <CheckCircle2 size={20} /> <span className="font-bold">{toast}</span>
        </div>
      )}

      {/* Decorative Background Blurs */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 pointer-events-none hidden md:block"></div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-5 md:p-6 rounded-[2rem] border border-white/80 shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">My Profile</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">Manage your personal information and security settings.</p>
          </div>
          
          <div className="flex items-center gap-3">
            {isEditing ? (
              <button onClick={handleSave} className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition-all font-bold shadow-sm shadow-indigo-600/20 text-sm">
                <CheckCircle2 size={18} /> Save Changes
              </button>
            ) : (
              <button onClick={() => setIsEditing(true)} className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold shadow-sm text-sm">
                <Edit3 size={18} /> Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Left Column: Profile Card */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm flex flex-col items-center text-center relative overflow-hidden">
              {/* Cover Banner */}
              <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              
              {/* Avatar */}
              <div className="relative mt-12 mb-4 group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center overflow-hidden relative z-10">
                  <span className="text-5xl font-black text-indigo-600">J</span>
                </div>
                <button className="absolute bottom-0 right-0 z-20 bg-indigo-600 text-white p-2.5 rounded-full shadow-lg hover:bg-indigo-700 transition-transform hover:scale-110">
                  <Camera size={18} />
                </button>
              </div>

              <h2 className="text-2xl font-extrabold text-gray-900">John Doe</h2>
              <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider mb-4">Senior Developer</p>
              
              <div className="w-full flex justify-center gap-2 mb-6">
                <span className="bg-green-50 text-green-600 border border-green-100 px-3 py-1 rounded-full text-xs font-bold">Active</span>
                <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-xs font-bold">Engineering</span>
              </div>

              <div className="w-full border-t border-gray-100 pt-6 space-y-4 text-left">
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <Briefcase size={18} className="text-gray-400" />
                  <span>Emp ID: <span className="font-bold text-gray-900">ATT-2048</span></span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                  <Calendar size={18} className="text-gray-400" />
                  <span>Joined: <span className="font-bold text-gray-900">Jan 15, 2022</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Information Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Personal Information */}
            <div className="bg-white/70 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <User size={20} className="text-indigo-600" /> Personal Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">First Name</label>
                  <input 
                    type="text" 
                    defaultValue="John" 
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all disabled:opacity-70 disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Last Name</label>
                  <input 
                    type="text" 
                    defaultValue="Doe" 
                    disabled={!isEditing}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all disabled:opacity-70 disabled:bg-gray-100"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="email" 
                      defaultValue="john.doe@company.com" 
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all disabled:opacity-70 disabled:bg-gray-100"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="tel" 
                      defaultValue="+1 (555) 123-4567" 
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all disabled:opacity-70 disabled:bg-gray-100"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Address</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-4 text-gray-400" />
                    <textarea 
                      rows="2"
                      defaultValue="123 Tech Boulevard, Innovation District, CA 94025" 
                      disabled={!isEditing}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all disabled:opacity-70 disabled:bg-gray-100 resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Security Section */}
            <div className="bg-white/70 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Shield size={20} className="text-indigo-600" /> Security
              </h3>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 border border-gray-100 bg-gray-50/50 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0">
                    <Key size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Password</h4>
                    <p className="text-sm text-gray-500 font-medium">Last changed 3 months ago</p>
                  </div>
                </div>
                <button className="w-full sm:w-auto px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-colors shadow-sm text-sm">
                  Change Password
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}