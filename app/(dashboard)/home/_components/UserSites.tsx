import { getUserSites } from "@/actions/userSites.actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { AlertCircle, InboxIcon } from "lucide-react";
import Link from "next/link";
import CreateSiteButton from "./CreateSiteButton";
import SiteActions from "./SiteActions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STATUS } from "@/lib/types/global.types";

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

function getPagesText(pages: number) {
  switch (pages) {
    case 0:
      return "No Pages";
    case 1:
      return "1 Page";
    default:
      return `${pages} Pages`;
  }
}

async function UserSites() {
  const sites = await getUserSites();

  if (!sites) {
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again later
      </AlertDescription>
    </Alert>;
  }

  if (sites.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center mt-10">
        <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
          <InboxIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No site created yet</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first site
          </p>
        </div>
        <CreateSiteButton triggeredText="Create your first site" />
      </div>
    );
  }
  return (
    <div className="grid mt-10 grid-cols-3 gap-10">
      {sites.map((site) => (
        <Card key={site.id} className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg">{site.title}</CardTitle>
            <SiteActions
              siteDescription={site.description}
              siteId={site.id}
              siteTitle={site.title}
            />
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">{site.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <Badge
                className={`${getStatusColor(
                  site.status as STATUS
                )} text-white`}
              >
                {site.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {getPagesText(site.pages.length)}
              </span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="text-xs text-muted-foreground">
              By {site.createdBy}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatDistanceToNow(site.createdAt, { addSuffix: true })}
            </div>
          </CardFooter>
          <CardFooter>
            <Link href={`/site/${site.id}/pages`} className="w-full">
              <Button className="w-full">View Pages</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default UserSites;
