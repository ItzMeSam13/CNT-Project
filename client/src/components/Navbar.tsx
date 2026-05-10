"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LayoutDashboard, Users, Info, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/community", label: "Community", icon: Users },
  { href: "/about", label: "About OU", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 px-5 md:px-8 flex items-center justify-between border-b border-[#1E293B] bg-[#060918]/90 backdrop-blur-2xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#06D6A0] flex items-center justify-center text-xs font-black text-white shadow-[0_0_20px_rgba(139,92,246,0.25)]">
            V
          </div>
          <span className="font-['Outfit'] font-bold text-[17px] text-white tracking-tight">
            VaultIQ
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-medium no-underline transition-all duration-300 ${
                  active
                    ? "text-[#8B5CF6] bg-[#8B5CF6]/10"
                    : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right section */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {user && (
            <>
              <span className="text-xs text-[#475569] truncate max-w-[160px]">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-medium text-[#94A3B8] hover:text-[#F472B6] hover:bg-[#F472B6]/10 transition-all duration-300 border-0 bg-transparent cursor-pointer"
              >
                <LogOut size={15} />
                Sign out
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-transparent border border-[#1E293B] text-[#94A3B8] hover:text-white hover:border-[#8B5CF6]/30 transition-all duration-300 cursor-pointer"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile slide-down menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-[fadeIn_0.2s_ease]">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          
          {/* Menu panel */}
          <div className="absolute top-16 left-0 right-0 bg-[#0F1629] border-b border-[#1E293B] shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-[fadeUp_0.3s_ease]">
            <div className="p-5 flex flex-col gap-2">
              {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium no-underline transition-all duration-300 ${
                      active
                        ? "text-[#8B5CF6] bg-[#8B5CF6]/10"
                        : "text-[#94A3B8] hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                );
              })}
              
              {/* Divider */}
              <div className="h-px bg-[#1E293B] my-2" />
              
              {user && (
                <>
                  <div className="px-4 py-2 text-xs text-[#475569] truncate">{user.email}</div>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      handleSignOut();
                    }}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium text-[#F472B6] hover:bg-[#F472B6]/10 transition-all duration-300 border-0 bg-transparent cursor-pointer w-full text-left"
                  >
                    <LogOut size={18} />
                    Sign out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
