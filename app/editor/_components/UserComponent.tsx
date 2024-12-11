"use client";
import { deleteComponent } from "@/actions/userComponents";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDraggable } from "@dnd-kit/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisVertical, Trash2Icon } from "lucide-react";
import { toast } from "sonner";

function UserComponent({
  name,
  element,
  id,
}: {
  name: string;
  element: string;
  id: string;
}) {
  const draggable = useDraggable({
    id,
    data: {
      element: JSON.parse(element),
      isComponent: true,
    },
  });

  const queryClient = useQueryClient();

  const deleteComponentMut = useMutation({
    mutationFn: deleteComponent,
    onSuccess: () => {
      toast.success("Successfully deleted component");
      queryClient.refetchQueries({ queryKey: ["user-components"] });
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });

  return (
    <Button
      className="max-w-[260px] w-full"
      {...draggable.listeners}
      {...draggable.attributes}
      ref={draggable.setNodeRef}
    >
      <span className="text-sm text-ellipsis w-full overflow-hidden text-left">
        {name}
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger onClick={(e) => e.stopPropagation()}>
          <EllipsisVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-max">
          <DropdownMenuItem onClick={() => deleteComponentMut.mutate(id)}>
            <Trash2Icon /> Delete component
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Button>
  );
}

export default UserComponent;
