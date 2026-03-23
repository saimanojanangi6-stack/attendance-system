import { Settings as SettingsIcon, ShieldCheck, Clock, Camera } from "lucide-react";

export default function SystemSettings() {
  return (
    <div className="relative min-h-[calc(100vh-73px)] w-full overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/40 p-6 md:p-8">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-50 pointer-events-none"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/80 shadow-sm">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">System Settings</h1>
            <p className="text-gray-500 mt-1 font-medium">Configure global rules, facial recognition parameters, and timeframes.</p>
          </div>
        </div>

        {/* Settings Configurations */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm overflow-hidden divide-y divide-gray-100">
          
          {/* Biometrics Settings */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Camera size={20} /></div>
              <h3 className="text-xl font-bold text-gray-900">Biometric & Face Recognition</h3>
            </div>
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="font-bold text-gray-800">Strict Face Matching</p>
                <p className="text-sm text-gray-500">Require high-confidence matches (reduces false positives).</p>
              </div>
              {/* Toggle Switch UI */}
              <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between py-4 border-t border-gray-50">
              <div>
                <p className="font-bold text-gray-800">Allow Camera Uploads</p>
                <p className="text-sm text-gray-500">Let users upload photos instead of live capture (Not Recommended).</p>
              </div>
              <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer shadow-inner">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5 shadow-sm border border-gray-200"></div>
              </div>
            </div>
          </div>

          {/* Time & Attendance Settings */}
          <div className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-green-50 text-green-600 rounded-xl"><Clock size={20} /></div>
              <h3 className="text-xl font-bold text-gray-900">Global Attendance Timeframes</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Standard Check-in Time</label>
                <input type="time" defaultValue="09:00" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Late Mark After</label>
                <input type="time" defaultValue="09:15" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
              </div>
            </div>
          </div>

          {/* Save Action */}
          <div className="p-8 bg-gray-50/50 flex justify-end">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg transition-all shadow-md">
              Save Configuration
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}