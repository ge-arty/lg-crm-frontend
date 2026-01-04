import type { ReactNode } from "react";
import Header from "../Header";
import Sidebar from "../Sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className='flex h-screen bg-gray-50 overflow-hidden'>
      <div className='hidden md:flex'>
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className='flex-1 flex flex-col overflow-hidden'>
        {/* Header with burger*/}
        <Header />

        {/* Page content */}
        <main className='flex-1 overflow-y-auto p-6'>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
