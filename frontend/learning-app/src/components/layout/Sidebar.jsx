
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  BrainCircuit,
  BookOpen,
  X,
  ChevronRight,
} from "lucide-react";

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    {
      to: "/dashboard",
      icon: LayoutDashboard,
      text: "Dashboard",
    },
    {
      to: "/documents",
      icon: FileText,
      text: "Documents",
    },
    {
      to: "/flashcards",
      icon: BookOpen,
      text: "Flashcards",
    },
  ];

  const handleNavClick = () => {
    // Close sidebar only on mobile
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64
          bg-white/95 backdrop-blur-xl
          border-r border-slate-200/70
          z-50
          flex flex-col
          shadow-xl shadow-slate-200/30
          transition-transform duration-300 ease-in-out

          ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >
        {/* ================= LOGO ================= */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-slate-200/70">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-md shadow-emerald-500/20">
              <BrainCircuit
                className="text-white"
                size={20}
                strokeWidth={2.5}
              />
            </div>

            {/* App name */}
            <div>
              <h1 className="text-sm font-bold text-slate-900 leading-tight">
                AI Learning
              </h1>

              <p className="text-[10px] text-slate-400 font-medium">
                ASSISTANT
              </p>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={toggleSidebar}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* ================= NAVIGATION ================= */}
        <nav className="flex-1 px-3 py-6 overflow-y-auto">
          {/* Section title */}
          <p className="px-4 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Learning
          </p>

          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `
                    group relative flex items-center gap-3
                    px-4 py-3
                    rounded-xl
                    text-sm font-semibold
                    transition-all duration-200

                    ${
                      isActive
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }
                    `
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active indicator */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-full" />
                      )}

                      <Icon
                        size={19}
                        strokeWidth={2.3}
                        className={`
                          transition-transform duration-200
                          ${
                            isActive
                              ? ""
                              : "group-hover:scale-110"
                          }
                        `}
                      />

                      <span className="flex-1">
                        {link.text}
                      </span>

                      {isActive && (
                        <ChevronRight
                          size={16}
                          className="opacity-80"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* ================= ACCOUNT ================= */}
          <p className="px-4 mt-8 mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Account
          </p>

          <NavLink
            to="/profile"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `
              group flex items-center gap-3
              px-4 py-3
              rounded-xl
              text-sm font-semibold
              transition-all duration-200

              ${
                isActive
                  ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-500/20"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }
              `
            }
          >
            {({ isActive }) => (
              <>
                <User
                  size={19}
                  strokeWidth={2.3}
                  className={
                    !isActive
                      ? "group-hover:scale-110 transition-transform"
                      : ""
                  }
                />

                <span className="flex-1">
                  Profile
                </span>

                {isActive && (
                  <ChevronRight size={16} />
                )}
              </>
            )}
          </NavLink>
        </nav>

        {/* ================= BOTTOM SECTION ================= */}
        <div className="px-3 pb-4">
          {/* User card */}
          <div className="mb-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold shadow-sm">
                {user?.username
                  ? user.username.charAt(0).toUpperCase()
                  : "U"}
              </div>

              {/* User information */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 truncate">
                  {user?.username || "User"}
                </p>

                <p className="text-xs text-slate-500 truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="
              group flex items-center gap-3
              w-full px-4 py-3
              rounded-xl
              text-sm font-semibold
              text-slate-600
              hover:bg-red-50
              hover:text-red-600
              transition-all duration-200
            "
          >
            <LogOut
              size={19}
              strokeWidth={2.3}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

