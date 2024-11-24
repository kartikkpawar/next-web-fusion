import {
  BoxIcon,
  CirclePlusIcon,
  CreditCardIcon,
  GitMerge,
  HouseIcon,
  SendToBackIcon,
  Settings2Icon,
  SmartphoneIcon,
  TabletIcon,
  TvMinimalIcon,
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

export const devices = [
  {
    icon: TvMinimalIcon,
    tooltip: "Desktop",
    key: "desktop",
  },
  {
    icon: SmartphoneIcon,
    tooltip: "Smart Phone (Landscape)",
    key: "smartPhoneLandscape",
    iconClassName: "rotate-90",
  },
  {
    icon: TabletIcon,
    tooltip: "Tablet",
    key: "tablet",
  },
  {
    icon: SmartphoneIcon,
    tooltip: "Smart Phone (Vertical)",
    key: "smartPhoneVertical",
  },
];

export const sidebarSelectorMenu = [
  {
    icon: CirclePlusIcon,
    key: "elements",
    tooltip: "Add Element",
  },
  {
    icon: SendToBackIcon,
    key: "layers",
    tooltip: "Layers",
  },
  {
    icon: BoxIcon,
    key: "components",
    tooltip: "Add Components",
  },
  {
    icon: GitMerge,
    key: "git",
    tooltip: "Push to github",
  },
];
