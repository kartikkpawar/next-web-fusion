"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

function DraggableElement({
  title,
  type,
  category,
  subCategory,
}: {
  title: string;
  type: string;
  category: string;
  subCategory: string;
}) {
  const draggable = useDraggable({
    id: `element-${type}`,
    data: {
      title,
      type,
      isSidebarElement: true,
      category,
      subCategory,
    },
  });
  return (
    <Button
      ref={draggable.setNodeRef}
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

export default DraggableElement;
