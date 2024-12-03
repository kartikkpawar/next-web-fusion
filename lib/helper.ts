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

export function contructElement({
  elementType,
  elementCategory,
  elementSubCategory,
}: {
  elementType: string;
  elementCategory: string;
  elementSubCategory: string;
}): EditorElement {
  return {
    id: nanoid(5),
    tag: elementType,
    category: elementCategory,
    subCategory: elementSubCategory,
    className: [],
    children: [],
  };
}

export function remToPx(value: string) {
  const isRemVal = value.endsWith("rem");
  const remVal = value.split("rem")[0];
  if (!isRemVal) {
    const isPxVal = value.endsWith("px");
    if (isPxVal) return value.split("px")[0];
    return value;
  }

  if (isNaN(parseFloat(remVal))) return value;
  return (parseFloat(remVal) * 16).toString();
}
