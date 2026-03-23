"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, LayoutDashboard, Shield, Users, 
  BarChart3, Settings, LogOut, UserCircle 
} from "lucide-react";

export default function SuperAdminLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Automatically close the sidebar on mobile when a navigation link is clicked
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", href: "/super-admin", icon: LayoutDashboard },
    { name: "Manage Admins", href: "/super-admin/manage-admins", icon: Shield },
    { name: "View All Users", href: "/super-admin/view-users", icon: Users },
    { name: "Global Analytics", href: "/super-admin/global-analytics", icon: BarChart3 },
    { name: "System Settings", href: "/super-admin/settings", icon: Settings },
  ];

  return (
    // BULLETPROOF MOBILE LAYOUT WRAPPER
    <div className="h-screen w-full flex bg-gray-50 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar (Left Panel) */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 text-white shadow-2xl flex flex-col
        transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Desktop Sidebar Header */}
        <div className="hidden md:flex flex-none items-center gap-3 px-8 py-6 border-b border-gray-800">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-600/20">A</div>
          <h1 className="text-2xl font-extrabold tracking-tight">Attendify</h1>
        </div>

        {/* Mobile Sidebar Header */}
        <div className="md:hidden flex flex-none items-center justify-between px-6 py-5 border-b border-gray-800">
          <h2 className="text-lg font-bold text-gray-300">Super Admin Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-white p-1">
            <X size={24} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Role-based Options</p>
          
          {menuItems.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/super-admin');
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium group ${
                  isActive 
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20" 
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={20} className={isActive ? "text-white" : "text-gray-400 group-hover:text-blue-400 transition-colors"} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile & Logout */}
        <div className="flex-none p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gray-800/50 border border-gray-700/50">
            <UserCircle size={36} className="text-blue-400 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-white truncate">System Admin</p>
              <p className="text-xs text-gray-400 truncate">admin@attendify.com</p>
            </div>
          </div>
          <Link 
            href="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-semibold"
          >
            <LogOut size={20} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Right Side Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Mobile Top Navbar (Stays fixed at top) */}
        <header className="md:hidden flex-none flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b border-gray-200 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
              className="text-gray-700 hover:text-blue-600 transition-colors p-1"
              aria-label="Toggle Sidebar"
            >
              {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">A</div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Attendify</h1>
            </div>
          </div>
          <div className="text-gray-600">
            <UserCircle size={28} />
          </div>
        </header>

        {/* Desktop Top Navbar (Stays fixed at top) */}
        <header className="hidden md:flex flex-none items-center justify-between bg-white/90 backdrop-blur-md px-8 py-5 border-b border-gray-200 shadow-sm z-10">
          <h2 className="text-xl font-bold text-gray-800 capitalize">
            {pathname === '/super-admin' ? 'Dashboard' : pathname.split('/').pop().replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-6">
             <div className="text-sm font-medium text-gray-500">Super Admin Portal</div>
             <div className="h-8 w-px bg-gray-200"></div>
             <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-1.5 rounded-lg transition-colors border border-transparent hover:border-gray-200">
               <UserCircle size={24} className="text-gray-600" />
               <span className="text-sm font-bold text-gray-700">Profile</span>
             </div>
          </div>
        </header>

        {/* Scrollable Main Content (Guarantees no invisible sections) */}
        <main className="flex-1 overflow-y-auto w-full relative">
          {children}
        </main>
        
      </div>
    </div>
  );
}