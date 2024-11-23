import { Suspense } from "react";
import CreatePageButton from "./_components/CreatePageButton";
import SitePages from "./_components/SitePages";
import SkeletonLoader from "@/components/SkeletonLoader";

async function SitePage({
  params,
}: {
  params: {
    siteId: string;
  };
}) {
  return (
    <div className="pt-5 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Pages</h1>
          <span className="text-muted-foreground">Manage your pages</span>
        </div>
        <CreatePageButton siteId={params.siteId} />
      </div>
      <Suspense fallback={<SkeletonLoader length={3} />}>
        <SitePages siteId={params.siteId} />
      </Suspense>
    </div>
  );
}

export default SitePage;
