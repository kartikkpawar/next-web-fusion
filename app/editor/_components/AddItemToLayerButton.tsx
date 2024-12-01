import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import EditorElementsSidebar from "./sidebars/EditorElementsSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

function AddItemToLayerButton({ currElementId }: { currElementId: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
        <div
          className="-bottom-2 left-[50%] translate-x-[-50%] !absolute border flex items-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <PlusIcon
            className="bg-white rounded-full text-primary mx-auto -mt-2 border border-muted-foreground cursor-pointer "
            size={20}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[250px]">
        <ScrollArea className="h-96">
          <EditorElementsSidebar
            isNotDraggable={true}
            currElementId={currElementId}
          />
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AddItemToLayerButton;
