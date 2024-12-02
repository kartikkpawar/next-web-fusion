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

  const [showAdd, setShowAdd] = useState(true);

  const onRightClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };

  const Icon = elementIcons[element.category as ElementCategory] || Square;

  return (
    <div>
      <Button
        onClick={() => setCurrentActiveElement(element)}
        className={cn(
          "bg-transparent flex-row justify-start max-w-[260px] w-full relative hover:bg-primary/20",
          currentActiveElement?.id === element.id &&
            "bg-primary hover:bg-primary"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onContextMenu={onRightClick}
        onMouseEnter={() => setShowAdd(true)}
        onMouseLeave={() => setShowAdd(false)}
      >
        <Icon size={16} />
        <span className="text-sm text-ellipsis w-full overflow-hidden text-left">
          {element.tag} {element.data && " - " + element.data}{" "}
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

      {element.children?.map((element) => (
        <LayerItem depth={depth + 1} element={element} key={element.id} />
      ))}
    </div>
  );
}

export default LayerItem;
