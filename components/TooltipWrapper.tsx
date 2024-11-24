import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import React from "react";

export default function TooltipWrapper({
  children,
  className,
  textClassName,
  hoverText,
  side,
}: {
  children: React.ReactNode;
  className?: string;
  textClassName?: string;
  hoverText: string;
  side?: "bottom" | "top" | "right" | "left" | undefined;
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger className={cn("", className)}>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p className={cn("", textClassName)}>
            {hoverText}
            {side}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
