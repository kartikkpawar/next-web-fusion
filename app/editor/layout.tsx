import EditorToolbarProvider from "@/components/providers/EditorToolbarsProvider";
import React from "react";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full">
      <EditorToolbarProvider>{children}</EditorToolbarProvider>
    </div>
  );
}
