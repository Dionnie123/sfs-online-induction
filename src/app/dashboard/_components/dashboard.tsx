"use client";

import Sidebar from "./sidebar";

import AccountOptions from "./account-options";
import Drawer from "./drawer";
import { Toaster } from "react-hot-toast";
export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

export function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <Sidebar />
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Drawer />
          <div className="w-full flex-1"></div>
          <AccountOptions />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Toaster position="bottom-center" />
          {children}
        </main>
      </div>
    </div>
  );
}
