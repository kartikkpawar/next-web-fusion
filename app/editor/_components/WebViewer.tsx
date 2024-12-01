"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useEffect, useRef } from "react";

function WebViewer({ pageId, siteId }: { pageId: string; siteId: string }) {
  const droppable = useDroppable({
    id: "webBuilder-drop-area",
    data: {
      isDropArea: true,
    },
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { addElement, elements } = useElements();

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: "elementsUpdated",
        data: elements,
      });
    }
  }, [elements]);

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
      <iframe
        ref={iframeRef}
        src={`/editor/${siteId}/${pageId}/pageview`}
        className="w-full h-full"
      ></iframe>
    </div>
  );
}

export default WebViewer;
