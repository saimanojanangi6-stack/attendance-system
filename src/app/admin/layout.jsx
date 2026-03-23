"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, X, LayoutDashboard, Camera, Clock, 
  User, LogOut, UserCircle 
} from "lucide-react";

export default function UserLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const menuItems = [
    { name: "Dashboard", href: "/user", icon: LayoutDashboard },
    { name: "Mark Attendance", href: "/user/mark-attendance", icon: Camera },
    { name: "My Attendance", href: "/user/my-attendance", icon: Clock },
    { name: "Profile", href: "/user/profile", icon: User },
  ];

  return (
    <div className="h-screen w-full flex bg-gray-50 font-sans overflow-hidden">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0f172a] text-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex flex-none items-center gap-3 px-8 py-6 border-b border-gray-800">
          <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-600/20">A</div>
          <h1 className="text-2xl font-extrabold tracking-tight">Attendify</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">User Menu</p>
          {menuItems.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/user');
            return (
              <Link key={link.name} href={link.href} className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium group ${isActive ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20" : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
                <Icon size={20} className={isActive ? "text-white" : "text-gray-400 group-hover:text-indigo-400 transition-colors"} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="flex-none p-4 border-t border-gray-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-semibold">
            <LogOut size={20} /> Logout
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="md:hidden flex-none flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b border-gray-200 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-700 hover:text-indigo-600 transition-colors p-1">
              {isSidebarOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Attendify</h1>
          </div>
        </header>

        <header className="hidden md:flex flex-none items-center justify-between bg-white/90 backdrop-blur-md px-8 py-5 border-b border-gray-200 shadow-sm z-10">
          <h2 className="text-xl font-bold text-gray-800 capitalize">{pathname === '/user' ? 'Dashboard' : pathname.split('/').pop().replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
             <div className="text-sm font-medium text-gray-500">Employee Portal</div>
             <div className="h-8 w-px bg-gray-200"></div>
             <div className="flex items-center gap-2"><UserCircle size={24} className="text-gray-600" /><span className="text-sm font-bold text-gray-700">John Doe</span></div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto w-full relative">{children}</main>
      </div>
    </div>
  );
}