"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

function WebComponentEditorSidebar() {
  const { currentActiveElement, updateElement } = useElements();
  return (
    <div className="flex flex-col px-2 space-y-5 pt-2 h-full">
      {(currentActiveElement?.data ||
        currentActiveElement?.subCategory === "Text") && (
        <Textarea
          rows={10}
          value={currentActiveElement.data}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateElement(currentActiveElement.id, { data: event.target.value })
          }
        />
      )}
    </div>
  );
}

export default WebComponentEditorSidebar;
