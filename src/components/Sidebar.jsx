"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, UserCog, Settings, FileText, 
  BarChart3, Camera, Clock, User, LogOut 
} from "lucide-react";

export default function Sidebar({ role }) {
  const pathname = usePathname();

  const menus = {
    superAdmin: [
      { name: "Dashboard", href: "/super-admin", icon: LayoutDashboard },
      { name: "Manage Admins", href: "#", icon: UserCog },
      { name: "View All Users", href: "#", icon: Users },
      { name: "Global Analytics", href: "#", icon: BarChart3 },
      { name: "System Settings", href: "#", icon: Settings },
    ],
    admin: [
      { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { name: "My Users", href: "/admin/user", icon: Users }, 
      { name: "Attendance", href: "/admin/attendance", icon: Clock }, 
      { name: "Analytics", href: "/admin/analytics", icon: BarChart3 }, 
      { name: "Reports", href: "/admin/reports", icon: FileText }, 
    ],
    user: [
      { name: "Dashboard", href: "/user", icon: LayoutDashboard },
      { name: "Mark Attendance", href: "/user/mark-attendance", icon: Camera },
      { name: "My Attendance", href: "/user/my-attendance", icon: Clock },
      { name: "Profile", href: "/user/profile", icon: User },
    ],
  };

  const links = menus[role] || [];

  return (
    <aside className="w-full h-full bg-gray-900 text-white flex flex-col border-r border-gray-800/50">
      
      {/* Scrollable Navigation Area */}
      <div className="flex-1 overflow-y-auto p-4 pb-0">
        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            
            // Checks if the current path exactly matches the link or is a sub-route
            const isActive = pathname === link.href || (pathname.startsWith(link.href) && link.href !== '/admin' && link.href !== '/user' && link.href !== '/super-admin');
            
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Pinned Logout Button at the Bottom */}
      <div className="flex-none p-4 mt-2 border-t border-gray-800 bg-gray-900">
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-medium group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Logout</span>
        </Link>
      </div>
      
    </aside>
  );
}