import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FaArrowRightLong } from "react-icons/fa6";

const CTASection = () => {
  return (
    <section className="flex flex-col items-center text-center py-30">
      <div className="bg-blue-50 rounded-xl py-10 px-20">
        <h2 className="text-3xl font-bold">Ready to Improve Your English?</h2>
        <p className="text-base text-muted-foreground mt-4 mb-6">Start reading real news articles and building your vocabulary today!</p>
        <Button asChild className="bg-blue-600! hover:bg-blue-700! text-white! rounded-sm py-5 px-6">
          <Link href="/learn">Browse Articles<FaArrowRightLong /></Link>
        </Button>
      </div>
    </section>
    )
}

export default CTASection
