"use client";
import { updatePageData } from "@/actions/userPages.action";
import { useElements } from "@/components/providers/ElementsProvider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import useDebounce from "@/hooks/use-debounce";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CopyIcon, UploadCloud } from "lucide-react";

import React, { useState } from "react";
import { toast } from "sonner";

function PublicPreviewDialog({
  pageId,
  siteId,
}: {
  pageId: string;
  siteId: string;
}) {
  const previewUrl = `${process.env.NEXT_PUBLIC_APP_URL}/preview/${siteId}?page=${pageId}`;
  const queryClient = useQueryClient();
  const { pagePreviewStatus } = useElements();

  const updateDataMutation = useMutation({
    mutationFn: updatePageData,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["page-data", pageId] });
      toast.success("Update successfully", { id: "public-preview" });
    },
    onError: () => {
      toast.error("Unable to update status", { id: "public-preview" });
    },
  });

  const [isPublicPreview, setIsPublicPreview] = useState(pagePreviewStatus);
  const saveDebounce = useDebounce(updateDataMutation.mutate, 800);

  const onValueChange = (value: boolean) => {
    setIsPublicPreview(value);
    saveDebounce({
      data: {
        publicPreview: value,
      },
      pageId,
      siteId,
    });
  };

  const copyUrl = () => {
    navigator.clipboard
      .writeText(previewUrl)
      .then(() => {
        toast.success("URL Copied successfully", { id: "url-copy" });
      })
      .catch(() => {
        toast.error("Unable to copy url", { id: "url-copy" });
      });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button size={"icon"} variant={"outline"}>
          <UploadCloud />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Public Preview</DialogTitle>
          <DialogDescription>
            <div className="flex">
              <span>
                Anyone with the link can view the preview of this project. Only
                you will be able to edit it.
              </span>
              <Switch
                onCheckedChange={onValueChange}
                checked={isPublicPreview}
              />
            </div>
            {isPublicPreview && (
              <div className="mt-5 flex items-center gap-3">
                <Input value={previewUrl} disabled className="cursor-none" />
                <CopyIcon
                  size={24}
                  className="cursor-pointer"
                  onClick={copyUrl}
                />
              </div>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default PublicPreviewDialog;
