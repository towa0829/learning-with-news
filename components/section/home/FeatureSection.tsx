import { GrArticle } from "react-icons/gr";
import { LuSparkles } from "react-icons/lu";
import { FaSave } from "react-icons/fa";

const FeatureSection = () => {
  return (
    <section className="flex flex-col items-center gap-5 bg-gray-50 px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-30">
      <h2 className="text-2xl font-bold sm:text-3xl">How It Works</h2>
      <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">
        シンプルで続けやすい、効果的な英語学習の流れです。
      </p>
      <div className="mt-4 grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        <div className="flex flex-col items-center gap-4">
          <GrArticle className="bg-gray-200 rounded-lg text-blue-600 w-10 h-10 p-2" />
          <h3 className="font-bold text-lg">English News</h3>
          <p className="text-base text-muted-foreground max-w-xs">さまざまな媒体の英語ニュースを読み、読解力を着実に高めます。</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <LuSparkles  className="bg-gray-200 rounded-lg text-blue-600 w-10 h-10 p-2" />
          <h3 className="font-bold text-lg">Smart Analysis</h3>
          <p className="text-base text-muted-foreground max-w-xs">AIが難しい単語を抽出し、日本語訳と例文で理解を深められます。</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <FaSave  className="bg-gray-200 rounded-lg text-blue-600 w-10 h-10 p-2" />
          <h3 className="font-bold text-lg">Save Words</h3>
          <p className="text-base text-muted-foreground max-w-xs">覚えたい単語を保存して、自分だけの単語帳として学習の進捗を管理できます。</p>
        </div>
      </div>

    </section>
  )
}

export default FeatureSection
