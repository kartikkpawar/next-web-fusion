"use server";
import prisma from "@/lib/prisma";
import { EditorElement } from "@/lib/types/global.types";
import { auth } from "@clerk/nextjs/server";

export async function saveAsComponent({
  element,
  name,
}: {
  element: Partial<EditorElement>;
  name: string;
}) {
  delete element?.id;
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not Authenticated");
  }
  await prisma.component.create({
    data: {
      element: JSON.stringify(element),
      userId,
      name,
    },
  });
}

export async function getUserComponents() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not Authenticated");
  }

  const components = await prisma.component.findMany({
    where: {
      userId,
    },
  });
  return components || [];
}

export async function deleteComponent(id: string) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Not Authenticated");
  }
  await prisma.component.delete({
    where: {
      userId,
      id,
    },
  });
}
