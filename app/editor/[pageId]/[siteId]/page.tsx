"use client";
import React from "react";
import EditorTopbar from "../../_components/EditorTopbar";
import EditorSidebarSelector from "../../_components/EditorSidebarSelector";
import { useEditorToolbars } from "@/components/providers/EditorToolbarsProvider";
import EditorElementsSidebar from "../../_components/sidebars/EditorElementsSidebar";
import EditorComponentsSidebar from "../../_components/sidebars/EditorComponentsSidebar";
import EditorLayersSidebar from "../../_components/sidebars/EditorLayersSidebar";
import EditorGithubSidebar from "../../_components/sidebars/EditorGithubSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import WebViewer from "../../_components/WebViewer";
import WebComponentEditorSidebar from "../../_components/sidebars/WebComponentEditorSidebar";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import DragOverlayWrapper from "../../_components/DragOverlayWrapper";

export default function EditorPage({}: {
  params: {
    pageId: string;
    siteId: string;
  };
}) {
  const { selectedSidebar } = useEditorToolbars();

  function renderSidebar() {
    switch (selectedSidebar) {
      case "elements":
        return <EditorElementsSidebar />;
      case "layers":
        return <EditorComponentsSidebar />;
      case "components":
        return <EditorLayersSidebar />;
      case "git":
        return <EditorGithubSidebar />;

      default:
        break;
    }
  }

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 300,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
      <div className="flex h-screen">
        <EditorSidebarSelector />
        <div className="flex h-full flex-col w-full">
          <EditorTopbar />
          <div className="flex h-full m-2 gap-5 overflow-hidden">
            <ScrollArea className="bg-[#181826] w-[280px] p-2 h-full rounded-lg  border box-border">
              {renderSidebar()}
            </ScrollArea>
            <WebViewer />
            <ScrollArea className="bg-[#181826] w-[280px] p-2 h-full rounded-lg  border box-border">
              <WebComponentEditorSidebar />
            </ScrollArea>
          </div>
        </div>
      </div>
      <DragOverlayWrapper />
    </DndContext>
  );
}
