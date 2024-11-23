import {
  CreditCardIcon,
  HouseIcon,
  Settings2Icon,
  Users2Icon,
} from "lucide-react";
import { DashboardSidebarRoutesType } from "./types/global.types";

export const dashboardSideBarRoutes: DashboardSidebarRoutesType[] = [
  {
    href: "/home",
    label: "Home",
    icon: HouseIcon,
  },
  {
    href: "/teams",
    label: "Teams",
    icon: Users2Icon,
  },
  {
    href: "/billing",
    label: "Billing",
    icon: CreditCardIcon,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings2Icon,
  },
];
