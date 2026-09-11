"use client";
import { getMe } from "@/api";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { toast } from "@/components/ui/toast";
import { useLogOut, useMe } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const routes = [
  { name: "Home", url: "/" },
  { name: "About Us", url: "/about-us" },
];

export default function Header() {
  const { data, isLoading } = useMe();
  const { mutate: logOut } = useLogOut();
  const queryClient = useQueryClient();
  const handleLogOut = () => {
    logOut(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Tata",
          description: "Bye Bye. Abar dekha hobe ",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
      },
      onError: () => {
        toast.add({
          title: "!Tata",
          description: "!Bye !Bye. !Abar !dekha !hobe ",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div>Health Care</div>
        <NavigationMenu className="flex gap-5">
          <NavigationMenuList>
            {routes.map((route) => (
              <NavigationMenuItem key={route.name}>
                <NavigationMenuLink href={route.url}>
                  {route.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div>
          {!data && !isLoading && (
            <Button
              variant="default"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
            >
              login
            </Button>
          )}
          {data && !isLoading && (
            <Button
              variant="destructive"
              className="cursor-pointer"
              onClick={() => handleLogOut()}
            >
              logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
