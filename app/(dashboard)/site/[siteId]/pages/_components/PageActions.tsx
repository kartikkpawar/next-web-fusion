"use client";
import React, { Fragment, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVerticalIcon, Pencil, TrashIcon } from "lucide-react";
import DeletePageDialog from "./DeletePageDialog";
import EditPageDialog from "./EditPageDialog";

function PageActions({
  pageTitle,
  pageId,
  siteId,
  pageSlug,
}: {
  pageTitle: string;
  pageId: string;
  siteId: string;
  pageSlug: string;
}) {
  const [editSiteDialogOpen, setEditSiteDialogOpen] = useState(false);
  const [deleteSiteDialogOpen, setDeleteSiteDialogOpen] = useState(false);
  return (
    <Fragment>
      <DeletePageDialog
        open={deleteSiteDialogOpen}
        setOpen={setDeleteSiteDialogOpen}
        pageTitle={pageTitle}
        pageId={pageId}
        siteId={siteId}
      />
      <EditPageDialog
        open={editSiteDialogOpen}
        setOpen={setEditSiteDialogOpen}
        pageTitle={pageTitle}
        siteId={siteId}
        pageId={pageId}
        pageSlug={pageSlug}
      />
      <DropdownMenu>
        <DropdownMenuTrigger>
          <EllipsisVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setDeleteSiteDialogOpen(true);
              setEditSiteDialogOpen(false);
            }}
          >
            <TrashIcon size={18} />
            Delete
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              setDeleteSiteDialogOpen(false);
              setEditSiteDialogOpen(true);
            }}
          >
            <Pencil />
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Fragment>
  );
}

export default PageActions;
