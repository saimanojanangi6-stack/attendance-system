"use client";
import { useState } from "react";
import { 
  CalendarDays, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
  Download,
  Calendar
} from "lucide-react";

// Mock data for attendance records
const attendanceLogs = [
  { id: 1, date: "Oct 24, 2023", day: "Tuesday", checkIn: "09:05 AM", checkOut: "06:10 PM", hours: "9h 5m", status: "Present" },
  { id: 2, date: "Oct 23, 2023", day: "Monday", checkIn: "08:55 AM", checkOut: "05:00 PM", hours: "8h 5m", status: "Present" },
  { id: 3, date: "Oct 20, 2023", day: "Friday", checkIn: "09:45 AM", checkOut: "06:30 PM", hours: "8h 45m", status: "Late" },
  { id: 4, date: "Oct 19, 2023", day: "Thursday", checkIn: "--", checkOut: "--", hours: "0h", status: "Absent" },
  { id: 5, date: "Oct 18, 2023", day: "Wednesday", checkIn: "09:00 AM", checkOut: "01:00 PM", hours: "4h 0m", status: "Half Day" },
  { id: 6, date: "Oct 17, 2023", day: "Tuesday", checkIn: "08:50 AM", checkOut: "05:15 PM", hours: "8h 25m", status: "Present" },
];

export default function MyAttendancePage() {
  const [currentMonth, setCurrentMonth] = useState("October 2023");

  // Helper function to render the correct badge style based on status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Present":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200">
            <CheckCircle2 size={14} /> Present
          </span>
        );
      case "Absent":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
            <XCircle size={14} /> Absent
          </span>
        );
      case "Late":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle size={14} /> Late
          </span>
        );
      case "Half Day":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <Clock size={14} /> Half Day
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-full w-full overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/40 p-4 sm:p-6 md:p-8">
      
      {/* Decorative Background Blurs */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse pointer-events-none hidden md:block"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-5 md:p-6 rounded-[2rem] border border-white/80 shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">My Attendance</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">View your daily logs and monthly summaries.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold shadow-sm text-sm">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Month Selector & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
          
          {/* Month Navigator */}
          <div className="bg-indigo-600 text-white p-6 rounded-[2rem] shadow-lg shadow-indigo-600/20 flex flex-col justify-center items-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
            <p className="text-indigo-200 font-bold mb-3 tracking-widest uppercase text-xs">Current Period</p>
            <div className="flex items-center justify-between w-full mb-2">
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronLeft size={24} /></button>
              <h2 className="text-xl md:text-2xl font-black">{currentMonth}</h2>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><ChevronRight size={24} /></button>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 bg-indigo-700/50 px-4 py-2 rounded-full text-sm font-medium">
              <Calendar size={16} /> 22 Working Days
            </div>
          </div>

          {/* Stat Cards */}
          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle2 size={18} /></div>
              <p className="text-sm text-gray-500 font-bold uppercase">Present</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-black text-gray-900">20</h3>
              <span className="text-sm font-bold text-gray-400">days</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600"><AlertCircle size={18} /></div>
              <p className="text-sm text-gray-500 font-bold uppercase">Late / Half Day</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-black text-gray-900">2</h3>
              <span className="text-sm font-bold text-gray-400">days</span>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-xl p-6 rounded-[2rem] border border-white shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600"><XCircle size={18} /></div>
              <p className="text-sm text-gray-500 font-bold uppercase">Absent</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-black text-gray-900">2</h3>
              <span className="text-sm font-bold text-gray-400">days</span>
            </div>
          </div>

        </div>

        {/* Detailed Logs Table */}
        <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm overflow-hidden flex flex-col">
          {/* Table Toolbar */}
          <div className="p-5 md:p-6 border-b border-gray-100/50 bg-white/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
              <CalendarDays size={20} className="text-indigo-600" /> Daily Logs
            </h3>
            <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-50 shadow-sm transition-colors">
              <Filter size={16} /> Filter Status
            </button>
          </div>

          {/* Responsive Table Container */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 pl-6 font-bold">Date</th>
                  <th className="p-4 font-bold">Check In</th>
                  <th className="p-4 font-bold">Check Out</th>
                  <th className="p-4 font-bold">Working Hours</th>
                  <th className="p-4 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {attendanceLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white transition-colors group">
                    <td className="p-4 pl-6">
                      <p className="font-bold text-gray-900">{log.date}</p>
                      <p className="text-xs text-gray-500 font-medium">{log.day}</p>
                    </td>
                    <td className="p-4">
                      <span className={`font-semibold ${log.checkIn === "--" ? "text-gray-400" : "text-gray-900"}`}>
                        {log.checkIn}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`font-semibold ${log.checkOut === "--" ? "text-gray-400" : "text-gray-900"}`}>
                        {log.checkOut}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-gray-600 font-bold">
                        <Clock size={16} className={log.hours === "0h" ? "text-gray-300" : "text-indigo-400"} />
                        {log.hours}
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(log.status)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination / Footer */}
          <div className="p-4 md:p-5 border-t border-gray-100/50 bg-gray-50/50 flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Showing 1 to 6 of 22 entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-white transition-colors bg-gray-100 cursor-not-allowed">Prev</button>
              <button className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg font-bold shadow-sm">1</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-white transition-colors">2</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-white transition-colors">Next</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}