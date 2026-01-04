import { Link, useLocation } from "react-router-dom";
import lgSomsLogo from "../assets/sidebar-logo.png";
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  X,
  Package,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

interface SidebarProps {
  onClose?: () => void;
}

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Promoters", icon: Users, path: "/promoters" },
  // { label: "Products", icon: Package, path: "/products" },
  { label: "POP Materials", icon: Package, path: "/pops" },
  // { label: "Locations", icon: MapPin, path: "/locations" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  const handleLinkClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside className='w-full md:w-64 h-full bg-white border-r border-gray-200 flex flex-col'>
      {/* Logo + Close button  */}
      <div className='h-16 flex items-center justify-between px-4 border-b border-gray-200 bg-[#A50034]'>
        <div className='text-center flex-1'>
          <img
            src={lgSomsLogo}
            alt='LG SOMS'
            className='h-14 mx-auto object-contain'
          />
        </div>

        {/* close button mobile*/}
        {onClose && (
          <button
            onClick={onClose}
            className='md:hidden p-1.5 rounded-lg bg-white/20 hover:bg-white/30 transition-colors'
          >
            <X size={20} className='text-white' />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className='flex-1 overflow-y-auto py-4 px-3'>
        <ul className='space-y-1'>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={handleLinkClick}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-[#A50034] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon
                    size={20}
                    className={active ? "text-white" : "text-gray-500"}
                  />
                  <span className='font-medium text-sm'>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className='p-3 border-t border-gray-200'>
        <button
          onClick={() => {
            logout();
            if (onClose) onClose();
          }}
          className='flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50 hover:text-red-600 transition-all duration-200 w-full'
        >
          <LogOut size={20} />
          <span className='font-medium text-sm'>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
