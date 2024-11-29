import { useElements } from "@/components/providers/ElementsProvider";
import React from "react";
import LayerItem from "../LayerItem";

function EditorLayersSidebar() {
  const { elements } = useElements();
  return (
    <div className="flex flex-col gap-2">
      {elements.map((element) => (
        <LayerItem element={element} key={element.id} depth={0} />
      ))}
    </div>
  );
}

export default EditorLayersSidebar;
