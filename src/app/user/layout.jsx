"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, LayoutDashboard, Camera, Clock, 
  User, LogOut, UserCircle, Bell 
} from "lucide-react";

export default function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar automatically on mobile after clicking a link
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", href: "/user", icon: LayoutDashboard }, // [cite: 82]
    { name: "Mark Attendance", href: "/user/mark-attendance", icon: Camera }, // [cite: 83]
    { name: "My Attendance", href: "/user/my-attendance", icon: Clock }, // [cite: 84]
    { name: "Profile", href: "/user/profile", icon: User }, // [cite: 85]
  ];

  return (
    <div className="h-screen w-full flex bg-gray-50 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* --- SIDEBAR (LEFT PANEL) --- */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#1e1b4b] text-white shadow-2xl flex flex-col
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Sidebar Header (Logo) [cite: 10] */}
        <div className="flex flex-none items-center gap-3 px-8 py-6 border-b border-indigo-900/50">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/20">
            A
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Attendify</h1>
        </div>

        {/* Navigation Menu [cite: 14, 81] */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          <p className="px-4 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-4">
            User Menu
          </p>
          
          {menuItems.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all font-bold group ${
                  isActive 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-indigo-300 hover:bg-indigo-900/50 hover:text-white"
                }`}
              >
                <Icon size={20} className={isActive ? "text-white" : "text-indigo-400 group-hover:text-white transition-colors"} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Bottom (Profile & Logout) [cite: 12, 86] */}
        <div className="flex-none p-4 border-t border-indigo-900/50">
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-bold"
          >
            <LogOut size={20} />
            Logout
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* --- TOP NAVBAR [cite: 9] --- */}
        <header className="flex-none flex items-center justify-between bg-white px-6 md:px-10 py-5 border-b border-gray-100 z-30 shadow-sm">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Toggle Icon */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="md:hidden text-gray-700 hover:text-indigo-600 transition-colors p-1"
            >
              {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            <h2 className="hidden md:block text-xl font-black text-gray-800 tracking-tight">
              {menuItems.find(m => m.href === pathname)?.name || "Dashboard"}
            </h2>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
             {/* Notification Icon */}
             <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
               <Bell size={22} />
               <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
             </button>
             
             <div className="h-8 w-px bg-gray-100 hidden sm:block"></div>
             
             {/* Profile Section [cite: 11] */}
             <Link href="/user/profile" className="flex items-center gap-3 group">
               <div className="text-right hidden sm:block">
                 <p className="text-sm font-black text-gray-900 group-hover:text-indigo-600 transition-colors">John Doe</p>
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Employee</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm overflow-hidden">
                 <UserCircle size={24} />
               </div>
             </Link>
          </div>
        </header>

        {/* --- SCROLLABLE CONTENT AREA [cite: 16] --- */}
        <main className="flex-1 overflow-y-auto w-full relative">
          {children}
        </main>
        
      </div>
    </div>
  );
}