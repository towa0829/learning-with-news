import { IoBookOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-center gap-2 border-t border-gray-300 bg-gray-50 px-4 py-4 text-center sm:justify-between sm:px-6 sm:text-left lg:px-40">
      <h1 className="text-base font-extrabold flex items-center gap-2"><IoBookOutline className="mt-1 text-blue-600" />NewsLingo</h1>
      <small className="text-xs text-muted-foreground sm:text-sm">© 2026 NewsLingo. All rights reserved.</small>
    </footer>
  )
}

export default Footer
