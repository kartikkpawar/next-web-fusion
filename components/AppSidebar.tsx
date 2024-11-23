"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { dashboardSideBarRoutes } from "@/lib/data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-accent">
      <SidebarContent>
        <Logo />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboardSideBarRoutes.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-base flex items-center gap-2 w-full p-3 hover:bg-primary/20 hover:text-primary rounded-lg",
                      pathname === item.href &&
                        "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                    )}
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
