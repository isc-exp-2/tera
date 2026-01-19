# 環境について
このドキュメントでは、アプリケーションの本番環境や開発環境について説明します。

# 本番環境
本番環境は、実際にユーザーがアクセスして利用する環境です。以下の設定が適用されています。
- **コード**: `main` ブランチが本番環境にデプロイされます。
- **デプロイ先**: Vercel
- **ドメイン**: [`tera.suzuki3.jp`](https://tera.suzuki3.jp)（本運用時は移行する必要あり）[`tera-phi.vercel.app`](https://tera-phi.vercel.app)
- **データベース**: Firebase Firestore
- **認証**: Firebase Authentication

# 開発環境
本番環境以外に、開発環境があります。以下の設定が適用されています。

**データベースや認証は本番環境と同じ Firebase に繋がっていることに注意**
- **コード**: `develop` ブランチが開発環境にデプロイされます。
- **デプロイ先**: Vercel
- **ドメイン**: [`dev.tera.suzuki3.jp`](https://dev.tera.suzuki3.jp)（本運用時は移行する必要あり）
- **データベース**: Firebase Firestore
- **認証**: Firebase Authentication

# Preview 環境
Pull Request ごとに Preview 環境が自動的に作成されますが、毎回ドメインが変わるため、Firebase Authentication が動きません。つまり、Preview 環境ではログインできません。

# 利用可能なドメイン
2026/01/18 時点で以下のドメインが使用されています。
- [`tera-phi.vercel.app`](https://tera-phi.vercel.app): これは、Vercel 上でホストされている本番環境のドメインです。これは Vercel が自動的に提供するドメインであり、変更することはできません。
- [`tera.suzuki3.jp`](https://tera.suzuki3.jp): 本番環境のドメインです。これは [suzuki3jp](https://github.com/suzuki3jp) が管理しているので、本運用時にはEXPのドメインに変更するか、上記の Vercel ドメインを使用する必要があります。
- [`dev.tera.suzuki3.jp`](https://dev.tera.suzuki3.jp): これは開発環境用のドメインです。これも `tera.suzuki3.jp` と同様に、将来的に変更する必要があります。Vercel は develop ブランチにプッシュされる度に新しいドメインでデプロイを行うため、Firebase Authentication を使用できるようにするために、カスタムドメインを一時的に割り当てています。

# ドメインを変更する方法
- Vercel 上でカスタムドメインを追加し、DNS 設定を行う。
- Firebase Authentication の設定で、新しいドメインを許可リストに追加する。
  - Firebase のコンソール > Authentication > 設定 > 承認済みドメイン