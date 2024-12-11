"use client";
import { useEditorToolbars } from "@/components/providers/EditorToolbarsProvider";
import { useElements } from "@/components/providers/ElementsProvider";
import { deviceConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { DragEndEvent, useDndMonitor, useDroppable } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";

function WebViewer({ pageId, siteId }: { pageId: string; siteId: string }) {
  const droppable = useDroppable({
    id: "webBuilder-drop-area",
    data: {
      isElementsDropArea: true,
    },
  });
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const { addElement, elements, addComponent } = useElements();

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

      const isOverdroppingArea = over?.data?.current?.isElementsDropArea;
      if (isOverdroppingArea) {
        if (active.data.current?.isLayerElement) return;
        if (active.data.current?.isComponent) {
          addComponent(active.data.current.element);
          return;
        }
        addElement({
          elementType: active.data.current?.type,
          elementCategory: active.data.current?.category,
          elementSubCategory: active.data.current?.category,
        });
      }
    },
  });

  const { topbarDevice } = useEditorToolbars();
  const [device, setDevice] = useState(deviceConfig[topbarDevice]);
  useEffect(() => {
    setDevice(deviceConfig[topbarDevice]);
  }, [topbarDevice]);

  return (
    <div
      className={cn(
        "h-full border-2 border-transparent rounded-lg grow-0 w-full",
        droppable.isOver &&
          !droppable.active?.data?.current?.isLayerElement &&
          "border-white"
      )}
      ref={droppable.setNodeRef}
    >
      <div
        className="relative p-3 box-border  mx-auto"
        style={{
          ...device,
        }}
      >
        <iframe
          ref={iframeRef}
          src={`/editor/${siteId}/${pageId}/pageview`}
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  );
}

export default WebViewer;
