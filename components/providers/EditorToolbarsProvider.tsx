"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface EditorToolbarsProviderProps {
  children: React.ReactNode;
}

// export type EditorToolbarsData = {};

type EditorToolbarsDataType = {
  setTopbarDevice: (type: string) => void;
  topbarDevice: string;
  setSelectedSidebar: (type: string) => void;
  selectedSidebar: string;
};

export const EditorToolbarsContext = createContext<EditorToolbarsDataType>({
  topbarDevice: "",
  setTopbarDevice: () => {},
  selectedSidebar: "",
  setSelectedSidebar: () => {},
});

const EditorToolbarsProvider: React.FC<EditorToolbarsProviderProps> = ({
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [topbarDevice, setTopbarDevice] = useState("desktop");
  const [selectedSidebar, setSelectedSidebar] = useState("components");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <EditorToolbarsContext.Provider
      value={{
        setTopbarDevice,
        topbarDevice,
        selectedSidebar,
        setSelectedSidebar,
      }}
    >
      {children}
    </EditorToolbarsContext.Provider>
  );
};

export const useEditorToolbars = () => {
  const context = useContext(EditorToolbarsContext);
  if (!context)
    throw new Error("Editor toolbar context must be used within the provider");
  return context;
};

export default EditorToolbarsProvider;
