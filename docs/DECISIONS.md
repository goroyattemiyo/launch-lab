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

## 2026-04-17（追記）
- Browseピルの連動方針：方針A（ピルクリック→worksタブ切替+スクロール）を採用した
  - 理由：初心者導線を壊さない・実装コスト最小・将来の方針B移行を妨げない
  - 用途/技術/秒数ピルは現時点でworksに対応タブがないため、クリックするとall表示+#worksスクロールとした
- カテゴリタブ並びを「すべて・きれいめ・和風・ゲームSF・奇抜系」に変更（奇抜系を末尾へ、ブランド第一印象を優先）
- 「すべての作品を見る」リンクを href="#" から href="#works" に修正
- Developers×3・Request×2 の #リンクに Coming Soon ツールチップを実装（CSS only）

## 2026-04-17（追記2）
- BrowseセクションをHTML側でdisplay:noneに変更（worksタブで完結するため不要と判断）
- Hero Preview Windowをdisplay:noneに変更（直下にWorksがあるため静的演出は不要と判断）
- works.jsonのpreviewフィールドを削除（titleToKey()方式に統一済みで完全に未使用のため）
- Glitch SurrealのcanvasをW=800固定からwindow.innerWidth基準に修正（サムネイル右切れ対応）

## 2026-04-17（追記3）
- AIからの作業指示はスクリプトファイルではなく、PowerShell／Bash どちらでも流せるコマンドテキストで渡す方針とする
- 理由：スクリプトファイルは実行ポリシーや保存場所の手間がかかるため
