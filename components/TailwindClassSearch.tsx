"use client";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { tailwindClasses } from "@/lib/editorTailwind/tailwindClasses";
import { useCallback, useState } from "react";

function TailwindClassSearch({
  onValueChange,
  classes,
}: {
  onValueChange: (value: string) => void;
  classes: string[];
}) {
  const [classSearchString, setClassSearchString] = useState("");
  const [selectedClass, setSelectedClass] = useState("");

  const handleSearch = useCallback(() => {
    const suggestedClasses: string[] = [];
    const searchQuery = classSearchString.toLowerCase();

    tailwindClasses.forEach((className) => {
      if (className.includes(searchQuery)) {
        suggestedClasses.push(className);
      }
    });

    return suggestedClasses;
  }, [classSearchString]);

  const addClass = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      if (!selectedClass) {
        onValueChange(classSearchString);
        setClassSearchString("");
        return;
      }
      onValueChange(selectedClass);
      setClassSearchString("");
    }
    if (event.key === "Escape") {
      setClassSearchString("");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="pl-2 text-sm">Add Classes</span>
      <Command
        className="focus-within:ring-0"
        value={selectedClass}
        onValueChange={(value) => setSelectedClass(value)}
        onKeyDown={addClass}
      >
        <CommandInput
          className="rounded-lg"
          placeholder="Search Classes..."
          value={classSearchString}
          onValueChange={(value) => setClassSearchString(value)}
        />
        <CommandList>
          {classSearchString && (
            <CommandEmpty>Press enter to add the cutom class</CommandEmpty>
          )}
          {classSearchString &&
            handleSearch().map((classname) => (
              <CommandItem
                disabled={classes.includes(classname)}
                key={classname}
              >
                <div
                  onClick={() => {
                    setClassSearchString("");
                    onValueChange(classname);
                  }}
                  className="w-full"
                >
                  {classname}
                </div>
              </CommandItem>
            ))}
        </CommandList>
      </Command>
    </div>
  );
}

export default TailwindClassSearch;
