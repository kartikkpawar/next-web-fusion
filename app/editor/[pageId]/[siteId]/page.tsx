"use client";
import React from "react";
import EditorTopbar from "../../_components/EditorTopbar";
import EditorSidebarSelector from "../../_components/EditorSidebarSelector";
import { useEditorToolbars } from "@/components/providers/EditorToolbarsProvider";
import EditorStructuresSidebar from "../../_components/sidebars/EditorStructuresSidebar";
import EditorComponentsSidebar from "../../_components/sidebars/EditorComponentsSidebar";
import EditorLayersSidebar from "../../_components/sidebars/EditorLayersSidebar";
import EditorGithubSidebar from "../../_components/sidebars/EditorGithubSidebar";

export default function EditorPage({}: {
  params: {
    pageId: string;
    siteId: string;
  };
}) {
  const { selectedSidebar } = useEditorToolbars();

  function renderSidebar() {
    switch (selectedSidebar) {
      case "structures":
        return <EditorStructuresSidebar />;
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
        <div className="bg-[#181826] w-[280px] p-1 h-full">
          {renderSidebar()}
        </div>
      </div>
    </div>
  );
}
