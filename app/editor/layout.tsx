"use client";
import EditorToolbarProvider from "@/components/providers/EditorToolbarsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-full">
        <EditorToolbarProvider>{children}</EditorToolbarProvider>
      </div>
    </QueryClientProvider>
  );
}
