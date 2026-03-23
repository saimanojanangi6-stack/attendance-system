import { Shield, Users, UserCheck, UserX, Plus, Edit, Trash2, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SuperAdminDashboard() {
  return (
    <div className="relative min-h-full w-full overflow-hidden bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/40 p-4 sm:p-6 md:p-8">
      
      {/* Decorative Ambient Background Blurs */}
      <div className="absolute top-0 left-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-40 animate-pulse pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 pointer-events-none hidden md:block"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-5 md:p-6 rounded-[2rem] border border-white/80 shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Super Admin Dashboard</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">System overview and administrative controls.</p>
          </div>
          <Link href="/super-admin/manage-admins" className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-5 py-3 md:py-2.5 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all font-semibold shadow-sm w-full sm:w-auto">
            <Shield size={18} />
            Manage Admins
          </Link>
        </div>
        
        {/* Dashboard Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:scale-110 transition-transform"><Shield size={24} /></div>
            </div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Total Admins</p>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mt-1">12</h3>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-white shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl group-hover:scale-110 transition-transform"><Users size={24} /></div>
            </div>
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">Total Users</p>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mt-1">1,240</h3>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-green-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all duration-300 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-50 to-green-100 rounded-bl-full -z-10 opacity-50"></div>
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-50 text-green-600 rounded-2xl group-hover:scale-110 transition-transform"><UserCheck size={24} /></div>
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
            </div>
            <p className="text-sm text-green-700 font-bold uppercase tracking-wider">Active Users</p>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mt-1">1,180</h3>
          </div>

          <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl border border-red-100 shadow-sm hover:shadow-md hover:border-red-200 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-50 text-red-600 rounded-2xl group-hover:scale-110 transition-transform"><UserX size={24} /></div>
            </div>
            <p className="text-sm text-red-700 font-bold uppercase tracking-wider">Inactive Users</p>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mt-1">60</h3>
          </div>
        </div>

        {/* Action Panel & Graphs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Quick Actions Wired to Manage Admins Page */}
          <div className="lg:col-span-1 bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm flex flex-col h-full">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quick Actions</h3>
            <p className="text-gray-500 mb-6 text-sm font-medium">Manage system administrators.</p>
            
            <div className="space-y-3 flex-1">
              <Link href="/super-admin/manage-admins" className="w-full flex items-center p-4 rounded-2xl border border-transparent bg-white shadow-sm hover:bg-blue-50 hover:text-blue-700 transition-all group">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg mr-4"><Plus size={18} /></div>
                <span className="font-bold flex-1 text-left">Add Admin</span>
                <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
              </Link>
              
              <Link href="/super-admin/manage-admins" className="w-full flex items-center p-4 rounded-2xl border border-transparent bg-white shadow-sm hover:bg-gray-50 transition-all group">
                <div className="p-2 bg-gray-100 text-gray-600 rounded-lg mr-4"><Edit size={18} /></div>
                <span className="font-bold text-gray-700 flex-1 text-left">Edit Admin</span>
                <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gray-500" />
              </Link>
              
              <Link href="/super-admin/manage-admins" className="w-full flex items-center p-4 rounded-2xl border border-transparent bg-white shadow-sm hover:bg-red-50 hover:text-red-700 transition-all group">
                <div className="p-2 bg-red-100 text-red-600 rounded-lg mr-4"><Trash2 size={18} /></div>
                <span className="font-bold flex-1 text-left">Delete Admin</span>
                <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-red-600" />
              </Link>
            </div>
            
            <Link href="/super-admin/global-analytics" className="mt-4 w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-gray-900 text-white font-bold hover:bg-gray-800 transition-all shadow-md">
              <FileText size={18} /> View Reports
            </Link>
          </div>

          {/* Graphs Area */}
          <div className="lg:col-span-2 bg-white/80 backdrop-blur-xl p-6 md:p-8 rounded-[2rem] border border-white shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-bl-full -z-10"></div>
             
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
               <h3 className="text-xl font-bold text-gray-900">System-wide Trends</h3>
               <div className="flex bg-gray-100 p-1 rounded-lg self-start sm:self-auto">
                 <button className="px-4 py-1.5 bg-white shadow-sm rounded-md text-sm font-bold text-gray-900">Monthly</button>
                 <button className="px-4 py-1.5 rounded-md text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors">Weekly</button>
               </div>
             </div>

             {/* Chart UI Representation */}
             <div className="h-48 md:h-64 flex items-end justify-between gap-1 sm:gap-2 pt-4 border-b border-gray-100 relative">
               {/* Grid lines */}
               <div className="absolute top-0 w-full border-t border-dashed border-gray-200"></div>
               <div className="absolute top-1/2 w-full border-t border-dashed border-gray-200"></div>
               
               {/* Bars */}
               {[60, 80, 50, 95, 75, 85, 100, 40, 65, 90, 85, 95].map((height, i) => (
                 <div key={i} className="relative group w-full max-w-[40px] flex justify-center">
                   <div className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-lg hover:opacity-80 transition-all duration-300 cursor-pointer relative z-10" style={{ height: `${height}%` }}></div>
                   {/* Tooltip on hover */}
                   <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white text-xs py-1 px-2 rounded font-bold whitespace-nowrap z-20">
                     {height}%
                   </div>
                 </div>
               ))}
             </div>
             <div className="flex justify-between mt-3 text-xs md:text-sm font-bold text-gray-400 px-1">
               <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}