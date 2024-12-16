"use server";
import { createProject, deleteProject } from "@/lib/codeGen/project";
import prisma from "@/lib/prisma";
import {
  createSiteSchema,
  createSiteSchemaType,
} from "@/lib/types/forms.types";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createUserSite(formValues: createSiteSchemaType) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Not Authenticated");
  }

  const { success, data } = createSiteSchema.safeParse(formValues);

  if (!success) {
    throw new Error("Invalid data");
  }

  const siteExists = await prisma.site.findFirst({
    where: {
      userId,
      title: data.title.trim(),
    },
  });

  if (siteExists) {
    throw new Error("Site with name already exist");
  }

  const site = await prisma.site.create({
    data: {
      userId,
      title: data.title.trim(),
      description: data.description,
      createdBy: (
        user?.fullName ||
        user?.firstName + " " + user?.lastName ||
        ""
      ).trim(),
    },
  });

  if (!site) {
    throw new Error("Unable to create Site");
  }

  await prisma.page.create({
    data: {
      previewImage: null,
      title: "Home",
      slug: "home",
      userId,
      siteId: site.id,
      createdBy: (
        user?.fullName ||
        user?.firstName + " " + user?.lastName ||
        ""
      ).trim(),
    },
  });

  createProject(site.id);

  redirect(`/site/${site.id}/pages`);
}

export async function getUserSites() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not Authenticated");
  }

  return prisma.site.findMany({
    where: {
      userId,
    },
    include: { pages: true },
  });
}

export async function deleteSite(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not Authenticated");
  }

  const siteExists = await prisma.site.findUnique({
    where: {
      userId,
      id,
    },
  });

  if (!siteExists) {
    throw new Error("Unable to find site, Please try again after some time");
  }

  await prisma.site.delete({
    where: {
      userId,
      id,
    },
  });

  deleteProject(id);

  revalidatePath("/home");
}

export async function editSite({
  id,
  formValues,
}: {
  id: string;
  formValues: createSiteSchemaType;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not Authenticated");
  }

  const siteExists = await prisma.site.findUnique({
    where: {
      userId,
      id,
    },
  });

  if (!siteExists) {
    throw new Error("Unable to find site, Please try again after some time");
  }

  await prisma.site.update({
    where: {
      id,
      userId,
    },
    data: {
      ...formValues,
    },
  });
  revalidatePath("/home");
}
