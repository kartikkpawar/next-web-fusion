"use client";
import { cn } from "@/lib/utils";
import { useDroppable } from "@dnd-kit/core";
import React from "react";

function WebViewer() {
  const droppable = useDroppable({
    id: "webBuilder-drop-area",
    data: {
      isDropArea: true,
    },
  });

  console.log("droppable", droppable);
  return (
    <div
      className={cn(
        "flex-1 h-full border-2 rounded-lg",
        droppable.isOver && "border-white"
      )}
      ref={droppable.setNodeRef}
    >
      WebViewer
    </div>
  );
}

export default WebViewer;
