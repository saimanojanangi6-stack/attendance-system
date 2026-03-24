import DashboardLayout from "../../components/DashboardLayout";

export default function AdminLayout({ children }) {
  // Passing role="admin" ensures the Sidebar renders the correct links
  return (
    <DashboardLayout role="admin">
      {children}
    </DashboardLayout>
  );
}