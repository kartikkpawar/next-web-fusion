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
        <Card key={site.id} className="flex flex-col rounded-xl">
          <CardHeader className="flex justify-between flex-row">
            <CardTitle className="w-full truncate">{site.title}</CardTitle>
            <SiteActions
              siteId={site.id}
              siteTitle={site.title}
              siteDescription={site.description}
            />
          </CardHeader>
          {site.description && (
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{site.description}</p>
            </CardContent>
          )}
          <CardFooter className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              By <span className="font-semibold">{site.createdBy}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNow(site.createdAt, { addSuffix: true })}
            </div>
          </CardFooter>
          <CardFooter>
            <Link href={`/home/${site.id}`} className="w-full">
              <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded">
                View Pages
              </button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default UserSites;
