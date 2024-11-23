"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deletePage } from "@/actions/userPages.action";

function DeletePageDialog({
  open,
  setOpen,
  pageTitle,
  pageId,
  siteId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  pageTitle: string;
  pageId: string;
  siteId: string;
}) {
  const [confirmText, setConfirmText] = useState("");

  const mutation = useMutation({
    mutationFn: deletePage,
    onSuccess: () => {
      toast.success("Page deleted successfully", {
        id: `delete-site-${pageId}`,
      });
      setOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong", {
        id: `delete-site-${pageId}`,
      });
    },
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            If you delete this site, you will not be able to recover it.
            <div className="flex flex-col py-4 gap-2">
              <p>
                If you are sure, enter <b>{pageTitle}</b> to confirm.
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText("")}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== pageTitle || mutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              toast.loading("Deleting page...", {
                id: `delete-site-${pageId}`,
              });
              mutation.mutate({
                id: pageId,
                siteId,
              });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletePageDialog;
