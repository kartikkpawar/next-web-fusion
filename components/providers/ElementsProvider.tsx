"use client";
import { updatePageData } from "@/actions/userPages.action";
import { contructElement } from "@/lib/helper";
import { EditorElement } from "@/lib/types/global.types";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

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
  deleteElement: (elementId: string) => void;
  setCurrentActiveElement: (element: EditorElement) => void;
  elements: EditorElement[];
  currentActiveElement: EditorElement | null;
};

export const EditorContext = createContext<ElementProviderDataType>({
  addElement: () => {},
  saveElements: () => {},
  updateElement: () => {},
  deleteElement: () => {},
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

  const params = useParams();

  const updatePageMutation = useMutation({
    mutationFn: updatePageData,
    onSuccess: () => {
      toast.success("Page updated successfully", { id: "page-toast" });
    },
    onError: (error) => {
      toast.error(error.message || "Something went wrong", {
        id: "page-toast",
      });
    },
  });

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
    setElements((prev) => {
      const updatedElements = [...prev, element];
      // saveElements(updatedElements);
      return updatedElements;
    });
  };

  const saveElements = (newElements?: EditorElement[]) => {
    updatePageMutation.mutate({
      elements: newElements || elements,
      pageId: params.pageId as string,
      siteId: params.siteId as string,
    });
  };

  const updateElement = (elementId: string, data: Partial<EditorElement>) => {
    setElements((prevElements) => {
      const updatedElements = prevElements.map((element) =>
        element.id === elementId ? { ...element, ...data } : element
      );
      // saveElements(updatedElements); // Save updated elements to localStorage
      return updatedElements;
    });
    if (elementId === currentActiveElement?.id) {
      setCurrentActiveElement({ ...currentActiveElement, ...data });
    }
  };

  const deleteElement = (elementId: string) => {
    const eleIndex = elements.findIndex((element) => element.id === elementId);
    if (currentActiveElement?.id === elementId) {
      setCurrentActiveElement(null);
    }
    setElements((prevElements) => {
      const updatedElements = prevElements.toSpliced(eleIndex, 1);
      // saveElements(updatedElements);
      return updatedElements;
    });
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
        deleteElement,
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
