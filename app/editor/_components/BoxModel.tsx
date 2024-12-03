import { BoxModelParams } from "@/lib/types/global.types";
import { cn } from "@/lib/utils";

export default function BoxModel({
  children,
  selectedMode,
  onSelect,
  mode,
  values,
}: {
  children: React.ReactNode;
  selectedMode: BoxModelParams;
  onSelect: (mode: BoxModelParams) => void;
  mode: BoxModelParams;
  values?: string[];
}) {
  return (
    <div
      className={cn(
        "w-full p-5 px-6 rounded-md flex flex-col items-start border-dashed hover:cursor-pointer select-none relative box-border border-2 bg-secondary/50",
        selectedMode === mode && "border-solid border-primary bg-primary/10"
      )}
      onClick={(e) => {
        onSelect(mode);
        e.stopPropagation();
      }}
    >
      <span
        className={cn(
          "text-muted-foreground text-[8px] -mt-3 mb-1 -ml-3 block uppercase",
          selectedMode === mode && "text-primary"
        )}
      >
        {mode}
      </span>
      <span
        className={cn(
          "absolute top-2 right-[45%] text-[10px] text-muted-foreground",
          selectedMode === mode && "text-primary-foreground"
        )}
      >
        {values?.[0]}
      </span>
      <span
        className={cn(
          "absolute right-1 top-[45%] text-[10px] text-muted-foreground",
          selectedMode === mode && "text-primary-foreground"
        )}
      >
        {values?.[1]}
      </span>
      <span
        className={cn(
          "absolute bottom-1 right-[45%] text-[10px] text-muted-foreground",
          selectedMode === mode && "text-primary-foreground"
        )}
      >
        {values?.[2]}
      </span>
      <span
        className={cn(
          "absolute left-1 top-[45%] text-[10px] text-muted-foreground",
          selectedMode === mode && "text-primary-foreground"
        )}
      >
        {values?.[3]}
      </span>

      {children}
    </div>
  );
}
