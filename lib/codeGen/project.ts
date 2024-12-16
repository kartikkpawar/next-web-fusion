import "server-only";
import fs from "fs-extra";
import path from "path";

export function createProject(siteId: string) {
  const templatePath = path.join(
    __dirname,
    "../../../../../../",
    "next-web-fusion-temp",
    "nextjs-template"
  );
  const newProjectPath = path.join(
    __dirname,
    "../../../../../../",
    "next-web-fusion-temp",
    "projects",
    siteId
  );
  fs.copySync(templatePath, newProjectPath);
}

export function deleteProject(siteId: string) {
  const projectPath = path.join(
    __dirname,
    "../../../../../../",
    "next-web-fusion-temp",
    "projects",
    siteId
  );
  fs.removeSync(projectPath);
}
