"use client";
import { Users, Search, Plus } from "lucide-react";

export default function ManageUsersPage() {
  return (
    <div className="p-6 md:p-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Manage Users</h1>
          <p className="text-gray-500 font-medium mt-1">Admin Panel &gt; My Users</p>
        </div>
        
        <button className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-green-700 transition-all shadow-sm">
          <Plus size={18} /> Add New User
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-[2rem] shadow-sm p-8 text-center">
        <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users size={32} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">You are securely in the Admin section!</h2>
        <p className="text-gray-500 max-w-md mx-auto">
          This is your dedicated `/admin/user` route. You can build your user management data table here.
        </p>
      </div>
    </div>
  );
}