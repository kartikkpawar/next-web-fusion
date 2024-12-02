"use client";
import { getPageElements, updatePageData } from "@/actions/userPages.action";
import useDebounce from "@/hooks/use-debounce";
import { contructElement } from "@/lib/helper";
import { EditorElement } from "@/lib/types/global.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface ElementProviderProps {
  children: React.ReactNode;
}

type ElementProviderDataType = {
  addElement: ({
    elementType,
    elementCategory,
    elementSubCategory,
    addTo,
  }: {
    elementType: string;
    elementCategory: string;
    elementSubCategory: string;
    addTo?: string;
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
    setIsMounted(true);
  }, []);

  const params = useParams();

  const data = useQuery({
    queryKey: ["page-data", params?.pageId],
    queryFn: () => getPageElements(params?.pageId as string),
  });

  const updateDataMutation = useMutation({
    mutationFn: updatePageData,
    onSuccess: () => {
      console.log("Updated Successfully");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const saveDebounce = useDebounce(updateDataMutation.mutate, 800);

  useEffect(() => {
    if (!data.data) return setElements([]);
    const parsedElements = JSON.parse(data.data?.elements);
    setElements(parsedElements);
  }, [data.data]);

  if (!isMounted) return null;

  const addElement = ({
    elementType,
    elementCategory,
    elementSubCategory,
    addTo,
  }: {
    elementType: string;
    elementCategory: string;
    elementSubCategory: string;
    addTo?: string;
  }) => {
    const element = contructElement({
      elementType,
      elementCategory,
      elementSubCategory,
    });
    if (addTo) {
      mlAddHelper(elements, addTo, element);
      saveElements(elements);
      return;
    }

    setElements((prev) => {
      const updatedElements = [...prev, element];
      saveElements(updatedElements);
      return updatedElements;
    });
  };

  const mlAddHelper = (
    allEelements: EditorElement[],
    eleId: string,
    modElement: EditorElement
  ) => {
    for (let eleIndex = 0; eleIndex < allEelements.length; eleIndex++) {
      const element = allEelements[eleIndex];
      if (eleId === element.id) {
        element.children?.push(modElement);
        break;
      }
      if (!element.children) continue;
      mlAddHelper(element.children, eleId, modElement);
    }
  };

  const saveElements = (newElements?: EditorElement[]) => {
    saveDebounce({
      elements: newElements || elements,
      pageId: params?.pageId as string,
      siteId: params?.siteId as string,
    });
  };

  const updateElement = (elementId: string, data: Partial<EditorElement>) => {
    setElements((prevElements) => {
      const updatedElements = prevElements.map((element) =>
        element.id === elementId ? { ...element, ...data } : element
      );
      saveElements(updatedElements);
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
      saveElements(updatedElements);
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
