"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditorElement } from "@/lib/types/global.types";
import { cn } from "@/lib/utils";
import {
  EllipsisVertical,
  Image,
  Layout,
  Square,
  Trash2Icon,
  Type,
} from "lucide-react";
import React, { useState } from "react";
import AddItemToLayerButton from "./AddItemToLayerButton";
import {
  DragEndEvent,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

const elementIcons = {
  Structure: Layout,
  Text: Type,
  "Text Formatting": Image,
  Button: Square,
  Forms: Layout,
};

type ElementCategory = keyof typeof elementIcons;

function LayerItem({
  element,
  depth,
}: {
  element: EditorElement;
  depth: number;
}) {
  const {
    setCurrentActiveElement,
    currentActiveElement,
    deleteElement,
    dndLayerItem,
  } = useElements();

  const [showAdd, setShowAdd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onRightClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };

  const Icon = elementIcons[element.category as ElementCategory] || Square;

  const draggable = useDraggable({
    id: element.id,
    data: {
      element,
      isLayerElement: true,
    },
  });
  const droppable = useDroppable({
    id: element.id,
    data: {
      isLayerDroppablElement: true,
      element,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isOverdroppingArea = over?.data?.current?.isLayerDroppablElement;
      if (isOverdroppingArea && over.id !== active.data.current?.element.id) {
        dndLayerItem({
          to: over.id as string,
          element: active.data.current?.element as EditorElement,
        });
      }
    },
  });

  return (
    <div ref={droppable.setNodeRef}>
      <Button
        onClick={() => {
          setCurrentActiveElement(element);
          setIsOpen((prev) => !prev);
        }}
        className={cn(
          "bg-transparent flex-row justify-start max-w-[260px] w-full relative hover:bg-primary/20 border border-transparent",
          currentActiveElement?.id === element.id &&
            "bg-primary hover:bg-primary",
          droppable.isOver &&
            currentActiveElement?.id === element.id &&
            "border-white",
          droppable.isOver &&
            currentActiveElement?.id !== element.id &&
            "border-primary"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onContextMenu={onRightClick}
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
        {...draggable.listeners}
        {...draggable.attributes}
        ref={draggable.setNodeRef}
      >
        <Icon size={16} />
        <span className="text-sm text-ellipsis w-full overflow-hidden text-left">
          {element.tag} {element.data && " - " + element.data}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
            <EllipsisVertical />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-max">
            <DropdownMenuItem onClick={() => deleteElement(element.id)}>
              <Trash2Icon /> Delete element
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AddItemToLayerButton currElementId={element.id} showAdd={showAdd} />
      </Button>

      {isOpen &&
        element.children?.map((childElement) => (
          <LayerItem
            depth={depth + 1}
            element={childElement}
            key={childElement.id}
          />
        ))}
    </div>
  );
}

export default LayerItem;
