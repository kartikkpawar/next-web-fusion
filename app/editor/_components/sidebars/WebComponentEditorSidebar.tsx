"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import React from "react";

function WebComponentEditorSidebar() {
  const { currentActiveElement } = useElements();
  return (
    <div className="flex flex-col px-2 space-y-5 pt-2 h-full">
      <pre>{JSON.stringify(currentActiveElement, null, 4)}</pre>
    </div>
  );
}

export default WebComponentEditorSidebar;
