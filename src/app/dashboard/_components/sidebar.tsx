import {
  Home,
  LayoutDashboard,
  LineChart,
  ListTodo,
  Package2,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React from "react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard />,
    },
    {
      href: "/dashboard/todos",
      label: "Todos",
      icon: <ListTodo />,
    },
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: <UserRound />,
    },
  ];

  return (
    <div className="flex h-full max-h-screen flex-col gap-0">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span>Stark Food Systems</span>
        </Link>
      </div>
      <div className="flex-1">
        <nav className="grid items-start ">
          {navItems.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3  px-3 py-2 transition-all 
                ${
                  pathname === href
                    ? "bg-primary text-white"
                    : "text-muted-foreground hover:text-primary"
                }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
