"use client";
import { useEditorToolbars } from "@/components/providers/EditorToolbarsProvider";
import { useElements } from "@/components/providers/ElementsProvider";
import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import { devices } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  CheckIcon,
  CircleXIcon,
  Code,
  Eye,
  LifeBuoy,
  Loader2Icon,
} from "lucide-react";

function EditorTopbar({}: {
  params: {
    pageId: string;
    siteId: string;
  };
}) {
  const { setTopbarDevice, topbarDevice } = useEditorToolbars();
  const { elementsSaveStatus } = useElements();

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
              side="bottom"
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
        {elementsSaveStatus === "success" && (
          <TooltipWrapper hoverText="Saved Successfully">
            <CheckIcon className="stroke-green-500" />
          </TooltipWrapper>
        )}
        {elementsSaveStatus === "saving" && (
          <TooltipWrapper hoverText="Saving">
            <Loader2Icon className="animate-spin stroke-primary" />
          </TooltipWrapper>
        )}
        {elementsSaveStatus === "error" && (
          <TooltipWrapper hoverText="Unable to save">
            <CircleXIcon className="stroke-destructive" />
          </TooltipWrapper>
        )}
        {elementsSaveStatus === "idle" && (
          <TooltipWrapper hoverText="Data will be save automatically">
            <LifeBuoy className="stroke-primary" />
          </TooltipWrapper>
        )}

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
