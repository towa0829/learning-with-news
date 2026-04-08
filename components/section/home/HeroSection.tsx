import { Button } from "@/components/ui/button"
import Link from "next/link"
import { IoBookOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center gap-6 px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-30">
      <div className="py-1 px-3 rounded-3xl bg-blue-50 text-blue-600 border border-blue-200">
        <p className="flex gap-2 items-center"><IoBookOutline className="mt-1" />Learn English through Real News</p>
      </div>
      <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">Master English with<br /><span className="text-blue-600">Real-World News</span></h1>
      <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
        最新の英語ニュースを通じて、さまざまな分野の知識に触れながら、AI分析で難しい語彙を理解し、実践的な英語力を無理なく伸ばせます。
      </p>
      <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
        <Button asChild className="w-full bg-blue-600! px-4 py-5 text-white! hover:bg-blue-700! sm:w-auto">
          <Link href="/article">Start Reading<FaArrowRightLong /></Link>
        </Button>
        <Button asChild className="w-full border-gray-400 bg-white! px-4 py-5 text-black! hover:bg-blue-600! hover:text-white! sm:w-auto">
          <Link href="/vocabulary">View Vocabulary</Link>
        </Button>
      </div>
    </section>
  )
}

export default HeroSection
