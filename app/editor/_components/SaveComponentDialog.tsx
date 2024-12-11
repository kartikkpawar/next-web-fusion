import { saveAsComponent } from "@/actions/userComponents";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { EditorElement } from "@/lib/types/global.types";
import { useMutation } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function SaveComponentDialog({
  open,
  onClose,
  element,
}: {
  open: boolean;
  onClose: (open: boolean) => void;
  element: EditorElement;
}) {
  const saveAsComponentMutaion = useMutation({
    mutationFn: saveAsComponent,
    onSuccess: () => {
      toast.success("Successfully saved as component");
      setComponentName("");
      onClose(false);
    },
    onError: () => {
      toast.error("Something went wrong");
      setComponentName("");
      onClose(false);
    },
  });

  const [componentName, setComponentName] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Component name</DialogTitle>
          <DialogDescription className="flex flex-col gap-5 pt-5">
            <Input
              onChange={(e) => setComponentName(e.target.value)}
              value={componentName}
              placeholder="Enter Component name"
            />
            <Button
              disabled={
                componentName.length === 0 ||
                !componentName ||
                saveAsComponentMutaion.isPending
              }
              onClick={() => {
                saveAsComponentMutaion.mutate({
                  element,
                  name: componentName,
                });
              }}
            >
              <Save /> Save
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SaveComponentDialog;
