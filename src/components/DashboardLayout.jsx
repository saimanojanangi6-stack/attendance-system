"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children, role }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Automatically close the sidebar on mobile when a user clicks a link
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  return (
    // 1. CHANGED: min-h-screen to h-screen. This locks the height to the viewport.
    <div className="h-screen w-full bg-gray-50 flex flex-col overflow-hidden">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden flex-none flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b border-gray-200 z-50 relative">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">Attendify</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="text-gray-700 bg-gray-50 p-2 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Navbar (Hidden on mobile) */}
      <div className="hidden md:block flex-none z-20 relative">
        <Navbar />
      </div>

      {/* 2. CHANGED: Made this wrapper flex-1 and overflow-hidden so the sidebar stays pinned */}
      <div className="flex flex-1 overflow-hidden relative w-full">
        
        {/* Mobile Sidebar Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 md:hidden transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar - Off-canvas on mobile, fixed height on desktop */}
        <div 
          className={`fixed inset-y-0 left-0 transform ${
            isSidebarOpen ? "translate-x-0 mt-[73px]" : "-translate-x-full"
          } md:relative md:translate-x-0 md:mt-0 transition duration-300 ease-in-out z-50 w-64 flex-none md:z-10 shadow-xl md:shadow-none h-full`}
        >
          <Sidebar role={role} />
        </div>

        {/* Main Content Area - 3. CHANGED: overflow-y-auto is applied ONLY here */}
        <main className="flex-1 overflow-y-auto h-full w-full bg-gray-50 relative">
          {children}
        </main>
      </div>
    </div>
  );
}