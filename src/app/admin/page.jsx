"use client";
import { useState } from "react";
import { 
  Users, 
  UserCheck, 
  UserX, 
  UserMinus, 
  UserPlus, 
  Clock, 
  FileBarChart, 
  Download, 
  ArrowRight, 
  CheckCircle2 
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [isExporting, setIsExporting] = useState(false);
  const [toast, setToast] = useState(null);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8,Date,Present,Absent\n2023-10-24,142,8";
      const link = document.createElement("a");
      link.setAttribute("href", encodeURI(csvContent));
      link.setAttribute("download", "Daily_Attendance_Report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
      setToast("Report downloaded successfully!");
      setTimeout(() => setToast(null), 3000);
    }, 1000);
  };

  return (
    <div className="relative min-h-full w-full bg-gradient-to-br from-slate-50 via-gray-50 to-green-50/40 p-4 sm:p-6 md:p-8">
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
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Admin Overview</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">Manage your users and monitor daily attendance.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button 
              onClick={handleExport} 
              disabled={isExporting} 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 px-5 py-3 sm:py-2.5 rounded-xl hover:bg-gray-50 transition-all font-bold shadow-sm disabled:opacity-50"
            >
              <Download size={18} className={isExporting ? "animate-bounce" : ""} /> 
              {isExporting ? "Exporting..." : "Download Report"}
            </button>
            <Link 
              href="/admin/attendance" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-3 sm:py-2.5 rounded-xl hover:bg-green-700 transition-all font-bold shadow-sm"
            >
              <Clock size={18} /> Capture Attendance
            </Link>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm">
            <p className="text-sm text-gray-500 font-bold uppercase">Total Users</p>
            <h3 className="text-3xl font-black mt-1">150</h3>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-green-100 shadow-sm">
            <p className="text-sm text-green-700 font-bold uppercase">Present Today</p>
            <h3 className="text-3xl font-black mt-1">142</h3>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-red-100 shadow-sm">
            <p className="text-sm text-red-700 font-bold uppercase">Absent Today</p>
            <h3 className="text-3xl font-black mt-1">8</h3>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm">
            <p className="text-sm text-gray-500 font-bold uppercase">Active</p>
            <h3 className="text-3xl font-black mt-1">148</h3>
          </div>
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm">
            <p className="text-sm text-gray-500 font-bold uppercase">Inactive</p>
            <h3 className="text-3xl font-black mt-1">2</h3>
          </div>
        </div>

        {/* Action Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* User Management Section */}
          <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">User Management</h3>
            <div className="space-y-3">
              <Link href="/admin/user" className="w-full flex items-center justify-between p-4 rounded-2xl bg-white shadow-sm hover:bg-green-50 transition-all group">
                <span className="font-bold text-gray-900">Add New User</span>
                <ArrowRight size={18} className="text-green-600 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/admin/user" className="w-full flex items-center justify-between p-4 rounded-2xl bg-white shadow-sm hover:bg-gray-50 transition-all group">
                <span className="font-bold text-gray-900">Edit Existing User</span>
                <ArrowRight size={18} className="text-gray-500 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/admin/user" className="w-full flex items-center justify-between p-4 rounded-2xl bg-white shadow-sm hover:bg-red-50 transition-all group">
                <span className="font-bold text-gray-900">Delete User</span>
                <ArrowRight size={18} className="text-red-600 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Attendance & Analytics Section */}
          <div className="bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Attendance & Analytics</h3>
              <p className="text-gray-500 mb-6 text-sm">Review logs, capture current attendance, and access detailed analytics.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
               <Link href="/admin/attendance" className="w-full sm:flex-1 bg-green-600 text-white py-3.5 px-4 rounded-xl font-bold hover:bg-green-700 transition-all text-center shadow-md">
                 View Records
               </Link>
               <Link href="/admin/analytics" className="w-full sm:flex-1 bg-gray-900 text-white py-3.5 px-4 rounded-xl font-bold hover:bg-gray-800 transition-all text-center">
                 Analytics Page
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}