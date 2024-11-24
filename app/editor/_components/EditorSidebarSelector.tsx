import Logo from "@/components/Logo";
import { useEditorToolbars } from "@/components/providers/EditorToolbarsProvider";
import TooltipWrapper from "@/components/TooltipWrapper";
import { sidebarSelectorMenu } from "@/lib/data";
import { cn } from "@/lib/utils";

function EditorSidebarSelector() {
  const { selectedSidebar, setSelectedSidebar } = useEditorToolbars();
  return (
    <div className="flex flex-col px-2 space-y-5 bg-[#242431] pt-2">
      <Logo iconOnly className="p-1" />
      {sidebarSelectorMenu.map((item) => (
        <TooltipWrapper hoverText={item.tooltip} key={item.key}>
          <div
            className={cn(
              "p-2 rounded-lg text-white cursor-pointer",
              selectedSidebar == item.key && "bg-primary text-white"
            )}
            onClick={() => setSelectedSidebar(item.key)}
          >
            <item.icon size={27} />
          </div>
        </TooltipWrapper>
      ))}
    </div>
  );
}

export default EditorSidebarSelector;
