import { EditorElement } from "./types/global.types";
import { nanoid } from "nanoid";

export function waitFor(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function capitalizeFirstLetter(str: string) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isValidSlug(slug: string) {
  const regex = /^[a-z\-]+$/;
  return regex.test(slug);
}

export function generateSlug(title: string) {
  const titleSplit = title.toLowerCase().split(" ");
  return titleSplit.join("-");
}

export function contructElement(type: string): EditorElement {
  return {
    id: nanoid(5),
    tag: type,
  };
}
