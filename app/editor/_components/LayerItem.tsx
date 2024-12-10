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
import React, { Fragment, useState } from "react";
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
  index,
  parent,
}: {
  element: EditorElement;
  depth: number;
  index: number;
  parent: string;
}) {
  const {
    setCurrentActiveElement,
    currentActiveElement,
    deleteElement,
    dndLayerItem,
    dndInBetweenLayerItem,
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
      parent,
      index,
    },
  });
  const droppable = useDroppable({
    id: element.id,
    data: {
      isLayerDroppablElement: true,
      element,
    },
  });
  const droppableTop = useDroppable({
    id: element.id + "-top",
    data: {
      isTopDroppablElement: true,
      parent,
      index,
    },
  });
  const droppableBottom = useDroppable({
    id: element.id + "-bottom",
    data: {
      isBottomDroppablElement: true,
      parent,
      index,
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

      const isInBetweenDrop =
        over?.data?.current?.isTopDroppablElement ||
        over?.data?.current?.isBottomDroppablElement;
      if (isInBetweenDrop) {
        dndInBetweenLayerItem({
          element: active.data.current?.element,
          from: active.data.current?.parent,
          indexFrom: active.data.current?.index,
          indexTo: over.data.current?.index,
          to: over.data.current?.parent,
        });
      }
    },
  });

  return (
    <Fragment>
      {index === 0 && (
        <div
          className={cn(
            "w-full h-1 rounded-full bg-transparent",
            droppableTop.isOver &&
              droppableTop.active?.id !== element.id &&
              "bg-primary"
          )}
          ref={droppableTop.setNodeRef}
        />
      )}
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
          element.children?.map((childElement, childIndex) => (
            <LayerItem
              depth={depth + 1}
              element={childElement}
              key={childElement.id}
              index={childIndex}
              parent={element.id}
            />
          ))}
      </div>
      <div
        className={cn(
          "w-full h-1 rounded-full bg-transparent",
          droppableBottom.isOver &&
            droppableBottom.active?.id !== element.id &&
            "bg-primary"
        )}
        ref={droppableBottom.setNodeRef}
      />
    </Fragment>
  );
}

export default LayerItem;
