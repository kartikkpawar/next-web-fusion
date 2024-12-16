// import "server-only";
import { EditorElement } from "../types/global.types";

function generateItemSourceHelper(data: EditorElement[], depth = 0) {
  const indent = "\t".repeat(depth); // Indentation based on depth
  const contentIndent = "\t".repeat(depth + 1); // Indentation based on depth
  return data
    .map((element) => {
      const { id, tag, className, data: textContent, children } = element;

      // Convert className array to a string
      const classString = className ? className.join(" ") : "";

      // Recursively handle children with increased depth
      const childrenString: string =
        children && children.length > 0
          ? `${generateItemSourceHelper(children, depth + 1)}${indent}`
          : "";

      // Determine content inside the tag
      const content =
        (textContent && `${contentIndent}${textContent.trim()}`) ||
        childrenString;

      // Create the JSX string with indentation
      return `${indent}<${tag} key="${id}" className="${classString}">\n${content}\n${indent}</${tag}>`;
    })
    .join("\n");
}

export function generateComponentSourceCode(data: EditorElement[]): string {
  return `export function Section() {
  return(
  ${generateItemSourceHelper(data, 1)}
    )
  }`;
}

// delete component
