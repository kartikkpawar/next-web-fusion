"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import React from "react";

function WebViewer() {
  const droppable = useDroppable({
    id: "webBuilder-drop-area",
    data: {
      isDropArea: true,
    },
  });

  const { addElement } = useElements();

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isOverdroppingArea = over?.data?.current?.isDropArea;
      if (isOverdroppingArea) {
        addElement(active.data.current?.type);
      }
    },
  });
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
