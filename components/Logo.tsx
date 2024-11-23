import { cn } from "@/lib/utils";
import { Layers2 } from "lucide-react";
import Link from "next/link";

function Logo({
  fontSize = "2xl",
  iconSize = 20,
}: {
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      className={cn("text-xl font-bold flex items-center gap-2 p-3", fontSize)}
      href="/"
    >
      <div className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 p-2">
        <Layers2 size={iconSize} className="stroke-white" />
      </div>
      <div>
        <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
          NextWeb
        </span>
        <span className="text-stone-700 dark:text-stone-300"> Fusion</span>
      </div>
    </Link>
  );
}

export default Logo;
