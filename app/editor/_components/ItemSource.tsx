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

import { generateComponentSourceCode } from "@/lib/codeGen/projectComponents";
import { Check, Code, Copy, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

function ItemSourcedialog() {
  const { currentActiveElement } = useElements();
  const [codeString, setcodeString] = useState("");
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (currentActiveElement) {
      const code = generateComponentSourceCode([currentActiveElement]);
      setcodeString(code);
    }
  }, [currentActiveElement]);
  return (
    <AlertDialog
      onOpenChange={(open) => {
        setCopied(false);
        setOpen(open);
      }}
      open={open}
    >
      <AlertDialogTrigger disabled={!currentActiveElement}>
        <Button variant={"outline"} disabled={!currentActiveElement}>
          <Code />
          View Source
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-screen-xl w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex w-full justify-between items-center">
              Code Snippet
              <AlertDialogCancel>
                <XIcon />
              </AlertDialogCancel>
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full max-w-screen-xl">
            <div className="w-full relative">
              <div>
                <div className="flex items-center gap-1 absolute top-2 right-2">
                  {copied ? (
                    <>
                      <Check size={18} />
                      Copied!
                    </>
                  ) : (
                    <Copy
                      size={20}
                      className="cursor-pointer"
                      onClick={() => {
                        navigator.clipboard
                          .writeText(codeString)
                          .then(() => {
                            setCopied(true);
                          })
                          .catch(() => {
                            toast.error("Unable to copy ", { id: "code-copy" });
                          });
                      }}
                    />
                  )}
                </div>
              </div>
              <SyntaxHighlighter
                language="jsx"
                style={atomDark}
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
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ItemSourcedialog;
