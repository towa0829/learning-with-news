# NewsLingo

英語ニュースを使って、読む、訳す、語彙を貯める学習アプリです。  
記事一覧から気になるニュースを開き、AI翻訳と重要語句の抽出で読解をサポートします。

公開URL: https://news-lingo.vercel.app

## 主な機能

- 英語ニュース記事の一覧表示（カテゴリ切り替え、キーワード検索）
- 記事詳細表示（原文リンク、公開日、出典情報）
- AI翻訳（タイトル・説明文の日本語化）
- 重要語句の抽出（意味・英日例文つき）
- 語彙保存と単語帳表示
- 閲覧履歴の表示

## 技術スタック

- Framework: Next.js 16.2.2 (App Router)
- Language: TypeScript
- UI: Tailwind CSS v4, shadcn/ui, Radix UI, motion
- Icons: lucide-react, react-icons
- API: NewsAPI, OpenAI API

## 必要な環境変数

プロジェクトルートに .env.local を作成してください。

```env
NEWS_API_KEY=your_newsapi_key
OPENAI_API_KEY=your_openai_api_key
```

メモ:

- OPENAI_API_KEY が未設定でもアプリは動作します（翻訳・キーワード抽出はフォールバック動作）。
- NEWS_API_KEY は記事取得に必須です。

## セットアップ

1. 依存関係をインストール

```bash
npm install
```

2. 開発サーバーを起動

```bash
npm run dev
```

3. ブラウザで確認

http://localhost:3000

## スクリプト

- npm run dev: 開発サーバー起動
- npm run build: 本番ビルド
- npm run start: 本番サーバー起動
- npm run lint: ESLint実行

## 画面構成

- /: ホーム
- /article: 記事一覧
- /article/[id]: 記事詳細
- /article/reading_history: 閲覧履歴
- /vocabulary: 単語帳

## APIエンドポイント

- GET /api/article: 記事一覧取得（category または keyword）
- GET /api/article/detail: 記事詳細取得（url）
- POST /api/article/analyze: 翻訳・キーワード抽出

## データ保存について

以下はブラウザの Local Storage に保存されます。

- savedArticles
- savedVocabulary

