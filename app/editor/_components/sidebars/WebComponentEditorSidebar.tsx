"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import TailwindClassSearch from "@/components/TailwindClassSearch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { remToPx } from "@/lib/helper";
import { BoxModelParams } from "@/lib/types/global.types";
import { cn } from "@/lib/utils";
import { parseClassString } from "@toddledev/tailwind-parser";
import { XIcon } from "lucide-react";
import React, { useState } from "react";
import BoxModel from "../BoxModel";

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
            <Badge key={className} className="bg-primary/20 text-foreground">
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
          <BoxModel
            mode="margin"
            selectedMode={boxStyleSelected}
            onSelect={(mode: BoxModelParams) => setBoxStyleSelected(mode)}
            values={stylesGetter("margin")}
          >
            <BoxModel
              mode="border-width"
              selectedMode={boxStyleSelected}
              onSelect={(mode: BoxModelParams) => setBoxStyleSelected(mode)}
              values={stylesGetter("border-width")}
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
