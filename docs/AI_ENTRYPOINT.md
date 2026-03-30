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