import { useState } from "react";
import { Menu } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Header = () => {
  const { authUser, logout } = useAuthStore();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const getInitials = () => {
    if (!authUser) return "U";
    const firstName = authUser.firstName || "";
    const lastName = authUser.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <>
      <header className='h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6'>
        {/* left side burger + logo */}
        <div className='flex items-center gap-3'>
          {/* burger*/}
          <button
            className='md:hidden p-2 rounded-lg hover:bg-gray-100'
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu size={22} className='text-gray-700' />
          </button>

          {/* LG sign only on mobile */}
          <div className='md:hidden flex items-center gap-2'>
            <div className='w-10 h-10 rounded-lg bg-gradient-to-r from-[#A50034] to-[#C4003C] flex items-center justify-center'>
              <span className='text-white font-bold text-lg'>LG</span>
            </div>
            <span className='text-xs font-semibold text-gray-700 uppercase tracking-wider'>
              SOMS
            </span>
          </div>
        </div>

        {/* right side: Avatar + User info */}
        <div className='flex items-center gap-3'>
          <div className='text-right hidden sm:block'>
            <p className='text-sm font-semibold text-gray-900'>
              {authUser?.firstName} {authUser?.lastName}
            </p>
            <p className='text-xs text-gray-500'>{authUser?.email}</p>
          </div>

          {/* Avatar */}
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              {authUser?.profilePic ? (
                <div className='w-10 h-10 rounded-full'>
                  <img
                    src={authUser.profilePic}
                    alt='Profile'
                    className='w-full h-full rounded-full object-cover'
                  />
                </div>
              ) : (
                <div className='w-10 h-10 rounded-full bg-gradient-to-br from-[#A50034] to-[#C4003C] flex items-center justify-center text-white font-bold shadow-md'>
                  {getInitials()}
                </div>
              )}
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-white rounded-box z-[30] mt-3 w-52 p-2 shadow-lg border border-gray-200'
            >
              <li className='menu-title'>
                <span className='text-gray-900'>
                  {authUser?.firstName} {authUser?.lastName}
                </span>
              </li>
              <li>
                <Link to='/settings' className='text-gray-700'>
                  Settings
                </Link>
              </li>
              <li>
                <button onClick={logout} className='text-red-600'>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* mobile sidebar*/}
      {isMobileSidebarOpen && (
        <div className='fixed inset-0 z-50 md:hidden bg-white'>
          <Sidebar onClose={() => setIsMobileSidebarOpen(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
