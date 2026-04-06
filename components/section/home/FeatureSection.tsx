import { GrArticle } from "react-icons/gr";
import { LuSparkles } from "react-icons/lu";
import { FaSave } from "react-icons/fa";

const FeatureSection = () => {
  return (
    <section className="flex flex-col items-center text-center py-30 gap-5 bg-gray-50">
      <h2 className="text-3xl font-bold">How It Works</h2>
      <p className="text-lg text-muted-foreground max-w-2xl">
        A simple yet effective approach to learning English
      </p>
      <div className="flex items-center justify-center gap-10 mt-4">
        <div className="flex flex-col items-center gap-4">
          <GrArticle className="bg-gray-200 rounded-lg text-blue-600 w-10 h-10 p-2" />
          <h3 className="font-bold text-lg">English News</h3>
          <p className="text-base text-muted-foreground max-w-xs">Read authentic English news articles from various sources to improve reading comprehension.</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <LuSparkles  className="bg-gray-200 rounded-lg text-blue-600 w-10 h-10 p-2" />
          <h3 className="font-bold text-lg">Smart Analysis</h3>
          <p className="text-base text-muted-foreground max-w-xs">AI-powered extraction of difficult vocabulary with Japanese translations and example sentences.</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <FaSave  className="bg-gray-200 rounded-lg text-blue-600 w-10 h-10 p-2" />
          <h3 className="font-bold text-lg">Save Words</h3>
          <p className="text-base text-muted-foreground max-w-xs">Build your personal vocabulary list by saving words you want to remember and track progress.</p>
        </div>
      </div>
      
    </section>
  )
}

export default FeatureSection
