# 七草ダウンローダー

### 実行の仕方
+ このページから「clone or download」を押す
+ 「Download Zip」でzipをつくる
+ chromeの拡張機能を開いて「デベロッパーモード」にチェック
+ 「パッケージされていない〜」を押して、解凍したnanakusa.zipを読み込む
+ ツールバーにアイコンが現れるので押す

### アプリの構成
```
.
├── README.md
├── background.js ---拡張機能の動作（ここからmain.htmlを呼び出している）拡張機能がインストールされてから裏で動き続けている。
├── bootstrap ---この配下は画面を今風にするライブラリ
│   ├── css
│   │   ├── bootstrap-grid.css
│   │   ├── bootstrap-grid.css.map
│   │   ├── bootstrap-grid.min.css
│   │   ├── bootstrap-grid.min.css.map
│   │   ├── bootstrap-reboot.css
│   │   ├── bootstrap-reboot.css.map
│   │   ├── bootstrap-reboot.min.css
│   │   ├── bootstrap-reboot.min.css.map
│   │   ├── bootstrap.css
│   │   ├── bootstrap.css.map
│   │   ├── bootstrap.min.css
│   │   └── bootstrap.min.css.map
│   └── js
│       ├── bootstrap.js
│       └── bootstrap.min.js
├── icons ---kawaiiアイコン
│   ├── icon_128.png
│   └── icon_16.png
├── lib ---使用しているライブラリ
│   └── jquery-3.2.1.min.js
├── main.html ---メインページ
├── main.js ---メインページの処理
└── manifest.json ---クローム拡張機能の設定
```

### 参考文献
+ Chrome JavaScript APIs　https://developer.chrome.com/extensions/api_index
+ Google Chrome Extensionの作り方 ～実践編～ https://risaiku.net/archives/1686/
+ ファイルをダウンロードさせるには？［JavaScript］http://www.atmarkit.co.jp/ait/articles/1603/30/news026.html
+ とほほのBootstrap入門 http://www.tohoho-web.com/ex/bootstrap.html
