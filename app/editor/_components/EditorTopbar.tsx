"use client";
import { updatePageData } from "@/actions/userPages.action";
import { useEditorToolbars } from "@/components/providers/EditorToolbarsProvider";
import { useElements } from "@/components/providers/ElementsProvider";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { devices } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { CheckIcon, Code, Eye } from "lucide-react";
import { toast } from "sonner";

function EditorTopbar({
  params,
}: {
  params: {
    pageId: string;
    siteId: string;
  };
}) {
  const { setTopbarDevice, topbarDevice } = useEditorToolbars();
  const { elements } = useElements();

  const updatePageMutation = useMutation({
    mutationFn: updatePageData,
    onSuccess: () => {
      toast.success("Page updated successfully", { id: "page-toast" });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong", {
        id: "page-toast",
      });
    },
  });

  return (
    <div className="w-full flex px-3 gap-5 border-b border-separate bg-[#181826] h-max py-2">
      <div className="flex mx-auto w-max gap-1">
        {devices.map((device) => (
          <div
            className={cn(
              " flex items-center justify-center w-max py-1 px-2 rounded-md",
              topbarDevice === device.key && "bg-primary"
            )}
            key={device.key}
            onClick={() => setTopbarDevice(device.key)}
          >
            <TooltipWrapper
              hoverText={device.tooltip}
              key={device.key}
              side="right"
            >
              <device.icon
                className={cn(
                  "mx-auto",
                  device?.iconClassName,
                  topbarDevice === device.key && "stroke-white"
                )}
                size={25}
              />
            </TooltipWrapper>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant={"outline"}
          onClick={() => {
            updatePageMutation.mutate({
              elements,
              pageId: params.pageId,
              siteId: params.siteId,
            });
          }}
        >
          <CheckIcon />
          Save
        </Button>
        <Button variant={"outline"}>
          <Eye />
          Preview
        </Button>
        <Button variant={"outline"}>
          <Code />
          Export
        </Button>
      </div>
    </div>
  );
}

export default EditorTopbar;
