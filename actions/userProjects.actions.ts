"use server";
import prisma from "@/lib/prisma";
import {
  createProjectSchema,
  createProjectSchemaType,
} from "@/lib/types/forms.types";
import { auth } from "@clerk/nextjs/server";

export async function createUserProject(formValues: createProjectSchemaType) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not Authenticated");
  }

  const { success, data } = createProjectSchema.safeParse(formValues);

  if (!success) {
    throw new Error("Invalid data");
  }

  const project = await prisma.projects.create({
    data: {
      userId,
      name: data.name,
      description: data.description,
    },
  });

  if (!project) {
    throw new Error("Unable to create project");
  }

  const page = prisma.page.create({
    data: {
      previewImage: null,
      name: "Home",
      slug: "/home",
      userId,
      projectId: project.id,
    },
  });

  if (!page) {
    throw new Error("Unable to create page");
  }
}
