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
import { deleteSite } from "@/actions/userSites.actions";

function DeleteSiteDialog({
  open,
  setOpen,
  siteTitle,
  siteId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  siteTitle: string;
  siteId: string;
}) {
  const [confirmText, setConfirmText] = useState("");

  const mutation = useMutation({
    mutationFn: deleteSite,
    onSuccess: () => {
      toast.success("Site deleted successfully", {
        id: `delete-site-${siteId}`,
      });
      setOpen(false);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Something went wrong", {
        id: `delete-site-${siteId}`,
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
                If you are sure, enter <b>{siteTitle}</b> to confirm.
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
            disabled={confirmText !== siteTitle || mutation.isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            onClick={() => {
              toast.loading("Deleting site...", {
                id: `delete-site-${siteId}`,
              });
              mutation.mutate(siteId);
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteSiteDialog;
