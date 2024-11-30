"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import RenderElement from "@/lib/elements/RenderElement";
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

  const { addElement, elements } = useElements();

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isOverdroppingArea = over?.data?.current?.isDropArea;
      if (isOverdroppingArea) {
        addElement({
          elementType: active.data.current?.type,
          elementCategory: active.data.current?.category,
          elementSubCategory: active.data.current?.category,
        });
      }
    },
  });
  return (
    <div
      className={cn(
        "flex-1 h-full border-2 border-transparent rounded-lg",
        droppable.isOver && "border-white"
      )}
      ref={droppable.setNodeRef}
    >
      {elements.map((element) => (
        <RenderElement key={element.id} element={element} />
      ))}
      {/* <iframe src="/editor/webview" className="w-full h-full"></iframe> */}
    </div>
  );
}

export default WebViewer;
