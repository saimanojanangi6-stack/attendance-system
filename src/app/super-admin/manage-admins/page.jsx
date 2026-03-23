"use client";
import { useState } from "react";
import { Shield, Plus, Edit, Trash2, Search, X, CheckCircle2 } from "lucide-react";

export default function ManageAdmins() {
  // 1. Initial State
  const [admins, setAdmins] = useState([
    { id: 1, name: "Sarah Connor", email: "sarah.c@attendify.com", status: "Active", department: "HR" },
    { id: 2, name: "James Holden", email: "james.h@attendify.com", status: "Active", department: "Operations" },
    { id: 3, name: "Amos Burton", email: "amos.b@attendify.com", status: "Inactive", department: "Security" },
  ]);

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Modal & Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("Add");
  const [toast, setToast] = useState(null);
  const [formData, setFormData] = useState({ id: null, name: "", email: "", department: "", status: "Active" });

  // 2. Filtered Data (Makes the search bar work!)
  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    admin.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 3. Action Handlers
  const handleOpenAdd = () => {
    setFormData({ id: null, name: "", email: "", department: "", status: "Active" }); 
    setModalMode("Add");
    setIsModalOpen(true);
  };

  const handleOpenEdit = (admin) => {
    setFormData(admin); 
    setModalMode("Edit");
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this admin?")) {
      setAdmins(admins.filter(admin => admin.id !== id));
      showToast("Admin deleted successfully!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === "Add") {
      setAdmins([...admins, { ...formData, id: Date.now() }]);
      showToast("New admin added successfully!");
    } else {
      setAdmins(admins.map(a => a.id === formData.id ? formData : a));
      showToast("Admin updated successfully!");
    }
    setIsModalOpen(false); 
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000); 
  };

  return (
    <div className="relative min-h-full w-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/40 p-4 sm:p-6 md:p-8">
      
      {/* Success Toast Notification */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 bg-green-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top-5">
          <CheckCircle2 size={20} />
          <span className="font-bold">{toast}</span>
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-5 md:p-6 rounded-[2rem] border border-white/80 shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">Manage Admins</h1>
            <p className="text-sm md:text-base text-gray-500 mt-1 font-medium">Control administrative access and permissions.</p>
          </div>
          <button 
            onClick={handleOpenAdd}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition-all font-bold shadow-sm w-full sm:w-auto"
          >
            <Plus size={20} /> Add New Admin
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-white/80 backdrop-blur-xl rounded-[2rem] border border-white shadow-sm overflow-hidden">
          <div className="p-4 md:p-6 border-b border-gray-100/50 flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* FUNCTIONAL SEARCH BAR */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search admins..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 text-gray-900 font-medium border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400"
              />
            </div>

            <span className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold border border-blue-100 shrink-0">
              Total: {filteredAdmins.length}
            </span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-gray-50/50 text-gray-500 text-xs md:text-sm uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Admin Details</th>
                  <th className="px-6 py-4 font-bold">Department</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-gray-700">
                {filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-white transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold border border-indigo-200 shrink-0">
                          {admin.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{admin.name}</p>
                          <p className="text-xs md:text-sm text-gray-500">{admin.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-sm md:text-base">{admin.department}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${admin.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {admin.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleOpenEdit(admin)} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors" title="Edit Admin">
                          <Edit size={18} />
                        </button>
                        <button onClick={() => handleDelete(admin.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors" title="Delete Admin">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredAdmins.length === 0 && (
                  <tr><td colSpan="4" className="text-center py-8 text-gray-500 font-medium">No admins found matching your search.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* INTERACTIVE MODAL (POP-UP FORM)           */}
      {/* ========================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
            
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">{modalMode} Admin</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-800 p-1"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* FIXED TEXT COLOR: Added text-gray-900 and placeholder:text-gray-400 */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                <input 
                  required 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 font-medium border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-gray-400" 
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                <input 
                  required 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  className="w-full px-4 py-3 bg-gray-50 text-gray-900 font-medium border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-gray-400" 
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Department</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.department} 
                    onChange={(e) => setFormData({...formData, department: e.target.value})} 
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 font-medium border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-gray-400" 
                    placeholder="e.g. IT"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData({...formData, status: e.target.value})} 
                    className="w-full px-4 py-3 bg-gray-50 text-gray-900 font-medium border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-md">Save Admin</button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
}