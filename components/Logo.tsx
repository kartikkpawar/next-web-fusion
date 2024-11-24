import { cn } from "@/lib/utils";
import { Layers2 } from "lucide-react";
import Link from "next/link";

function Logo({
  className,
  iconSize = 20,
  iconOnly,
}: {
  className?: string;
  iconSize?: number;
  iconOnly?: boolean;
}) {
  return (
    <Link
      className={cn("text-xl font-bold flex items-center gap-2 p-3", className)}
      href="/"
    >
      <div className="rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 p-2">
        <Layers2 size={iconSize} className="stroke-white" />
      </div>
      {!iconOnly && (
        <div>
          <span className="bg-gradient-to-r from-purple-500 to-purple-600 bg-clip-text text-transparent">
            NextWeb
          </span>
          <span className="text-stone-700 dark:text-stone-300"> Fusion</span>
        </div>
      )}
    </Link>
  );
}

export default Logo;
