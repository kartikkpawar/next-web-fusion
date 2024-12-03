"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import TailwindClassSearch from "@/components/TailwindClassSearch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { remToPx } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { parseClassString } from "@toddledev/tailwind-parser";
import { XIcon } from "lucide-react";
import React, { useState } from "react";

type BoxModelParams = "margin" | "border" | "padding";

function WebComponentEditorSidebar() {
  const { currentActiveElement, updateElement } = useElements();
  const { style } = parseClassString(cn(currentActiveElement?.className));

  const [boxStyleSelected, setBoxStyleSelected] =
    useState<BoxModelParams>("margin");

  const onValueChange = (value: string) => {
    const classIndex = currentActiveElement?.className?.findIndex(
      (className) => className === value
    );
    if (classIndex! > -1 || !currentActiveElement?.id) return;
    const eleClasses = currentActiveElement?.className
      ? [...currentActiveElement?.className, value]
      : [value];

    updateElement(currentActiveElement?.id, {
      className: eleClasses,
    });
  };

  const removeClassName = (value: string) => {
    const classIndex = currentActiveElement?.className?.findIndex(
      (className) => className === value
    );

    if (classIndex! === -1 || !currentActiveElement?.id) return;
    const filteredClasses = currentActiveElement.className?.toSpliced(
      classIndex!,
      1
    );
    updateElement(currentActiveElement?.id, {
      className: filteredClasses,
    });
  };

  const stylesGetter = (boxStyle: BoxModelParams) => {
    const styles = ["0", "0", "0", "0"];
    if (style[boxStyle]) {
      styles[0] = remToPx(style[boxStyle]);
      styles[1] = remToPx(style[boxStyle]);
      styles[2] = remToPx(style[boxStyle]);
      styles[3] = remToPx(style[boxStyle]);
    }
    if (style[`${boxStyle}-top`]) {
      styles[0] = remToPx(style[`${boxStyle}-top`]);
    }
    if (style[`${boxStyle}-right`]) {
      styles[1] = remToPx(style[`${boxStyle}-right`]);
    }
    if (style[`${boxStyle}-bottom`]) {
      styles[2] = remToPx(style[`${boxStyle}-bottom`]);
    }
    if (style[`${boxStyle}-left`]) {
      styles[3] = remToPx(style[`${boxStyle}-left`]);
    }
    return styles;
  };

  return (
    currentActiveElement && (
      <div
        className="flex flex-col px-2 space-y-5 pt-2 h-full"
        key={currentActiveElement.id}
      >
        {(currentActiveElement?.data ||
          currentActiveElement?.subCategory === "Text" ||
          currentActiveElement?.subCategory === "TextInput") && (
          <Textarea
            rows={5}
            value={currentActiveElement.data}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateElement(currentActiveElement.id, {
                data: event.target.value,
              })
            }
          />
        )}
        <Separator />
        <TailwindClassSearch
          onValueChange={onValueChange}
          classes={currentActiveElement.className || []}
        />
        <div className="flex flex-wrap gap-2">
          {currentActiveElement?.className?.map((className) => (
            <Badge key={className}>
              {className}{" "}
              <XIcon
                size={13}
                className="ml-2 cursor-pointer"
                onClick={() => removeClassName(className)}
              />
            </Badge>
          ))}
        </div>
        <Separator />
        <div className="flex mt-10 flex-col gap-3">
          <span className="text-sm">Box Model</span>
          {/* in case of rem convert to px and show */}
          <BoxModel
            mode="margin"
            selectedMode={boxStyleSelected}
            onSelect={(mode: BoxModelParams) => setBoxStyleSelected(mode)}
            values={stylesGetter("margin")}
          >
            <BoxModel
              mode="border"
              selectedMode={boxStyleSelected}
              onSelect={(mode: BoxModelParams) => setBoxStyleSelected(mode)}
              values={stylesGetter("border")}
            >
              <BoxModel
                mode="padding"
                selectedMode={boxStyleSelected}
                onSelect={(mode: BoxModelParams) => setBoxStyleSelected(mode)}
                values={stylesGetter("padding")}
              >
                <div className="w-full border px-3 py-1 rounded-md bg-muted text-center text-xs text-muted-foreground">
                  content
                </div>
              </BoxModel>
            </BoxModel>
          </BoxModel>
        </div>
      </div>
    )
  );
}

export default WebComponentEditorSidebar;

function BoxModel({
  children,
  selectedMode,
  onSelect,
  mode,
  values,
}: {
  children: React.ReactNode;
  selectedMode: BoxModelParams;
  onSelect: (mode: BoxModelParams) => void;
  mode: BoxModelParams;
  values?: string[];
}) {
  return (
    <div
      className={cn(
        "w-full p-5 px-6 rounded-md flex flex-col items-start border-dashed hover:cursor-pointer select-none relative box-border border-2",
        selectedMode === mode && "border-solid border-primary"
      )}
      onClick={(e) => {
        onSelect(mode);
        e.stopPropagation();
      }}
    >
      <span
        className={cn(
          "text-muted-foreground text-[8px] -mt-2 mb-2 -ml-3 block uppercase",
          selectedMode === mode && "text-primary"
        )}
      >
        {mode}
      </span>
      <span
        className={cn(
          "absolute top-3 right-[45%] text-[8px] text-muted-foreground",
          selectedMode === mode && "text-primary-foreground"
        )}
      >
        {values?.[0]}
      </span>
      <span
        className={cn(
          "absolute right-1 top-[45%] text-[8px] text-muted-foreground",
          selectedMode === mode && "text-primary-foreground"
        )}
      >
        {values?.[1]}
      </span>
      <span
        className={cn(
          "absolute bottom-1 right-[45%] text-[8px] text-muted-foreground",
          selectedMode === mode && "text-primary-foreground"
        )}
      >
        {values?.[2]}
      </span>
      <span
        className={cn(
          "absolute left-1 top-[45%] text-[8px] text-muted-foreground",
          selectedMode === mode && "text-primary-foreground"
        )}
      >
        {values?.[3]}
      </span>

      {children}
    </div>
  );
}
