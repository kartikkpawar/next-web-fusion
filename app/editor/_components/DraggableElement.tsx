"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

function DraggableElement({
  title,
  type,
  category,
  subCategory,
  isNotDraggable,
  currElementId,
}: {
  title: string;
  type: string;
  category: string;
  subCategory: string;
  isNotDraggable?: boolean;
  currElementId?: string;
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

  const { addElement } = useElements();

  let draggableProps = {
    dl: { ...draggable.listeners },
    da: { ...draggable.attributes },
  };
  if (isNotDraggable) {
    draggableProps = {
      dl: {},
      da: {},
    };
  }

  const addElementHelper = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currElementId && isNotDraggable) {
      addElement({
        elementType: type,
        elementCategory: category,
        elementSubCategory: subCategory,
        addTo: currElementId,
      });
    }
  };

  return (
    <Button
      ref={draggable.setNodeRef}
      variant="ghost"
      size="sm"
      className={cn("w-full justify-start text-left font-normal")}
      {...draggableProps.dl}
      {...draggableProps.da}
      onClick={addElementHelper}
    >
      <code className="mr-2 text-xs">&lt;{type}&gt;</code>
      {title}
    </Button>
  );
}

export default DraggableElement;
