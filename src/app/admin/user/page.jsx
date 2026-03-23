import { CalendarDays, Clock, CheckCircle2, Camera, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function UserDashboard() {
  return (
    <div className="relative min-h-full w-full bg-gradient-to-br from-slate-50 via-gray-50 to-indigo-50/40 p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
        
        {/* Hero Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-800 text-white p-6 sm:p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-indigo-600/20 border border-white/20">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl hidden sm:block"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 text-center md:text-left">
            <div>
              <p className="text-indigo-200 font-bold mb-2 tracking-widest uppercase text-xs">Dashboard Overview</p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-white tracking-tight">Welcome back, John! 👋</h1>
              <p className="text-indigo-100 max-w-lg text-sm sm:text-base md:text-lg font-medium">Here is your attendance summary for the current month. Keep up the great work!</p>
            </div>
            {/* WIRED BUTTON */}
            <Link href="/user/mark-attendance" className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-indigo-700 px-6 sm:px-8 py-4 rounded-xl sm:rounded-2xl font-bold hover:bg-indigo-50 hover:scale-[1.02] transition-all shadow-xl whitespace-nowrap group">
              <Camera size={22} className="group-hover:rotate-12 transition-transform" /> Mark Attendance Now
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          {/* Summary Card */}
          <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm lg:col-span-2">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="p-2 sm:p-3 bg-indigo-50 text-indigo-600 rounded-xl shadow-inner"><CalendarDays size={24} /></div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Monthly Summary</h3>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-50">
              <div className="text-center border-r border-gray-100"><p className="text-xs sm:text-sm text-gray-500 font-bold uppercase mb-2">Working</p><p className="text-2xl sm:text-4xl font-black text-gray-800">22</p></div>
              <div className="text-center border-r border-gray-100"><p className="text-xs sm:text-sm text-green-600 font-bold uppercase mb-2">Present</p><p className="text-2xl sm:text-4xl font-black text-green-500">20</p></div>
              <div className="text-center"><p className="text-xs sm:text-sm text-red-600 font-bold uppercase mb-2">Absent</p><p className="text-2xl sm:text-4xl font-black text-red-500">2</p></div>
            </div>
            <div className="mt-6 md:mt-8 px-2">
              <div className="flex justify-between items-center text-sm mb-3 font-bold"><span className="text-gray-600">Attendance Rate</span><span className="text-green-600 bg-green-50 px-3 py-1 rounded-full">90.9%</span></div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
                <div className="bg-gradient-to-r from-green-400 to-green-500 h-full rounded-full relative" style={{ width: '91%' }}><div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div></div>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm relative overflow-hidden flex flex-col justify-center items-center text-center group">
            <div className="absolute top-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-600"></div>
            <div className="w-20 h-20 md:w-24 md:h-24 bg-green-50 rounded-full flex items-center justify-center mb-4 md:mb-6 text-green-600 shadow-inner group-hover:scale-110 transition-transform"><CheckCircle2 size={40} /></div>
            <h3 className="text-xs md:text-sm font-bold text-green-800 tracking-widest uppercase mb-2">Current Status</h3>
            <p className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-400 mb-4">PRESENT</p>
            <div className="inline-flex items-center gap-2 px-4 md:px-5 py-2.5 bg-white rounded-full border border-green-100 shadow-sm text-xs md:text-sm font-bold text-gray-700 w-full justify-center sm:w-auto"><Clock size={16} className="text-green-500 shrink-0" /> Today at 09:05 AM</div>
          </div>
        </div>
        
        {/* Recent Logs Wired to My Attendance */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100/50 bg-white/50 flex justify-between items-center">
            <h3 className="text-base md:text-lg font-bold text-gray-900">Recent Logs</h3>
            <Link href="/user/my-attendance" className="text-xs md:text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-4 py-1.5 rounded-full flex items-center gap-1">View All <ArrowRight size={14}/></Link>
          </div>
          <div className="divide-y divide-gray-50/50">
             {[1, 2].map((item) => (
               <div key={item} className="p-4 md:p-5 px-4 md:px-6 flex items-center justify-between hover:bg-white transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl shadow-sm border border-green-100 shrink-0"><CheckCircle2 size={20} /></div>
                    <div><p className="font-bold text-gray-900 text-sm md:text-lg">Checked In</p><p className="text-xs md:text-sm text-gray-500 font-medium">Biometric Capture</p></div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-gray-900 text-sm md:text-lg">09:05 AM</p><p className="text-xs md:text-sm text-gray-500 font-medium">Oct 24</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

      </div>
    </div>
  );
}