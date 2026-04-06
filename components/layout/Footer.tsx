import { IoBookOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="py-4 px-40 border-t border-gray-300 flex items-center justify-between bg-gray-50">
      <h1 className="text-base font-extrabold flex items-center gap-2"><IoBookOutline className="mt-1 text-blue-600" />NewsLingo</h1>
      <small className="text-muted-foreground">© 2026 NewsLingo. All rights reserved.</small>
    </footer>
  )
}

export default Footer
