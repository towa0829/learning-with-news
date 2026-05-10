import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import AuthManagement from "@/components/auth/AuthManagement";
import { IoBookOutline } from "react-icons/io5";
import { GrArticle } from "react-icons/gr";
import { FaSave } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-gray-300 bg-white px-4 py-3 sm:px-6 lg:px-40">
      <h1 className="flex items-center gap-2 text-xl font-extrabold sm:text-2xl"><IoBookOutline className="mt-1 text-blue-600" />NewsLingo</h1>
      <NavigationMenu>
        <NavigationMenuList className="flex flex-wrap items-center gap-3 sm:gap-5">
          <NavigationMenuItem>
            <NavigationMenuLink href="/"><IoHomeOutline />Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/article"><GrArticle />Articles</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink href="/vocabulary"><FaSave />Vocabulary</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <AuthManagement />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

export default Header
