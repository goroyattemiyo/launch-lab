# AI ENTRYPOINT

このファイルは、Gemini / Claude / ChatGPT など別AIへこのプロジェクトを引き継ぐときに、最初に必ず渡す入口ファイルです。

## プロジェクト名
Launch Lab

## 一言説明
HTMLでその場で試せる数秒オープニング演出を入口に、React / Flutter / Expo / Android などへの実装導線、作品投稿、Discordコミュニティ、商品販売、個別移植依頼までつなぐ「作品ギャラリー付き実装コミュニティ」。

## このAIに最初にやってほしいこと
1. まず `docs/RULES.md` を読む
2. 次に `docs/DECISIONS.md` を読む
3. 次に `docs/BACKLOG.md` を読む
4. 次に `docs/requirements.md` を読む
5. 次に `docs/content-policy.md` を読む
6. 必要に応じて `docs/sitemap.md` `docs/discord-structure.md` `docs/product-plan.md` を読む
7. 読んだ前提で、勝手に大きな構成変更をせず、変更前に目的と影響範囲を整理する

## 最重要ルール
- いきなりコードを書かない
- 初心者導線を壊さない
- かっこよさと使いやすさを両立する
- 無料と有料の境界を曖昧にしない
- 重くしすぎない
- 重要判断は docs に記録する
- 新規 md / 重要ファイル追加時は `docs/RAW_INDEX.md` を更新する

## 最初に読むべきファイル（優先順）
- RULES  
  https://raw.githubusercontent.com/goroyattemiyo/launch-lab/main/docs/RULES.md

- DECISIONS  
  https://raw.githubusercontent.com/goroyattemiyo/launch-lab/main/docs/DECISIONS.md

- BACKLOG  
  https://raw.githubusercontent.com/goroyattemiyo/launch-lab/main/docs/BACKLOG.md

- REQUIREMENTS  
  https://raw.githubusercontent.com/goroyattemiyo/launch-lab/main/docs/requirements.md

- CONTENT POLICY  
  https://raw.githubusercontent.com/goroyattemiyo/launch-lab/main/docs/content-policy.md

- SITEMAP  
  https://raw.githubusercontent.com/goroyattemiyo/launch-lab/main/docs/sitemap.md

- DISCORD STRUCTURE  
  https://raw.githubusercontent.com/goroyattemiyo/launch-lab/main/docs/discord-structure.md

- PRODUCT PLAN  
  https://raw.githubusercontent.com/goroyattemiyo/launch-lab/main/docs/product-plan.md

- RAW INDEX  
  https://raw.githubusercontent.com/goroyattemiyo/launch-lab/main/docs/RAW_INDEX.md

## ディレクトリ概要
- `docs/` 企画・要件・ルール・運営方針
- `web/` サイト本体
- `previews/` HTMLプレビュー集
- `assets/` 素材
- `community/` Discord関連

## AIへの依頼時テンプレ
このリポジトリの作業を行ってください。
最初に以下を読んで前提理解してください。
1. RULES
2. DECISIONS
3. BACKLOG
4. REQUIREMENTS
5. CONTENT POLICY
必要なら RAW_INDEX も参照してください。
大きな変更をする前に、目的・影響範囲・ロールバック案を先に整理してください。

# AI_ENTRYPOINT.md

別AIへの引き継ぎ用エントリーポイントです。
このファイルを最初に読ませてください。

## プロジェクト概要
**Launch Lab** — 数秒のオープニング演出をHTMLで試せるギャラリーサイト＋コミュニティ。  
React / Flutter / Expo / Android への実装導線、Discord、商品販売までつなぐ構想。

公開URL：https://goroyattemiyo.github.io/launch-lab/  
リポジトリ：https://github.com/goroyattemiyo/launch-lab

## 現在の実装状態

### 完成しているもの
- トップページ（`web/index.html`）
- 10作品のアニメーションHTML（`web/previews/`）
- 作品カードにiframeサムネイル（ホバーでアニメが動く）
- モーダルプレビュー（カードクリックで全画面再生）
- GitHub Actionsによる自動デプロイ（`web/`フォルダのみデプロイ）

### 未実装のもの
- Browseフィルター（ピルボタンはあるが機能していない）
- 作品詳細ページ
- 実装ガイドページ
- Discordコミュニティ
- 商品販売導線

## 技術構成
- 純粋なHTML / CSS / JavaScript（フレームワークなし）
- GitHub Pages でホスティング（`web/`フォルダをデプロイ）
- 外部ライブラリなし（Moon GateのみCanvas使用）

## ファイル構成
```
launch-lab/
├── web/                    ← デプロイされるフォルダ
│   ├── index.html
│   ├── css/
│   │   ├── style.css       ← メインスタイル
│   │   └── modal.css       ← サムネイル・モーダル
│   ├── js/
│   │   └── main.js         ← カード生成・モーダル制御
│   ├── data/
│   │   └── works.json      ← 作品データ10件
│   └── previews/           ← 各作品のHTMLアニメーション
│       ├── glow-pulse.html
│       ├── moon-gate.html
│       ├── signal-rise.html
│       ├── soft-bloom.html
│       ├── glass-entry.html
│       ├── start-orbit.html
│       ├── velvet-shine.html
│       ├── neon-drift.html
│       ├── paper-lantern.html
│       └── candy-pop.html
├── docs/
│   ├── AI_ENTRYPOINT.md    ← このファイル
│   ├── BACKLOG.md
│   └── RAW_INDEX.md
└── .github/workflows/      ← GitHub Actions設定
```

## 作品データ構造（works.json）
```json
{
  "title": "Glow Pulse",
  "subtitle": "発光ロゴが静かに立ち上がる 1.2秒導入",
  "tags": ["Minimal", "Brand Intro", "HTML", "React"],
  "difficulty": "Beginner",
  "preview": "pulse"
}
```

## 次にやること（優先度順）
1. requirements.md / sitemap.md の作成
2. Browseフィルター機能の実装
3. 新作品の追加（Three.js系など）
4. 作品詳細ページの設計・実装

## 開発上の注意
- `web/` の外のファイルはデプロイされない（GitHub Actionsで `path: ./web` 指定）
- iframeのパスは `./previews/xxxx.html`（`web/index.html`からの相対パス）
- `works.json` の `title` をケバブケースに変換してファイル名にマッピングしている