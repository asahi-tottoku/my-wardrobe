# My Wardrobe

手持ちの服を写真で管理して、コーデを提案するスマホ向けWebアプリです。

**使う:** https://asahi-tottoku.github.io/my-wardrobe/

## データとプライバシー
- 服の写真・記録は、使っている端末のブラウザの中だけに保存されます。サーバーには送られず、ほかの人からは見えません。
- 天気を調べるときだけ、設定した地域のおおよその位置(緯度・経度)を Open-Meteo に送ります。
- 「背景を消す」は端末の中で処理します。初回だけ処理用の部品をダウンロードします。
- 機種変更などに備えて、マイページの「データを書き出す」で控えを保存できます。

## 使い方のコツ
- iPhone は Safari の「共有」→「ホーム画面に追加」で使ってください(追加しないと、しばらく開かなかったときにデータが消されることがあります)。
- Android は Chrome の「︙」→「ホーム画面に追加」。

## 使っているもの
- 天気: [Open-Meteo](https://open-meteo.com/)(CC BY 4.0、非商用の無料枠)
- 背景を消す: [@imgly/background-removal](https://github.com/imgly/background-removal-js)(AGPL-3.0)
- 文字: Cormorant Garamond(SIL Open Font License)

個人で無料で使う前提のアプリです。商用で使う場合は、上記サービス・部品の利用条件を確認してください。
