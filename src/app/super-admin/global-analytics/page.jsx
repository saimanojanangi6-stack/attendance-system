"use client";
import { useState } from "react";
import { BarChart3, TrendingUp, DownloadCloud, Activity, Calendar, CheckCircle2 } from "lucide-react";

export default function GlobalAnalytics() {
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState(null);

  // Functional Export Simulation
  const handleExport = () => {
    setIsExporting(true);
    
    // Simulate generating a CSV file
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8,Date,Total Logins,Avg Attendance\n2023-10-20,1142,92.4%\n2023-10-21,1150,93.1%\n2023-10-22,1100,89.5%";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Attendify_Global_Report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setIsExporting(false);
      setToast("Report downloaded successfully!");
      setTimeout(() => setToast(null), 3000);
    }, 1500); // Fake processing delay for realism
  };

  return (
    <div className="relative min-h-full w-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/40 p-4 sm:p-6 md:p-8">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-5">
          <CheckCircle2 size={20} />
          <span className="font-bold">{toast}</span>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-5 md:p-6 rounded-[2rem] border border-white/80 shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Global Analytics</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">System-wide attendance trends and metrics.</p>
          </div>
          
          {/* Functional Export Button */}
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl transition-all font-bold shadow-sm w-full sm:w-auto ${
              isExporting ? "bg-gray-400 text-gray-100 cursor-not-allowed" : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg"
            }`}
          >
            <DownloadCloud size={18} className={isExporting ? "animate-bounce" : ""} />
            {isExporting ? "Generating Report..." : "Export Full Report"}
          </button>
        </div>

        {/* Analytics Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Card */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 flex items-center gap-2">
                <TrendingUp className="text-blue-500" /> System-wide Attendance
              </h3>
            </div>
            {/* Mock Chart Area */}
            <div className="w-full h-48 md:h-64 bg-gray-50/50 border border-gray-100 rounded-2xl flex items-end justify-between p-4 md:p-6 gap-1 sm:gap-2">
              {[40, 70, 45, 90, 65, 85, 100].map((height, i) => (
                <div key={i} className="w-full bg-gradient-to-t from-blue-600 to-blue-300 rounded-t-md hover:opacity-80 transition-opacity cursor-pointer" style={{ height: `${height}%` }}></div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 text-green-50 opacity-50">
                <Activity size={100} strokeWidth={3} />
              </div>
              <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Average Attendance</p>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900">92.4%</h2>
              <p className="text-xs md:text-sm text-green-600 font-bold mt-2">↑ 2.1% from last month</p>
            </div>
            <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm">
              <p className="text-xs md:text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Logins Today</p>
              <h2 className="text-3xl md:text-4xl font-black text-blue-600">1,142</h2>
              <div className="mt-4 flex items-center gap-2 text-xs md:text-sm text-gray-500 font-medium bg-gray-50 p-2 md:p-3 rounded-xl">
                <Calendar size={16} /> Data synced 5 mins ago
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}