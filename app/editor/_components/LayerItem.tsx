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

function LayerItem({
  element,
  depth,
}: {
  element: EditorElement;
  depth: number;
}) {
  const { setCurrentActiveElement, currentActiveElement } = useElements();
  const Icon = elementIcons[element.category as ElementCategory] || Square;
  return (
    <Button
      onClick={() => setCurrentActiveElement(element)}
      className={cn(
        "bg-transparent flex-row justify-start max-w-[260px] w-full",
        currentActiveElement?.id === element.id && "bg-primary"
      )}
      style={{ paddingLeft: `${depth * 16 + 8}px` }}
    >
      <Icon size={16} />
      <span className="text-sm text-ellipsis w-full overflow-hidden text-left">
        {element.tag} - {element.data}
      </span>
    </Button>
  );
}

export default LayerItem;
