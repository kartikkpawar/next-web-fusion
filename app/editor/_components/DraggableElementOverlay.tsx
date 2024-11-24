"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

function DraggableElementOverlay({
  title,
  type,
}: {
  title: string;
  type: string;
}) {
  const draggable = useDraggable({
    id: `element-${type}`,
    data: {
      title,
      type,
    },
  });
  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("w-full justify-start text-left font-normal")}
      {...draggable.listeners}
      {...draggable.attributes}
    >
      <code className="mr-2 text-xs">&lt;{type}&gt;</code>
      {title}
    </Button>
  );
}

export default DraggableElementOverlay;
