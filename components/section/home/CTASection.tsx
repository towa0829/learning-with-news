import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6";

const CTASection = () => {
  return (
    <section className="flex flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-30">
      <div className="w-full max-w-3xl rounded-xl bg-blue-50 px-6 py-10 sm:px-10 lg:px-20">
        <h2 className="text-2xl font-bold sm:text-3xl">Ready to Improve Your English?</h2>
        <p className="text-base text-muted-foreground mt-4 mb-6">Start reading real news articles and building your vocabulary today!</p>
        <Button asChild className="w-full rounded-sm bg-blue-600! px-6 py-5 text-white! hover:bg-blue-700! sm:w-auto">
          <Link href="/article">Browse Articles<FaArrowRightLong /></Link>
        </Button>
      </div>
    </section>
    )
}

export default CTASection
