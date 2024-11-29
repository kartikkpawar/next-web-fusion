import { LucideIcon } from "lucide-react";

export type DashboardSidebarRoutesType = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export enum STATUS {
  LIVE = "LIVE",
  DRAFT = "DRAFT",
  DISABLED = "DISABLED",
}

export type HtmlElement = {
  type: string;
  title: string;
  description?: string;
  category: string;
  subCategory: string;
};

export type HtmlElementsCollection = {
  [key: string]: {
    elements: HtmlElement[];
  };
};

export type EditorElement = {
  id: string;
  tag: string;
  className?: string;
  children?: EditorElement[];
  data?: string;
  subCategory: string;
  category: string;
};
