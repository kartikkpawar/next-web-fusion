import { SignedIn, UserButton } from "@clerk/nextjs";
import BreadCrumb from "./BreadCrumb";

function Topbar() {
  return (
    <div className="flex w-full justify-between items-center border-separate border-b pb-3">
      <BreadCrumb />
      <div className=" flex items-center gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Topbar;
