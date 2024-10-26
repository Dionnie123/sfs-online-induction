import React from "react";
import { Dashboard } from "./_components/dashboard";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Dashboard>{children}</Dashboard>;
}
