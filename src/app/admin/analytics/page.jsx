import { FileBarChart, Users, Clock, TrendingUp } from "lucide-react";

export default function AdminAnalytics() {
  return (
    <div className="relative min-h-full w-full bg-gradient-to-br from-slate-50 via-gray-50 to-green-50/40 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="flex justify-between items-center bg-white/60 p-6 rounded-[2rem] shadow-sm">
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Attendance Analytics</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Daily Analysis  */}
          <div className="bg-white/80 p-6 rounded-[2rem] shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-4 border-b pb-2">1. Daily Analysis</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><span className="text-gray-500 font-medium">Present Count</span><span className="font-black text-green-600 text-xl">142</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 font-medium">Absent Count</span><span className="font-black text-red-600 text-xl">8</span></div>
              <div className="pt-4 border-t"><p className="text-sm text-gray-500 font-bold mb-1">Attendance %</p><p className="text-3xl font-black text-gray-900">94.6%</p></div>
            </div>
          </div>

          {/* User Activity  */}
          <div className="bg-white/80 p-6 rounded-[2rem] shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-4 border-b pb-2">3. User Activity</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center"><span className="text-gray-500 font-medium">Active Users</span><span className="font-black text-gray-900 text-xl">148</span></div>
              <div className="flex justify-between items-center"><span className="text-gray-500 font-medium">Inactive Users</span><span className="font-black text-gray-900 text-xl">2</span></div>
              <div className="pt-4 border-t"><p className="text-sm text-gray-500 font-bold mb-1">Peak Login Time</p><p className="text-xl font-black text-gray-900 flex items-center gap-2"><Clock size={18}/> 08:45 AM</p></div>
            </div>
          </div>

          {/* Monthly Analysis Chart  */}
          <div className="md:col-span-3 bg-white/80 p-8 rounded-[2rem] shadow-sm">
            <h3 className="font-bold text-lg text-gray-900 mb-6 flex items-center gap-2"><TrendingUp/> 2. Monthly Analysis</h3>
            <div className="w-full h-48 flex items-end justify-between gap-2 border-b border-gray-200 pb-2">
               {[65, 70, 80, 85, 90, 88, 92, 95, 94, 98, 96, 99].map((h, i) => (
                 <div key={i} className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-md relative group" style={{height: `${h}%`}}>
                   <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100">{h}%</span>
                 </div>
               ))}
            </div>
            <p className="mt-4 font-bold text-gray-600 text-center">Average Monthly Attendance: <span className="text-green-600">88.5%</span></p>
          </div>
        </div>

      </div>
    </div>
  );
}