"use server";
import prisma from "@/lib/prisma";
import {
  createSiteSchema,
  createSiteSchemaType,
} from "@/lib/types/forms.types";
import { auth, currentUser } from "@clerk/nextjs/server";

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

  const SiteExists = await prisma.site.findFirst({
    where: {
      userId,
      title: data.name.trim(),
    },
  });

  if (SiteExists) {
    throw new Error("Site with name already exist");
  }

  const site = await prisma.site.create({
    data: {
      userId,
      title: data.name.trim(),
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

  return prisma.page.create({
    data: {
      previewImage: null,
      title: "Home",
      slug: "/home",
      userId,
      siteId: site.id,
      createdBy: (
        user?.fullName ||
        user?.firstName + " " + user?.lastName ||
        ""
      ).trim(),
    },
  });

  // redirect(`/Sites//${result.id}`);
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
  });
}
