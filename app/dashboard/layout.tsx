import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import Topbar from "./_components/Topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex">
      <AppSidebar />
      <div className="p-3 px-5 w-full">
        <Topbar />
        {children}
      </div>
    </SidebarProvider>
  );
}
