"use client";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import Topbar from "./home/_components/Topbar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider className="flex">
        <AppSidebar />
        <div className="p-3 px-5 w-full">
          <Topbar />
          {children}
        </div>
      </SidebarProvider>
    </QueryClientProvider>
  );
}
