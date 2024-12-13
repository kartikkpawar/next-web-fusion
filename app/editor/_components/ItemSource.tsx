"use client";
import { useElements } from "@/components/providers/ElementsProvider";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { generateComponentSourceCode } from "@/lib/codeGenration";
import { Code } from "lucide-react";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function ItemSourcedialog() {
  const { currentActiveElement } = useElements();
  const [codeString, setcodeString] = useState("");

  useEffect(() => {
    if (currentActiveElement) {
      const code = generateComponentSourceCode([currentActiveElement!]);
      setcodeString(code);
    }
  }, [currentActiveElement]);
  return (
    <AlertDialog>
      <AlertDialogTrigger disabled={!currentActiveElement}>
        <Button variant={"outline"} disabled={!currentActiveElement}>
          <Code />
          View Source
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-screen-xl w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <AlertDialogCancel className="self-end">Cancel</AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full max-w-screen-xl">
            <SyntaxHighlighter
              language="jsx"
              style={atomDark}
              showLineNumbers
              wrapLongLines={true}
              wrapLines={true}
              codeTagProps={{
                style: {
                  boxSizing: "border-box",
                  textWrap: "wrap",
                },
              }}
            >
              {codeString}
            </SyntaxHighlighter>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ItemSourcedialog;
