import { getPages } from "@/actions/userPages.action";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { STATUS } from "@/lib/types/global.types";
import { format, formatDistanceToNow } from "date-fns";
import { ImageIcon, InboxIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import PageActions from "./PageActions";
import CreatePageButton from "./CreatePageButton";

function getStatusColor(status: STATUS): string {
  switch (status) {
    case "LIVE":
      return "bg-green-500";
    case "DRAFT":
      return "bg-yellow-500";
    case "DISABLED":
      return "bg-gray-500";
    default:
      return "bg-blue-500";
  }
}

async function SitePages({ siteId }: { siteId: string }) {
  const pages = await getPages(siteId);

  if (pages.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center mt-10">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No page created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first page
          </p>
        </div>
        <CreatePageButton siteId={siteId} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5 mt-10">
      {pages.map((page) => (
        <Card key={page.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="truncate">{page.title}</CardTitle>
              <PageActions
                pageTitle={page.title}
                pageId={page.id}
                siteId={siteId}
                pageSlug={page.slug}
              />
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            {page.previewImage ? (
              <div className="mb-4 relative h-40 w-full">
                <Image
                  src={page.previewImage}
                  alt={`Preview of ${page.title}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ) : (
              <div className="mb-4 h-40 w-full flex items-center justify-center bg-muted rounded-md">
                <div className="text-center">
                  <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    No preview available
                  </p>
                </div>
              </div>
            )}
            <div className="flex items-center space-x-2 mb-2">
              <LinkIcon className="h-4 w-4 text-muted-foreground" />
              <Link
                href={`/${page.slug}`}
                className="text-base font-semibold hover:underline"
              >
                /{page.slug}
              </Link>
            </div>
            <div className="flex justify-between items-center mb-4">
              <Badge
                className={`${getStatusColor(
                  page.status as STATUS
                )} text-white px-3 py-1`}
              >
                {page.status}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              <div>
                <p className="font-semibold">Created:</p>
                <p>
                  {formatDistanceToNow(page.createdAt, { addSuffix: true })}
                </p>
              </div>
              <div>
                <p className="font-semibold">Last updated:</p>
                <p>{format(page.updatedAt, "PPP")}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link href={`/pages/${page.slug}`} className="w-full">
              <Button className="w-full">Page Editor</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default SitePages;
