"use client";
import React, { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import DraggableElementOverlay from "./DraggableElementOverlay";

function DragOverlayWrapper() {
  const [draggedElement, setDraggedElement] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedElement(event.active);
    },
    onDragCancel: () => {
      setDraggedElement(null);
    },
    onDragEnd: () => {
      setDraggedElement(null);
    },
  });

  if (!draggedElement) return <></>;

  const data = draggedElement?.data.current;
  const node = (
    <DraggableElementOverlay title={data?.title} type={data?.type} />
  );

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
