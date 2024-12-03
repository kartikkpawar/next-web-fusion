"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import LayerItem from "../LayerItem";

function EditorLayersSidebar({}: { pageId: string }) {
  const { elements } = useElements();

  return (
    <div className="flex flex-col gap-2">
      {elements.map((element) => (
        <LayerItem element={element} key={element.id} depth={0} from="" />
      ))}
    </div>
  );
}

export default EditorLayersSidebar;
