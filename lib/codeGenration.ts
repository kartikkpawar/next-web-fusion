// import "server-only";
import { EditorElement } from "./types/global.types";

function generateItemSourceHelper(data: EditorElement[], depth = 0) {
  const indent = "\t".repeat(depth);
  return data
    .map((element) => {
      const { id, tag, className, data: textContent, children } = element;

      const classString = className ? className.join(" ") : "";

      const childrenString: string =
        children && children.length > 0
          ? `\n${generateItemSourceHelper(children, depth + 1)}\n${indent}`
          : "";

      const content = textContent?.trim() || childrenString;

      return `${indent}<${tag} key="${id}" className="${classString}">${content}</${tag}>`;
    })
    .join("\n");
}

export function generateComponentSourceCode(data: EditorElement[]): string {
  return `export function Section() {\n\treturn(\n\t\t${generateItemSourceHelper(
    data,
    0
  )}\n\t)}`;
}
