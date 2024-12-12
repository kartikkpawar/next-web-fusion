"use client";

import { getPageElementsPreview } from "@/actions/userPages.action";
import RenderElement from "@/lib/elements/RenderElement";
import { EditorElement } from "@/lib/types/global.types";
import { useQuery } from "@tanstack/react-query";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Pageview({
  params,
}: {
  params: {
    siteId: string;
  };
}) {
  const searchParams = useSearchParams();
  const pageId = searchParams.get("page");
  if (!pageId) redirect(`/site/${params.siteId}/pages`);

  const data = useQuery({
    queryKey: ["page-data", pageId],
    queryFn: () => getPageElementsPreview(pageId),
  });
  const [elements, setElements] = useState<EditorElement[]>([]);

  useEffect(() => {
    if (data.data && data.data.elements) {
      try {
        const parsedElements = JSON.parse(
          data.data.elements
        ) as EditorElement[];
        if (parsedElements) {
          setElements(parsedElements);
        }
      } catch (error) {
        console.error("Error parsing elements:", error);
      }
    }
  }, [data.data]);

  if (!data.data) {
    return;
  }

  return (
    <html>
      <head>
        <script src="https://cdn.tailwindcss.com/3.4.1" async />
      </head>
      <body>
        {elements.map((element) => (
          <RenderElement element={element} key={element.id} />
        ))}
      </body>
    </html>
  );
}
