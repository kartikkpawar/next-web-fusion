"use client";
import TooltipWrapper from "@/components/TooltipWrapper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { elements as elementsList } from "@/lib/elements/elements";
import { EditorElementsCollection } from "@/lib/types/global.types";
import { cn } from "@/lib/utils";
import {
  BoldIcon,
  ChevronRight,
  Code,
  FileInputIcon,
  ImageIcon,
  Layout,
  Link,
  List,
  MousePointer,
  PenTool,
  TypeIcon,
} from "lucide-react";
import { useMemo } from "react";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Text":
      return <TypeIcon className="h-4 w-4" />;
    case "Text Formatting":
      return <BoldIcon className="h-4 w-4" />;
    case "Navigation":
      return <Link className="h-4 w-4" />;
    case "Structure":
      return <List className="h-4 w-4" />;
    case "Media":
      return <ImageIcon className="h-4 w-4" />;
    case "Forms":
      return <FileInputIcon className="h-4 w-4" />;
    case "Layout":
      return <Layout className="h-4 w-4" />;
    case "Interactive":
      return <MousePointer className="h-4 w-4" />;
    case "Head":
      return <Code className="h-4 w-4" />;
    case "Graphics":
      return <PenTool className="h-4 w-4" />;
    default:
      return <ChevronRight className="h-4 w-4" />;
  }
};

function EditorElementsSidebar() {
  const groupedElements: EditorElementsCollection = useMemo(
    () =>
      elementsList.reduce<EditorElementsCollection>((acc, element) => {
        if (!acc[element.category]) {
          acc[element.category] = {
            elements: [],
          };
        }
        acc[element.category].elements.push(element);
        return acc;
      }, {}),
    []
  );

  return (
    <div className="overflow-hidden flex flex-col h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">HTML Tags</h2>
        <Accordion type="single" className="w-full" collapsible>
          {Object.entries(groupedElements).map(([category, { elements }]) => (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger className="text-sm">
                <div className="ml-2 flex w-full items-center">
                  <span className="">{getCategoryIcon(category)}</span>
                  <span className="w-full"> {category}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4 flex flex-col ">
                  {elements.map((element) => (
                    <TooltipWrapper
                      key={element.type}
                      hoverText={element.title}
                      side={"right"}
                    >
                      <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "w-full justify-start text-left font-normal"
                        )}
                      >
                        <code className="mr-2 text-xs">
                          &lt;{element.type}&gt;
                        </code>
                        {element.title}
                      </Button>
                    </TooltipWrapper>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default EditorElementsSidebar;
