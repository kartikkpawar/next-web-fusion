"use server";

import prisma from "@/lib/prisma";
import {
  createPageSchema,
  createPageSchemaType,
} from "@/lib/types/forms.types";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getPages(siteId: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not Authenticated");
  }

  return prisma.page.findMany({
    where: {
      userId,
      siteId,
    },
  });
}
export async function deletePage({
  id,
  siteId,
}: {
  id: string;
  siteId: string;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not Authenticated");
  }

  await prisma.page.delete({
    where: {
      id,
      userId,
      siteId,
    },
  });

  revalidatePath(`/site/${siteId}/pages`);
}

export async function createPage({
  siteId,
  formValues,
}: {
  siteId: string;
  formValues: createPageSchemaType;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not Authenticated");
  }

  const { success, data } = createPageSchema.safeParse(formValues);

  if (!success) {
    throw new Error("Invalid data");
  }

  const slugAlreadyExist = await prisma.page.findMany({
    where: {
      siteId,
      slug: data.slug,
    },
  });

  if (slugAlreadyExist && slugAlreadyExist.length > 0) {
    throw new Error("Page with same slug already exist");
  }

  return await prisma.page.create({
    data: {
      previewImage: null,
      slug: data.slug,
      title: data.title,
      userId,
      siteId,
    },
  });
}

export async function editPage({
  siteId,
  formValues,
  pageId,
}: {
  siteId: string;
  pageId: string;
  formValues: createPageSchemaType;
}) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not Authenticated");
  }

  const alreadyDeleted = await prisma.page.findUnique({
    where: {
      id: pageId,
      siteId,
      userId,
    },
  });
  if (!alreadyDeleted) {
    throw new Error("Page not found, Try again after sometime");
  }

  await prisma.page.update({
    where: {
      id: pageId,
      siteId,
      userId,
    },
    data: {
      ...formValues,
    },
  });
  revalidatePath(`/site/${siteId}/pages`);
}
