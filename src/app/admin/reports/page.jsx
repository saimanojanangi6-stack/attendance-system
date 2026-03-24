"use client";
import { useState } from "react";
import { 
  Download, 
  Filter, 
  Search, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Clock, 
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// Mock data for admin reports
const reportData = [
  { id: 1, name: "John Doe", role: "Senior Developer", date: "Oct 24, 2023", checkIn: "09:05 AM", checkOut: "06:10 PM", status: "Present" },
  { id: 2, name: "Sarah Smith", role: "Product Manager", date: "Oct 24, 2023", checkIn: "08:55 AM", checkOut: "05:00 PM", status: "Present" },
  { id: 3, name: "Michael Brown", role: "UX Designer", date: "Oct 24, 2023", checkIn: "09:45 AM", checkOut: "06:30 PM", status: "Late" },
  { id: 4, name: "Emily Davis", role: "Marketing Lead", date: "Oct 24, 2023", checkIn: "--", checkOut: "--", status: "Absent" },
  { id: 5, name: "David Wilson", role: "Frontend Dev", date: "Oct 24, 2023", checkIn: "09:00 AM", checkOut: "01:00 PM", status: "Half Day" },
  { id: 6, name: "Jessica Taylor", role: "HR Specialist", date: "Oct 23, 2023", checkIn: "08:50 AM", checkOut: "05:15 PM", status: "Present" },
];

export default function AdminReportsPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setToast("Master Report downloaded successfully!");
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  // Helper function for status badges
  const getStatusBadge = (status) => {
    switch (status) {
      case "Present":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-700 border border-green-200"><CheckCircle2 size={12} /> Present</span>;
      case "Absent":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200"><AlertCircle size={12} /> Absent</span>;
      case "Late":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200"><Clock size={12} /> Late</span>;
      case "Half Day":
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200"><Clock size={12} /> Half Day</span>;
      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-full w-full bg-gradient-to-br from-slate-50 via-gray-50 to-green-50/40 p-4 sm:p-6 md:p-8 animate-in fade-in duration-500">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-5">
          <CheckCircle2 size={20} /> <span className="font-bold">{toast}</span>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-5 md:p-6 rounded-[2rem] border border-white/80 shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">System Reports</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">Generate, filter, and export organization-wide attendance records.</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={handleExport} 
              disabled={isExporting} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-all font-bold shadow-sm disabled:opacity-50"
            >
              <Download size={18} className={isExporting ? "animate-bounce" : ""} /> 
              {isExporting ? "Generating..." : "Export CSV"}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase">Avg Attendance</p>
              <h3 className="text-2xl font-black text-gray-900 mt-0.5">94.2%</h3>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase">Avg Work Hours</p>
              <h3 className="text-2xl font-black text-gray-900 mt-0.5">8h 15m</h3>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
              <Users size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase">Total Late</p>
              <h3 className="text-2xl font-black text-gray-900 mt-0.5">14</h3>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase">Total Absent</p>
              <h3 className="text-2xl font-black text-gray-900 mt-0.5">8</h3>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white/80 backdrop-blur-xl p-4 md:p-5 rounded-[1.5rem] border border-white shadow-sm flex flex-col lg:flex-row items-center gap-4">
          <div className="relative w-full lg:w-1/3">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search employee name or ID..." 
              className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-600/50"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3 flex-1">
            <div className="relative flex-1">
              <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600/50 appearance-none">
                <option>Today</option>
                <option>Last 7 Days</option>
                <option>This Month</option>
                <option>Custom Range</option>
              </select>
            </div>
            <div className="relative flex-1">
              <Filter size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-600/50 appearance-none">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Human Resources</option>
              </select>
            </div>
          </div>
          
          <button className="w-full lg:w-auto px-6 py-2.5 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors shadow-sm">
            Apply Filters
          </button>
        </div>

        {/* Master Data Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 md:p-6 border-b border-gray-100/50 bg-white/50 flex justify-between items-center">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
              <FileText size={20} className="text-green-600" /> Master Attendance Log
            </h3>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider">
                  <th className="p-4 pl-6 font-bold">Employee</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">Check In</th>
                  <th className="p-4 font-bold">Check Out</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 pr-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {reportData.map((row) => (
                  <tr key={row.id} className="hover:bg-white transition-colors group">
                    <td className="p-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 font-bold flex items-center justify-center shrink-0">
                          {row.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{row.name}</p>
                          <p className="text-xs text-gray-500 font-medium">{row.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-semibold text-gray-900">{row.date}</p>
                    </td>
                    <td className="p-4">
                      <span className={`font-semibold ${row.checkIn === "--" ? "text-gray-400" : "text-gray-900"}`}>{row.checkIn}</span>
                    </td>
                    <td className="p-4">
                      <span className={`font-semibold ${row.checkOut === "--" ? "text-gray-400" : "text-gray-900"}`}>{row.checkOut}</span>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(row.status)}
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button className="text-indigo-600 hover:text-indigo-900 font-bold text-xs bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          <div className="p-4 md:p-5 border-t border-gray-100/50 bg-gray-50/50 flex items-center justify-between text-sm">
            <span className="text-gray-500 font-medium">Showing 1 to 6 of 150 entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-white transition-colors bg-gray-100 cursor-not-allowed flex items-center"><ChevronLeft size={16} /></button>
              <button className="px-3 py-1.5 bg-green-600 text-white rounded-lg font-bold shadow-sm">1</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-white transition-colors">2</button>
              <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 font-medium hover:bg-white transition-colors flex items-center"><ChevronRight size={16} /></button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}