# DECISIONS

## 2026-03-30
- Repository名は `launch-lab` とする
- 開発初期は Private repository で開始する
- GitHub運用ルールは `dev-rules` をベースに Launch Lab 向けへ調整する
- サービスは「公開ギャラリー + Discordコミュニティ + 商品3段階」で設計する
- Repository名は `Launch-lab` から `launch-lab` に統一した

## 2026-04-17
- 作品を10本→30本→50本に段階拡充した
- PREVIEW_MAPを廃止しtitleToKey()による動的パス解決に統一した（作品追加コストをゼロにするため）
- worksセクションにカテゴリタブ（すべて・きれいめ・奇抜系・ゲームSF・和風）を実装した
- 奇抜系カテゴリ（wild）を新設し、サイケデリック・ホラー・ピクセル・タイポグラフィ・グリッチの5テイストを追加した
- works.jsonにcategoryフィールドを追加してタブフィルタリングに対応した
- index.htmlの公開プレビュー表記を「10+」から「50+」に更新した

## 2026-04-18
- 和風作品を27本追加し、総作品数を53本→80本に拡充した
- 追加タイトル（全て category: japanese）:
  Sumi Bloom / Torii Gate / Koi Drift / Zen Circle / Maple Fall / Snow Veil /
  Noren Slide / Kamon Reveal / Bamboo Rise / Crane Fly / Fuji Mist / Taiko Beat /
  Incense Drift / Shoji Light / Wave Ukiyo / Firefly Night / Katana Draw /
  Temple Bell / Washi Tear / Hanabi Burst / Matcha Pour / Matcha Mist /
  Chazen / Ai Dye / Kinpaku / Urushi / Temari
- 実装方針: Canvas 2D / CSS animation のみ（外部ライブラリなし）、尺は0.5〜3秒基準を維持
- ファイル命名: titleToKey()ルール（小文字・スペースをハイフン）で統一
- index.htmlの公開プレビュー表記を「50+」から「80+」に更新が必要（TODO）
