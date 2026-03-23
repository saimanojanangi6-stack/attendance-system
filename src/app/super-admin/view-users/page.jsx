"use client";
import { useState } from "react";
import { Users, Search, Filter, CheckCircle2, XCircle } from "lucide-react";

export default function ViewAllUsers() {
  const [showFilters, setShowFilters] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Dummy User Data
  const allUsers = [
    { id: 101, name: "Alice Johnson", role: "User", status: "Active", lastLogin: "2 hours ago" },
    { id: 102, name: "Bob Smith", role: "User", status: "Inactive", lastLogin: "5 days ago" },
    { id: 103, name: "Charlie Davis", role: "Admin", status: "Active", lastLogin: "10 mins ago" },
    { id: 104, name: "Diana Prince", role: "User", status: "Active", lastLogin: "Yesterday" },
  ];

  // Filtering Logic
  const filteredUsers = allUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === "All" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="relative min-h-full w-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/40 p-4 sm:p-6 md:p-8">
      <div className="relative max-w-7xl mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
        
        {/* Header Section - ADDED 'relative z-50' HERE to force it above the table */}
        <div className="relative z-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-5 md:p-6 rounded-[2rem] border border-white/80 shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">System Users Directory</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">Browse and manage all registered users.</p>
          </div>
          
          {/* Functional Filter Button & Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-900 px-5 py-3 rounded-xl hover:bg-gray-50 transition-all font-bold shadow-sm"
            >
              <Filter size={18} /> {filterStatus === "All" ? "Filters" : `Status: ${filterStatus}`}
            </button>
            
            {/* The Dropdown Menu */}
            {showFilters && (
              <div className="absolute top-full right-0 mt-2 w-full sm:w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2">
                <button 
                  onClick={() => {setFilterStatus("All"); setShowFilters(false)}} 
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 font-bold text-gray-900 transition-colors"
                >
                  All Users
                </button>
                <button 
                  onClick={() => {setFilterStatus("Active"); setShowFilters(false)}} 
                  className="w-full text-left px-4 py-3 hover:bg-green-50 text-green-700 font-bold border-t border-gray-50 transition-colors"
                >
                  Active Only
                </button>
                <button 
                  onClick={() => {setFilterStatus("Inactive"); setShowFilters(false)}} 
                  className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-700 font-bold border-t border-gray-50 transition-colors"
                >
                  Inactive Only
                </button>
              </div>
            )}
          </div>
        </div>

        {/* User Directory Table - Set to z-10 so it stays under the header */}
        <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100/50">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or role..." 
                className="w-full pl-10 pr-4 py-3 bg-gray-50 text-gray-900 font-medium border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs md:text-sm uppercase tracking-wider border-b border-gray-100">
                  <th className="px-6 py-4 font-bold">User</th>
                  <th className="px-6 py-4 font-bold">Role</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-white transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 text-gray-600 font-medium">{user.role}</td>
                    <td className="px-6 py-4">
                      {user.status === "Active" 
                        ? <span className="flex items-center gap-1 text-green-600 text-sm font-bold"><CheckCircle2 size={16}/> Active</span>
                        : <span className="flex items-center gap-1 text-red-600 text-sm font-bold"><XCircle size={16}/> Inactive</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-right text-gray-500 text-sm font-medium">{user.lastLogin}</td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr><td colSpan="4" className="text-center py-8 text-gray-500 font-medium">No users found matching your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}