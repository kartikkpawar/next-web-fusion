"use client";
import { contructElement } from "@/lib/helper";
import { EditorElement } from "@/lib/types/global.types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ElementProviderProps {
  children: React.ReactNode;
}

type ElementProviderDataType = {
  addElement: (elementType: string) => void;
  elements: EditorElement[];
};

export const EditorContext = createContext<ElementProviderDataType>({
  addElement: () => {},
  elements: [],
});

const ElementsProvider: React.FC<ElementProviderProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [elements, setElements] = useState<EditorElement[]>([]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const addElement = (elementType: string) => {
    const element = contructElement(elementType);
    setElements((prev) => [...prev, element]);
  };

  return (
    <EditorContext.Provider
      value={{
        elements,
        addElement,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useElements = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useElements must be used within ElementsProvider");
  }
  return context;
};

export default ElementsProvider;
