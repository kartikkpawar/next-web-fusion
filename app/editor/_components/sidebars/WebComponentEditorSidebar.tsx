"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import TailwindClassSearch from "@/components/TailwindClassSearch";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { XIcon } from "lucide-react";
import React from "react";

function WebComponentEditorSidebar() {
  const { currentActiveElement, updateElement } = useElements();

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
    console.log(classIndex);
    const filteredClasses = currentActiveElement.className?.toSpliced(
      classIndex!,
      1
    );
    updateElement(currentActiveElement?.id, {
      className: filteredClasses,
    });
  };

  return (
    currentActiveElement && (
      <div
        className="flex flex-col px-2 space-y-5 pt-2 h-full"
        key={currentActiveElement.id}
      >
        {(currentActiveElement?.data ||
          currentActiveElement?.subCategory === "Text") && (
          <Textarea
            rows={10}
            value={currentActiveElement.data}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
              updateElement(currentActiveElement.id, {
                data: event.target.value,
              })
            }
          />
        )}

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
      </div>
    )
  );
}

export default WebComponentEditorSidebar;
