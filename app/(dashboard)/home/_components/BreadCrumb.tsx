"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { dashboardSideBarRoutes } from "@/lib/data";
import { capitalizeFirstLetter } from "@/lib/helper";
import { usePathname } from "next/navigation";

import React, { Fragment, useCallback } from "react";

function BreadCrumb() {
  const pathname = usePathname();
  const splitPath = pathname.split("/");
  const routeDetails = useCallback((path: string) => {
    const activeRoute = dashboardSideBarRoutes.find(
      (route) => route.href === `/${path}`
    );
    return activeRoute?.label || null;
  }, []);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/home">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {splitPath.map((path) => {
          if (path === "" || path === "dashboard")
            return <Fragment key={""}></Fragment>;
          return (
            <Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {routeDetails(path) ? (
                  <BreadcrumbLink href={`/${path}`}>
                    {routeDetails(path)}
                  </BreadcrumbLink>
                ) : (
                  <span className="cursor-not-allowed">
                    {capitalizeFirstLetter(path)}
                  </span>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumb;
