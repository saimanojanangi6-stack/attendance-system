import { UserCircle, LogOut } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm border-b border-gray-200">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 bg-blue-600 rounded-md flex items-center justify-center text-white font-bold">A</div>
        <h1 className="text-xl font-bold text-gray-800">Attendify</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <UserCircle size={24} />
          <span className="text-sm font-medium">Profile</span>
        </div>
        <Link href="/" className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-3 py-2 rounded-md transition">
          <LogOut size={20} />
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </div>
    </header>
  );
}