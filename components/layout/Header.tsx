import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { IoBookOutline } from "react-icons/io5";
import { GrArticle } from "react-icons/gr";
import { FaSave } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white py-3 px-40 flex items-center justify-between border-b border-gray-300">
      <h1 className="text-2xl font-extrabold flex items-center gap-2"><IoBookOutline className="mt-1 text-blue-600" />NewsLingo</h1>
      <NavigationMenu>
        <NavigationMenuList className="flex items-center gap-5">
          <NavigationMenuItem>
            <NavigationMenuLink><IoHomeOutline />Home</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink><GrArticle />Articles</NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink><FaSave />Vocabulary</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

export default Header
