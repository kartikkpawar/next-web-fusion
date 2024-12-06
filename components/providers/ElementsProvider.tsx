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
  dndLayerItem: ({
    to,
    element,
  }: {
    to: string;
    element: EditorElement;
  }) => void;
};

export const EditorContext = createContext<ElementProviderDataType>({
  addElement: () => {},
  saveElements: () => {},
  updateElement: () => {},
  deleteElement: () => {},
  setCurrentActiveElement: () => {},
  currentActiveElement: null,
  elements: [],
  dndLayerItem: () => {},
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
    try {
      const parsedElements = JSON.parse(data.data?.elements);
      setElements(parsedElements);
    } catch (error) {
      console.log(error);
      setElements([]);
    }
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
      addMlElement(elements, addTo, element);
      setElements(elements);
      saveElements(elements);
      return;
    }

    setElements((prev) => {
      const updatedElements = [...prev, element];
      saveElements(updatedElements);
      return updatedElements;
    });
  };

  const addMlElement = (
    allEelements: EditorElement[],
    eleId: string,
    toAddElement: EditorElement
  ) => {
    for (let eleIndex = 0; eleIndex < allEelements.length; eleIndex++) {
      const element = allEelements[eleIndex];
      if (eleId === element.id) {
        element.children?.push(toAddElement);
        break;
      }
      if (!element.children) continue;
      addMlElement(element.children, eleId, toAddElement);
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
    if (elementId === currentActiveElement?.id) {
      setCurrentActiveElement({ ...currentActiveElement, ...data });
    }
    const eleCopy = JSON.stringify(elements);
    const updateEle = updateMlElement(JSON.parse(eleCopy), elementId, data);
    setElements(updateEle);
    saveElements(updateEle);
  };

  const updateMlElement = (
    allEelements: EditorElement[],
    eleId: string,
    data: Partial<EditorElement>
  ) => {
    for (let eleIndex = 0; eleIndex < allEelements.length; eleIndex++) {
      let element = allEelements[eleIndex];
      if (eleId === element.id) {
        element = { ...element, ...data };
        allEelements[eleIndex] = element;
        break;
      }
      if (!element.children) continue;
      updateMlElement(element.children, eleId, data);
    }
    return allEelements;
  };

  const deleteElement = (elementId: string) => {
    const eleCopy = JSON.stringify(elements);
    const updateEle = deleteMLElement(JSON.parse(eleCopy), elementId);
    setElements(updateEle);
    saveElements(updateEle);
    if (currentActiveElement?.id === elementId) {
      setCurrentActiveElement(null);
    }
  };

  const deleteMLElement = (allEelements: EditorElement[], eleId: string) => {
    const isElePresent = allEelements.findIndex(
      (element) => element.id === eleId
    );

    if (isElePresent > -1) {
      allEelements.splice(isElePresent, 1);
    }

    for (let eleIndex = 0; eleIndex < allEelements.length; eleIndex++) {
      const element = allEelements[eleIndex];
      if (!element.children) continue;
      deleteMLElement(element.children, eleId);
    }

    return allEelements;
  };

  const dndLayerItem = ({
    to,
    element,
  }: {
    to: string;
    element: EditorElement;
  }) => {
    const eleCopy = JSON.stringify(elements);
    const updatedElements = deleteMLElement(JSON.parse(eleCopy), element.id);
    addMlElement(updatedElements, to, element);
    setElements(updatedElements);
    saveElements(updatedElements);
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
        dndLayerItem,
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
