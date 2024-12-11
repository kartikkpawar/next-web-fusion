"use client";
import { getUserComponents } from "@/actions/userComponents";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import UserComponent from "../UserComponent";

function EditorComponentsSidebar() {
  const query = useQuery({
    queryKey: ["user-components"],
    queryFn: () => getUserComponents(),
  });
  // query.data
  return (
    <div className="flex flex-col gap-1">
      {query.data?.map((component) => (
        <UserComponent
          key={component.id}
          id={component.id}
          element={component.element}
          name={component.name}
        />
      ))}
    </div>
  );
}

export default EditorComponentsSidebar;
