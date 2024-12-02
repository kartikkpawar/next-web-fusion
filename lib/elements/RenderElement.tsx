import React, { Fragment, useCallback, useMemo, useRef } from "react";
import { EditorElement } from "../types/global.types";
import { useElements } from "@/components/providers/ElementsProvider";
import { cn } from "../utils";

function RenderElement({ element }: { element: EditorElement }) {
  const customElementRef = useRef<HTMLElement>();
  const { updateElement, currentActiveElement } = useElements();

  const onDoubleClick = () => {
    if (!customElementRef.current) return;
    customElementRef.current.contentEditable = "true";
  };

  const onClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && customElementRef.current) {
      customElementRef.current.contentEditable = "false";
    }
  };
  const onBlur = useCallback(() => {
    if (customElementRef.current) {
      customElementRef.current.contentEditable = "false";
      const newText = customElementRef.current.textContent || "";
      console.log("Blurred content:", newText);
      updateElement(element.id, { data: newText });
    }
  }, [element.id, updateElement]);
  console.log(element.tag, "element_tag");

  const CustomReactComponent = useMemo(() => {
    return React.createElement(
      element.tag,
      {
        id: element.id,
        className: cn(
          element?.className || "",
          currentActiveElement?.id === element.id &&
            "border border-primary box-border"
        ),
        ref: customElementRef,
        onDoubleClick,
        onKeyDown,
        onClick,
        onBlur,
      },
      <Fragment>
        {element.data || ""}
        {element.children?.map((children) => (
          <RenderElement element={children} key={children.id} />
        ))}
      </Fragment>
    );
  }, [
    element.tag,
    element.id,
    element.className,
    element.data,
    onBlur,
    currentActiveElement,
    element.children,
  ]);

  return CustomReactComponent;
}

export default RenderElement;
