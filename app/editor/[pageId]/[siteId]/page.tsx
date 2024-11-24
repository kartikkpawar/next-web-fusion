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

  return (
    <div className="flex h-screen">
      <EditorSidebarSelector />

      <div className="flex h-full flex-col w-full">
        <EditorTopbar />
        <div className="flex h-full m-2 gap-5">
          <ScrollArea className="bg-[#181826] w-[280px] p-2 h-full rounded-lg  border box-border">
            {renderSidebar()}
          </ScrollArea>
          <WebViewer />
        </div>
      </div>
    </div>
  );
}
