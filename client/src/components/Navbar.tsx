"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, LayoutDashboard, Users, Info } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/community", label: "Community", icon: Users },
  { href: "/about", label: "About OU", icon: Info },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const handleSignOut = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 px-6 flex items-center justify-between border-b border-white/[0.06] bg-[#080B14]/85 backdrop-blur-xl">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 no-underline">
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00C896] to-[#7B61FF] flex items-center justify-center text-xs font-bold">
          ₿
        </div>
        <span className="font-['Syne'] font-bold text-base text-[#E8EAF0] tracking-tight">
          VaultIQ
        </span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex items-center gap-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium no-underline transition-colors ${
                active
                  ? "text-[#00C896] bg-[#00C896]/10"
                  : "text-[#8892A4] hover:text-[#E8EAF0] hover:bg-white/[0.04]"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {user && (
          <>
            <span className="hidden sm:inline text-xs text-[#4A5568] truncate max-w-[160px]">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-[#8892A4] hover:text-[#FF6B6B] hover:bg-[#FF6B6B]/10 transition-colors border-0 bg-transparent cursor-pointer"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Sign out</span>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
