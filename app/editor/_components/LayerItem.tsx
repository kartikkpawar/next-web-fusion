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
import React from "react";

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
  const { setCurrentActiveElement, currentActiveElement, deleteElement } =
    useElements();
  const Icon = elementIcons[element.category as ElementCategory] || Square;

  const onRightClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };

  return (
    <Button
      onClick={() => setCurrentActiveElement(element)}
      className={cn(
        "bg-transparent flex-row justify-start max-w-[260px] w-full",
        currentActiveElement?.id === element.id && "bg-primary"
      )}
      style={{ paddingLeft: `${depth * 16 + 8}px` }}
      onContextMenu={onRightClick}
    >
      <Icon size={16} />
      <span className="text-sm text-ellipsis w-full overflow-hidden text-left">
        {element.tag} - {element.data}
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
    </Button>
  );
}

export default LayerItem;
