"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import { Button } from "@/components/ui/button";
import { EditorElement } from "@/lib/types/global.types";
import { cn } from "@/lib/utils";
import { Image, Layout, Square, Type } from "lucide-react";
import React from "react";

const elementIcons = {
  Structure: Layout,
  Text: Type,
  "Text Formatting": Image,
  Button: Square,
  Forms: Layout,
};

type ElementCategory = keyof typeof elementIcons;

function DraggableLayerItemOverlay({
  element,
  depth,
}: {
  element: EditorElement;
  depth: number;
}) {
  const { setCurrentActiveElement, currentActiveElement } = useElements();

  const onRightClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
  };

  const Icon = elementIcons[element.category as ElementCategory] || Square;

  return (
    <div>
      <Button
        onClick={() => setCurrentActiveElement(element)}
        className={cn(
          "bg-transparent flex-row justify-start max-w-[260px] w-full relative hover:bg-primary/90",
          currentActiveElement?.id === element.id &&
            "bg-primary hover:bg-primary"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onContextMenu={onRightClick}
      >
        <Icon size={16} />
        <span className="text-sm text-ellipsis w-full overflow-hidden text-left">
          {element.tag} {element.data && " - " + element.data}{" "}
        </span>
      </Button>
    </div>
  );
}

export default DraggableLayerItemOverlay;
