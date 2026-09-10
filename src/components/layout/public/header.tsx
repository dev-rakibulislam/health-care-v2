import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

const routes = [
  { name: "Home", url: "/" },
  { name: "About Us", url: "/about-us" },
];
export default function Header() {
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
          <Button
            variant="default"
            render={<Link href="/login">Login</Link>}
            nativeButton={false}
          >
            login
          </Button>
        </div>
      </div>
    </header>
  );
}
