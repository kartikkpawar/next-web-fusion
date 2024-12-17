const pageBoiler = `import React from 'react'

export default function Page() {
  return (
    <div></div>
  )
}`;

import path from "path";
import fs from "fs-extra";

// create page
export function createPageFolder(siteId: string, slug: string) {
  const projectPath = path.join(
    __dirname,
    "../../../../../../../../",
    "next-web-fusion-temp",
    "projects",
    siteId
  );
  const pageFolderPath = path.join(projectPath, "app", slug);
  fs.mkdirSync(pageFolderPath);
  fs.writeFileSync(path.join(pageFolderPath, "page.tsx"), pageBoiler);
}

export function deletePageFolder(siteId: string, slug: string) {
  const projectPath = path.join(
    __dirname,
    "../../../../../../../../",
    "next-web-fusion-temp",
    "projects",
    siteId
  );
  const pageFolderPath = path.join(projectPath, "app", slug);
  fs.removeSync(pageFolderPath);
}

export function remanePageFolder(
  siteId: string,
  oldSlug: string,
  slug: string
) {
  const projectPath = path.join(
    __dirname,
    "../../../../../../../../",
    "next-web-fusion-temp",
    "projects",
    siteId
  );
  const pageFolderPath = path.join(projectPath, "app");
  fs.renameSync(
    path.join(pageFolderPath, oldSlug),
    path.join(pageFolderPath, slug)
  );
}

// update page