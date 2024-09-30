![Node.js](https://img.shields.io/badge/node.js-21.6.2-green?logo=nodedotjs&logoColor=white)
![GitHub last commit](https://img.shields.io/github/last-commit/mikaijun/yumemi-test-frontend)
[![CI](https://github.com/mikaijun/yumemi-test-frontend/actions/workflows/build_and_test.yml/badge.svg)](https://github.com/mikaijun/yumemi-test-frontend/actions/workflows/build_and_test.yml)
[![storybook](https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg)](https://66f32d7a2dbb85e5ae77e537-twwzfgexmu.chromatic.com/?path=/docs/parts-checkbox--docs)



# Yumemi Test Frontend
株式会社ゆめみのフロントエンドコーディング試験

都道府県別の総人口推移グラフを表示するアプリケーションをNext.jsで作成しました

## 🔗 関連URL
- [デプロイ先のURL(ウェブサイト)](https://yumemi-test-frontend.vercel.app/)
- [Storybook](https://66f32d7a2dbb85e5ae77e537-twwzfgexmu.chromatic.com/?path=/docs/parts-checkbox--docs)

## ⚙️ 技術スタック
- フロントエンドフレームワーク: Next.js (React.js)
- 静的解析ツール: ESLint, Stylelint
- フォーマッター: Prettier
- スタイリング: Sass
- グラフ表示: Recharts
- テストツール: Storybook, Playwright

## 🔧 Node.jsバージョン設定（任意）
開発環境でNode.jsのバージョンを当リポジトリと合わせる場合は、以下のコマンドを実行して、`.nvmrc`ファイルに指定されたバージョンに切り替えてください。
```bash
nvm use
```
nvmがインストールされていない場合は、以下のリンクからインストール手順をご確認ください。

[NVMのインストールはこちら](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

## 📝 コマンド一覧
| コマンド                      | 説明                                      |
| ----------------------------| ----------------------------------------- |
| `npm install`               | プロジェクトの依存関係をインストール                    |
| `npm run dev`               |開発サーバーを起動                        |
| `npm run lint`              | ESLintとStylelintでコードのフォーマットやスタイルをチェック |
| `npm run lint:fix`          | ESLintとStylelintでコードのフォーマットやスタイルを自動修正 |
| `npm run type-check`        | TypeScriptの型チェックを実行                   |
| `npm run storybook`         | Storybookを起動してコンポーネントを表示                           |
| `npm run build-storybook`   | Storybookをビルドして静的ファイルを生成                         |
| `npm run storybook:test`    | Storybookを使ったコンポーネントテストを実行 |
| `npm run storybook:coverage`| Storybookのコンポーネントテストのカバレッジを表示              |
| `npm run playwright`        | PlaywrightでE2Eテストを実行    |
| `npm run playwright:ui`     | PlaywrightのUIモードでE2Eテストを実行    |

## 🚀 環境構築
### プロジェクトの依存関係をインストール
```
npm install
```
`.env`を作成し、RESAS APIのAPIキーを以下の形式で設定してください。
```
RESAS_API_KEY=
```
ローカル開発サーバーを起動
```
npm run dev
```

## 🧪 テストの実行方法
まずは環境構築を完了させてください。
### コードフォーマットチェック
ESLintとStylelintを使用して、コードのフォーマットとスタイルをチェック
```
npm run lint
```
### TypeScriptの型チェック
```
npm run type-check
```
### Storybookによるコンポーネントテスト
Storybookを起動してコンポーネントを表示
```
npm run storybook
```
表示されたコンポーネントをテストします
```
npm run storybook:test
```
カバレッジを確認する場合は、以下のコマンドを実行してください
```
npm run storybook:coverage
```

### PlaywrightでE2Eテストを実行
```
npm run playwright
```
UIでE2Eテストを行いたい場合は下記のコマンドを実行してください
```
npm run playwright:ui
```

## 💬 課題提出時の回答事項
- 課題の取り組み開始から完了までに要した合計時間
  - 30時間
- これまでの総合的なプログラミング歴
  - 4年
- これまでのWEBフロントエンドプログラミング歴
  - 4年（総合的なプログラミング歴と同じ）
- 着手にあたり参考にしたページや書籍、リポジトリ等
  - [アクセシビリティ向上のため、キーボード操作によるタブの切り替え](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/examples/tabs-automatic/#kbd_label)
  - [Next.jsにtanstack/react-queryを導入する際の手順](https://tanstack.com/query/v5/docs/framework/react/guides/suspense#suspense-on-the-server-with-streaming)
