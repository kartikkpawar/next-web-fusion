"use server";
import prisma from "@/lib/prisma";
import { EditorElement } from "@/lib/types/global.types";

export async function saveAsComponent(element: Partial<EditorElement>) {
  delete element?.id;
  await prisma.component.create({
    data: {
      element: JSON.stringify(element),
    },
  });
}
