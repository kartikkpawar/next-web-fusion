import {
  CreditCardIcon,
  HouseIcon,
  Settings2Icon,
  Users2Icon,
} from "lucide-react";
import { DashboardSidebarRoutesType } from "./types/globaltypes";

export const dashboardSideBarRoutes: DashboardSidebarRoutesType[] = [
  {
    href: "/dashboard",
    label: "Home",
    icon: HouseIcon,
  },
  {
    href: "/dashboard/teams",
    label: "Teams",
    icon: Users2Icon,
  },
  {
    href: "/dashboard/billing",
    label: "Billing",
    icon: CreditCardIcon,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings2Icon,
  },
];
