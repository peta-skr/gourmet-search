# gourmet-search

現在地から半径を選んで、周辺の飲食店を探すWebアプリ。ホットペッパーグルメサーチAPIを使い、画面はReact、APIキーを持つ中継サーバはExpressで書いた。与えられた要求仕様に沿って作った。

## できること

- ブラウザの位置情報（`navigator.geolocation`）で現在地を取り、300m〜3000mの5段階から選んだ半径の中にある店を検索する。半径を選ばずに検索ボタンを押すとエラーを表示する
- 検索結果を1ページ10件で表示し、ページネーションで切り替える。カードには店名・キャッチ・アクセス・ジャンル・平均予算を出す
- 店名を押すと詳細画面に移り、写真・住所・ジャンルと、最寄り駅・予算・総席数・店舗URL・営業時間・定休日などの表を見られる
- 読み込み中はスケルトンを表示する。0件のときは「見つかりませんでした」を、存在しないURLでは404画面を出す

## 動かし方

Node.js（作成時はv16.15.1）と、ホットペッパーWebサービスのAPIキーが要る。キーは環境変数 `API_KEY` で渡す（`server/.env.example` を `.env` にコピーして書く）。

```sh
# 中継サーバ（http://localhost:5000）
cd server
npm install
cp .env.example .env   # API_KEY を書き換える
npm start

# 画面（http://localhost:3000）
cd frontend
npm install
npm start
```

E2Eテストは、サーバと画面を両方起動した状態で実行する。

```sh
cd frontend
npm run cypress:run    # 画面で見るなら npm run cypress:open
```

自分で書いたテストは `frontend/cypress/e2e/search.cy.js` の1本で、半径を選んで検索 → 2ページ目へ移動 → 店の詳細を開く → リロード → 戻るボタン → リロード → Homeボタン → 存在しないURLを開く、を順に操作する。各操作の対象要素が見つかって最後まで通るかを確かめるもので、表示内容のアサーションは書いていない。実際のAPIを呼ぶので、APIキーと位置情報の許可が要る。同じディレクトリの `1-getting-started` と `2-advanced-examples` はCypressが生成したサンプル。

## 構成

| パス | 役割 |
| --- | --- |
| `server/server.js` | ホットペッパーAPIへの中継。`GET /`（緯度・経度・半径・ページで検索）と `GET /shop`（店IDで1件取得） |
| `frontend/src/App.js` | ルーティングとMUIのテーマ。検索結果と件数の状態を持つ |
| `frontend/src/page/` | `Home`（検索）、`SearchResult`（一覧）、`ShopDetail`（詳細）、`NotFound`（404） |
| `frontend/src/components/` | 検索フォーム、店カード、ページネーション、ヘッダー、スケルトン、詳細表の行 |
| `frontend/src/ScrollTop.js` | 画面遷移のたびにページ先頭へスクロールする |
| `frontend/cypress/e2e/search.cy.js` | 検索から詳細・404までを操作するE2Eシナリオ |

## 設計・実装のポイント

- APIキーをブラウザに渡さないために、Expressの中継サーバを挟んだ。キーは `dotenv` で `.env` から読み、画面側は `localhost:5000` だけを呼ぶ
- 検索条件（緯度・経度・半径・ページ番号）と詳細画面の店IDは、URLのクエリに持たせた（React Routerの `useSearchParams`）。リロードや戻る操作のあとでも、URLから同じ条件でAPIを呼び直せる。E2Eテストでもリロードと戻るボタンを通している
- APIは取得の開始位置 `start` で範囲を指定するので、サーバ側でページ番号から `(page - 1) * 10 + 1` を計算している
- 半径の選択肢はAPIの `range` パラメータ（1〜5）に対応させ、画面には300m・500m・1000m・2000m・3000mで見せている
- MUIの `Grid` とブレークポイント指定（`xs` / `md`）で、カードの並びと画像の大きさをスマホとPCで切り替えている。画面遷移時のフェードインはframer-motionで付けた

## 学んだこと

- 外部APIのキーをクライアントに置かず、サーバ側で付けて中継する構成
- 画面の状態をURLのクエリに置き、リロードや直リンクでも同じ画面を出し直す方法
- MUIのテーマ・Grid・Skeletonを組み合わせた画面の作り方
- Cypressで画面遷移を一通り操作するE2Eテストの書き方

## 参考

- [ホットペッパーグルメサーチAPI リファレンス](https://webservice.recruit.co.jp/doc/hotpepper/reference.html)
