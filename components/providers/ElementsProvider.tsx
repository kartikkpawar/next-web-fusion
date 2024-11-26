"use client";
import { contructElement } from "@/lib/helper";
import { EditorElement } from "@/lib/types/global.types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ElementProviderProps {
  children: React.ReactNode;
}

type ElementProviderDataType = {
  addElement: (elementType: string) => void;
  saveElements: () => void;
  updateElement: (elementId: string, data: Partial<EditorElement>) => void;
  setCurrentActiveElement: (element: EditorElement) => void;
  elements: EditorElement[];
  currentActiveElement: string;
};

export const EditorContext = createContext<ElementProviderDataType>({
  addElement: () => {},
  saveElements: () => {},
  updateElement: () => {},
  setCurrentActiveElement: () => {},
  currentActiveElement: "",
  elements: [],
});

const ElementsProvider: React.FC<ElementProviderProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [currentActiveElement, setCurrentActiveElement] = useState();

  useEffect(() => {
    let localElements: unknown = localStorage.getItem("elements-wdf");
    localElements = JSON.parse(localElements!) || [];
    setElements(localElements as EditorElement[]);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const addElement = (elementType: string) => {
    const element = contructElement(elementType);
    setElements((prev) => [...prev, element]);
  };

  const saveElements = (newElements: EditorElement[]) => {
    if (!newElements || newElements.length === 0) {
      console.error("No elements to save. Skipping save operation.");
      return;
    }

    console.log("Saving new elements:", newElements);
    localStorage.setItem("elements-wdf", JSON.stringify(newElements));
  };

  const updateElement = (elementId: string, data: Partial<EditorElement>) => {
    setElements((prevElements) => {
      const updatedElements = prevElements.map((element) =>
        element.id === elementId ? { ...element, ...data } : element
      );
      console.log("Updated elements:", updatedElements);
      saveElements(updatedElements);
      return updatedElements;
    });

    saveElements(elements); // Ensure saveElements is a pure function
  };

  return (
    <EditorContext.Provider
      value={{
        elements,
        addElement,
        saveElements,
        updateElement,
        setCurrentActiveElement,
        currentActiveElement,
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
