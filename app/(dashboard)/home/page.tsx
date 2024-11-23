import { Suspense } from "react";
import SkeletonLoader from "../../../components/SkeletonLoader";
import CreateSiteButton from "./_components/CreateSiteButton";
import UserSites from "./_components/UserSites";

export default function DashboardHome() {
  return (
    <div className="pt-5 flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Sites</h1>
          <span className="text-muted-foreground">Manage your sites</span>
        </div>
        <CreateSiteButton />
      </div>
      <Suspense fallback={<SkeletonLoader />}>
        <UserSites />
      </Suspense>
    </div>
  );
}
