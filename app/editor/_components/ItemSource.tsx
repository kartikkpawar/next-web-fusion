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

function ItemSource() {
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
      <AlertDialogContent className="max-w-screen-lg w-full">
        <AlertDialogHeader>
          <AlertDialogTitle>
            <AlertDialogCancel className="self-end">Cancel</AlertDialogCancel>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div className="w-full"></div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ItemSource;
