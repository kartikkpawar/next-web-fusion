import React from "react";
import BreadCrumb from "./BreadCrumb";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ThemeToggle";

function Topbar() {
  return (
    <div className="flex w-full justify-between items-center border-separate border-b pb-3">
      <BreadCrumb />
      <div className=" flex items-center gap-5">
        <ThemeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Topbar;
