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
import DeleteSiteDialog from "./DeleteSiteDialog";
import EditSiteDialog from "./EditSiteDialog";

function SiteActions({
  siteTitle,
  siteId,
  siteDescription,
}: {
  siteTitle: string;
  siteId: string;
  siteDescription: string | null;
}) {
  const [editSiteDialogOpen, setEditSiteDialogOpen] = useState(false);
  const [deleteSiteDialogOpen, setDeleteSiteDialogOpen] = useState(false);
  return (
    <Fragment>
      <DeleteSiteDialog
        open={deleteSiteDialogOpen}
        setOpen={setDeleteSiteDialogOpen}
        siteTitle={siteTitle}
        siteId={siteId}
      />
      <EditSiteDialog
        open={editSiteDialogOpen}
        setOpen={setEditSiteDialogOpen}
        siteTitle={siteTitle}
        siteId={siteId}
        siteDescription={siteDescription}
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

export default SiteActions;
