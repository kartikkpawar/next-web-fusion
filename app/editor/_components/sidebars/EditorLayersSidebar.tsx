"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import LayerItem from "../LayerItem";

function EditorLayersSidebar({}: { pageId: string }) {
  const { elements } = useElements();

  return (
    <div className="flex flex-col gap-1">
      {elements.map((element, index) => (
        <LayerItem
          element={element}
          key={element.id}
          depth={0}
          index={index}
          parent="body"
        />
      ))}
    </div>
  );
}

export default EditorLayersSidebar;
