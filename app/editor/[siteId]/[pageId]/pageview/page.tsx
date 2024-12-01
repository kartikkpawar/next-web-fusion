"use client";

import { getPageElements } from "@/actions/userPages.action";
import RenderElement from "@/lib/elements/RenderElement";
import { EditorElement } from "@/lib/types/global.types";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

export default function Pageview({
  params,
}: {
  params: {
    pageId: string;
    siteId: string;
  };
}) {
  const data = useQuery({
    queryKey: ["page-data", params.pageId],
    queryFn: () => getPageElements(params.pageId),
  });
  const [elements, setElements] = useState<EditorElement[]>([]);

  const parsedElements = useMemo(() => {
    try {
      return data.data && data.data.elements
        ? JSON.parse(data.data.elements)
        : [];
    } catch (error) {
      console.error("Error parsing elements:", error);
      return [];
    }
  }, [data.data]);

  useEffect(() => {
    if (parsedElements && parsedElements.length > 0) {
      setElements(parsedElements);
    }
  }, [parsedElements]);

  const onMessage = useCallback((event: MessageEvent) => {
    const { type, data } = event.data;
    if (type === "elementsUpdated") {
      setElements(data);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [onMessage]);

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

    const onMessage = (event: MessageEvent) => {
      const { type, data } = event.data;
      if (type === "elementsUpdated") {
        setElements(data);
      }
    };
    window.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("message", onMessage);
    };
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
