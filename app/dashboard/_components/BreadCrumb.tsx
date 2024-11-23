"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { dashboardSideBarRoutes } from "@/lib/data";
import { usePathname } from "next/navigation";

import React, { Fragment, useCallback } from "react";

function BreadCrumb() {
  const pathname = usePathname();
  const splitPath = pathname.split("/");
  const routeDetails = useCallback((path: string) => {
    const activeRoute = dashboardSideBarRoutes.find(
      (route) => route.href === `/${path}`
    );
    return activeRoute?.label;
  }, []);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>

        {splitPath.map((path) => {
          if (path === "" || path === "dashboard") return <></>;
          return (
            <Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/${path}`}>
                  {routeDetails(path)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumb;
