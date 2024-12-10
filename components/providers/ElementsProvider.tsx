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

  dndInBetweenLayerItem: ({
    element,
    from,
    indexFrom,
    indexTo,
    to,
  }: {
    indexFrom: number;
    indexTo: number;
    from: string;
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
  dndInBetweenLayerItem: () => {},
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
    allElements: EditorElement[],
    eleId: string,
    toAddElement: EditorElement
  ) => {
    for (let eleIndex = 0; eleIndex < allElements.length; eleIndex++) {
      const element = allElements[eleIndex];
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
    allElements: EditorElement[],
    eleId: string,
    data: Partial<EditorElement>
  ) => {
    for (let eleIndex = 0; eleIndex < allElements.length; eleIndex++) {
      let element = allElements[eleIndex];
      if (eleId === element.id) {
        element = { ...element, ...data };
        allElements[eleIndex] = element;
        break;
      }
      if (!element.children) continue;
      updateMlElement(element.children, eleId, data);
    }
    return allElements;
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

  const deleteMLElement = (allElements: EditorElement[], eleId: string) => {
    const isElePresent = allElements.findIndex(
      (element) => element.id === eleId
    );

    if (isElePresent > -1) {
      allElements.splice(isElePresent, 1);
    }

    for (let eleIndex = 0; eleIndex < allElements.length; eleIndex++) {
      const element = allElements[eleIndex];
      if (!element.children) continue;
      deleteMLElement(element.children, eleId);
    }

    return allElements;
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

  const dndInBetweenLayerItem = ({
    element,
    from,
    indexFrom,
    indexTo,
    to,
  }: {
    indexFrom: number;
    indexTo: number;
    from: string;
    to: string;
    element: EditorElement;
  }) => {
    console.log({ element, from, indexFrom, indexTo, to });
    const eleCopy = JSON.parse(JSON.stringify(elements)) as EditorElement[];
    deleteFromIndex(indexFrom, from, eleCopy);
    const updatedElements = addToIndex(
      indexTo,
      to,
      element,
      eleCopy
    ) as EditorElement[];
    setElements(updatedElements);
  };

  const deleteFromIndex = (
    index: number,
    parent: string,
    allElements: EditorElement[]
  ) => {
    if (parent === "body") {
      allElements.splice(index, 1);
      return;
    }

    for (let eleIndex = 0; eleIndex < allElements.length; eleIndex++) {
      const element = allElements[eleIndex];
      if (element.id === parent) {
        element.children?.splice(index, 1);
        break;
      }
      if (element.children) {
        deleteFromIndex(index, parent, element.children);
      }
    }
  };
  const addToIndex = (
    index: number,
    parent: string,
    element: EditorElement,
    allElements: EditorElement[]
  ) => {
    if (parent === "body") {
      const updatedElements = [
        ...allElements.slice(0, index),
        element,
        ...allElements.slice(index),
      ];
      return updatedElements;
    }
    for (let eleIndex = 0; eleIndex < allElements.length; eleIndex++) {
      const currElemetnt = allElements[eleIndex];
      if (currElemetnt.id === parent && currElemetnt.children) {
        const updatedElements = [
          ...currElemetnt.children.slice(0, index),
          element,
          ...currElemetnt.children.slice(index),
        ];
        return updatedElements;
      }
      if (currElemetnt.children) {
        addToIndex(index, parent, element, currElemetnt.children);
      }
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
        deleteElement,
        dndLayerItem,
        dndInBetweenLayerItem,
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
