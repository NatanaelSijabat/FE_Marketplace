'use client'
import * as React from "react";
import { ChartColumn, Package, ShoppingBag, ShoppingCart, History, User, LogOut } from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
import { Badge } from "../ui/badge";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter();
    const { data } = useSession()
    const itemsCart = useCartStore((state) => state.items)


    const datas = {
        navMain: [
            {
                title: "Dashboard",
                url: "/dashboard",
                icons: <ChartColumn />
            },
            {
                title: "Products",
                url: "/products",
                icons: <Package />
            },
            {
                title: "Shop",
                url: "/shop",
                icons: <ShoppingBag />
            },
            {
                title: "Cart",
                url: "/cart",
                icons: <ShoppingCart />
            },
            {
                title: "Orders",
                url: "/orders",
                icons: <History />
            },

        ],
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex gap-2 leading-none items-center justify-center">
                            <ShoppingBag className="size-6" />
                            <span className="font-semibold text-xl">DummyJSON Store</span>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarMenu>
                        {datas.navMain.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton className="cursor-pointer">
                                    <>
                                        {item.icons && <span className="text-gray-600">{item.icons}</span>}
                                        <Link
                                            href={item.url}
                                            className={`font-medium rounded-lg
                                            ? "bg-blue-500 text-white"
                                            : "text-gray-700 hover:bg-gray-200"
                                            }`}
                                        >
                                            {item.title}
                                        </Link>
                                        {item.title === "Cart" && itemsCart.length > 0 && (
                                            <Badge variant="secondary" className="ml-auto font-bold">
                                                {itemsCart.length}
                                            </Badge>
                                        )}
                                    </>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <Image src={data?.user.image ?? "/default-avatar.png"} alt="User Avatar" width={32} height={32} />
                                    <span>{data?.user.firstName} {data?.user.lastName}</span>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span className="font-medium">My Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-100" />
                                <DropdownMenuItem>
                                    <User size={32} strokeWidth={2.25} absoluteStrokeWidth />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-100" />
                                <DropdownMenuItem onClick={() => {
                                    signOut({ redirect: false }).then(() => {
                                        router.refresh()
                                    })
                                }}>
                                    <LogOut size={32} strokeWidth={2.25} absoluteStrokeWidth />
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}