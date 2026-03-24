"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, UserCog, Settings, FileText, 
  BarChart3, Camera, Clock, User 
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
      { name: "My Attendance", href: "#", icon: Clock },
      { name: "Profile", href: "#", icon: User },
    ],
  };

  const links = menus[role] || [];

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-[calc(100vh-73px)] p-4">
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
    </aside>
  );
}