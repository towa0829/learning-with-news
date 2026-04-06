import { Button } from "@/components/ui/button"
import Link from "next/link"
import { IoBookOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center text-center py-30 gap-8">
      <div className="py-1 px-3 rounded-3xl bg-blue-50 text-blue-600 border border-blue-200">
        <p className="flex gap-2 items-center"><IoBookOutline />Learn English through Real News</p>
      </div>
      <h1 className="text-5xl font-extrabold leading-tight">Master English with<br /><span className="text-blue-600">Real-World News</span></h1>
      <p className="text-lg text-muted-foreground max-w-2xl">
        Read authentic English news articles, learn difficult vocabulary with AI-powered analysis, and build your language skills naturally.
      </p>
      <div className="flex gap-3 items-center">
        <Button asChild className="bg-blue-600! hover:bg-blue-700! text-white!">
          <Link href="/learn">Start Reading<FaArrowRightLong /></Link>
        </Button>
        <Button asChild className="bg-white! hover:bg-blue-600! text-black! hover:text-white! border-gray-400">
          <Link href="/vocabulary">View Vocabulary</Link>
        </Button>
      </div>
    </section>
  )
}

export default HeroSection
