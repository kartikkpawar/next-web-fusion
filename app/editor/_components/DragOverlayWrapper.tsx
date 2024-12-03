"use client";
import React, { useState } from "react";
import { Active, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import DraggableElementOverlay from "./DraggableElementOverlay";
import DraggableLayerItemOverlay from "./DraggableOverlayLayerItem";

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

  let node = <DraggableElementOverlay title={data?.title} type={data?.type} />;

  if (data?.isLayerElement) {
    node = <DraggableLayerItemOverlay depth={0} element={data.element} />;
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
