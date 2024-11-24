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

export type EditorElement = {
  type: string;
  title: string;
  description?: string;
  category: string;
};

export type EditorElementsCollection = {
  [key: string]: {
    elements: EditorElement[];
  };
};
