"use client";
import { contructElement } from "@/lib/helper";
import { EditorElement } from "@/lib/types/global.types";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ElementProviderProps {
  children: React.ReactNode;
}

type ElementProviderDataType = {
  addElement: ({
    elementType,
    elementCategory,
    elementSubCategory,
  }: {
    elementType: string;
    elementCategory: string;
    elementSubCategory: string;
  }) => void;
  saveElements: (newElements: EditorElement[]) => void;
  updateElement: (elementId: string, data: Partial<EditorElement>) => void;
  setCurrentActiveElement: (element: EditorElement) => void;
  elements: EditorElement[];
  currentActiveElement: EditorElement | null;
};

export const EditorContext = createContext<ElementProviderDataType>({
  addElement: () => {},
  saveElements: () => {},
  updateElement: () => {},
  setCurrentActiveElement: () => {},
  currentActiveElement: null,
  elements: [],
});

const ElementsProvider: React.FC<ElementProviderProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [currentActiveElement, setCurrentActiveElement] =
    useState<EditorElement | null>(null);

  useEffect(() => {
    const localElements = localStorage.getItem("elements-wdf");
    const parsedElements = localElements ? JSON.parse(localElements) : [];
    setElements(parsedElements as EditorElement[]);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const addElement = ({
    elementType,
    elementCategory,
    elementSubCategory,
  }: {
    elementType: string;
    elementCategory: string;
    elementSubCategory: string;
  }) => {
    const element = contructElement({
      elementType,
      elementCategory,
      elementSubCategory,
    });
    setElements((prev) => [...prev, element]);
  };

  const saveElements = (newElements: EditorElement[]) => {
    if (!newElements || newElements.length === 0) {
      console.error("No elements to save. Skipping save operation.");
      return;
    }
    localStorage.setItem("elements-wdf", JSON.stringify(newElements));
  };

  const updateElement = (elementId: string, data: Partial<EditorElement>) => {
    setElements((prevElements) => {
      const updatedElements = prevElements.map((element) =>
        element.id === elementId ? { ...element, ...data } : element
      );
      saveElements(updatedElements); // Save updated elements to localStorage
      return updatedElements;
    });

    if (elementId === currentActiveElement?.id) {
      setCurrentActiveElement({ ...currentActiveElement, ...data });
    }
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
