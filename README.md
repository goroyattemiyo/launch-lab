# Launch Lab

数秒で心をつかむ。  
見て、試して、実装できるオープニング集とコミュニティ。

## 目的
Launch Lab は、HTMLで試せる数秒オープニング演出を入口に、
React / Flutter / Expo / Android などへの実装導線、
作品投稿、Discordコミュニティ、商品販売、個別移植依頼までつなぐ
作品ギャラリー付き実装コミュニティをつくるプロジェクトです。

## 現在の状態
- トップページ（`web/index.html`）実装済み
- 10作品のアニメーションHTML実装済み（`web/previews/`）
- 作品カードにiframeサムネイル＋モーダルプレビュー実装済み
- GitHub Pages で公開中：https://goroyattemiyo.github.io/launch-lab/

## ディレクトリ
- `docs/` 企画・要件・ルール
- `web/` サイト本体
  - `web/index.html` トップページ
  - `web/css/style.css` メインスタイル
  - `web/css/modal.css` サムネイル・モーダルスタイル
  - `web/js/main.js` 作品カード生成・モーダル制御
  - `web/data/works.json` 作品データ
  - `web/previews/` 各作品のHTMLアニメーション（10本）
- `assets/` 素材
- `community/` Discord関連

## 作品一覧（10本）

| タイトル | 演出タイプ | 難易度 |
|---------|-----------|--------|
| Glow Pulse | pulse (CSS) | Beginner |
| Moon Gate | bloom (Canvas) | Intermediate |
| Signal Rise | bars (CSS) | Intermediate |
| Soft Bloom | bloom (CSS) | Beginner |
| Glass Entry | sweep (CSS) | Advanced |
| Start Orbit | orbit (CSS) | Intermediate |
| Velvet Shine | sweep (CSS) | Intermediate |
| Neon Drift | bars (CSS) | Intermediate |
| Paper Lantern | pulse (CSS) | Beginner |
| Candy Pop | orbit (CSS) | Beginner |

## AI handoff
別AIへ引き継ぐときは、まず `docs/AI_ENTRYPOINT.md` を読ませてください。  
Raw URL 一覧は `docs/RAW_INDEX.md` にあります。  
コンテンツ公開・著作権・配布方針は `docs/content-policy.md` を参照してください。