import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusIcon } from "lucide-react";
import EditorElementsSidebar from "./sidebars/EditorElementsSidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

function AddItemToLayerButton({
  currElementId,
  showAdd,
}: {
  currElementId: string;
  showAdd: boolean;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onClick={(e) => e.stopPropagation()}
        className={cn("opacity-0", showAdd && "opacity-100")}
      >
        <div
          className="flex items-center z-10 -bottom-2 left-[50%] translate-x-[-50%] !absolute"
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
