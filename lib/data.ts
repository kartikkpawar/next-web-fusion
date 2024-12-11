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
    tooltip: "Elements",
  },
  {
    icon: SendToBackIcon,
    key: "layers",
    tooltip: "Layers",
  },
  {
    icon: BoxIcon,
    key: "components",
    tooltip: "Components",
  },
  {
    icon: GitMerge,
    key: "git",
    tooltip: "Version control",
  },
];

export const deviceConfig: Record<
  string,
  { aspectRatio: string; maxWidth?: string; maxHeight?: string }
> = {
  desktop: {
    aspectRatio: (192 / 108).toFixed(2), // Standard Full HD aspect ratio (16:9)
    maxHeight: "100%",
  },
  smartPhoneLandscape: {
    aspectRatio: (812 / 375).toFixed(2), // Landscape aspect ratio for iPhone 14 Pro
    maxWidth: "812px",
  },
  tablet: {
    aspectRatio: (768 / 1024).toFixed(2), // Common tablet aspect ratio (3:4)
    maxWidth: "768px",
  },
  smartPhoneVertical: {
    aspectRatio: (375 / 812).toFixed(2), // Vertical aspect ratio for iPhone 14 Pro
    maxWidth: "375px",
  },
};
