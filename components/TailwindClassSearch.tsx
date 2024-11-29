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

type TailwindSuggestion = {
  class: string;
  category: string;
  description: string;
};

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
    const suggestedClasses: TailwindSuggestion[] = [];
    const searchQuery = classSearchString.toLowerCase();
    Object.entries(tailwindClasses).forEach(([category, classes]) => {
      classes.forEach(({ class: className, description }) => {
        if (
          className.toLowerCase().includes(searchQuery) ||
          description.toLowerCase().includes(searchQuery)
        ) {
          suggestedClasses.push({
            class: className,
            category,
            description,
          });
        }
      });
    });
    return suggestedClasses;
  }, [classSearchString]);

  const addClass = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      onValueChange(selectedClass);
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
          {classSearchString && <CommandEmpty>No results found.</CommandEmpty>}
          {classSearchString &&
            handleSearch().map((classname) => (
              <CommandItem
                key={classname.class}
                disabled={classes.includes(classname.class)}
              >
                {classname.class}
              </CommandItem>
            ))}
        </CommandList>
      </Command>
    </div>
  );
}

export default TailwindClassSearch;
