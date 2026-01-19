# ディレクトリ構造
このドキュメントでは、プロジェクトのディレクトリ構造について説明します。以下は、主要なディレクトリとその役割の概要です。

```
├─app
│  ├─(with-header)       // ヘッダー付きのページ
│  ├─login
│  └─onboarding
├─components
│  └─ui                  // shadcn/ui のコンポーネント
├─constants
├─entities               // ドメインモデルの型やスキーマ
├─errors
├─features               // 機能ごとのモジュール
│  ├─proxy               // 認証・認可のプロキシ。これを proxy.ts でインポートして使用する。
│  ├─request
│  │  ├─components
│  │  ├─mutations
│  │  └─queries
│  └─user
│      ├─components
│      ├─contexts
│      ├─hooks
│      └─queries
├─firebase
├─hooks
└─lib
```

# 特筆すべきディレクトリ
## entities/
ドメインモデルの型やスキーマを定義するディレクトリです。例えば、ユーザーや案件、申請などの valibot で定義されたエンティティや型が含まれます。

Firebase Firestore はスキーマレスのため、アプリケーション側でスキーマを定義し、read/write 時にバリデーションを行っています。

## features/
機能ごとのモジュールを格納するディレクトリです。各機能はさらにサブディレクトリに分割されており、コンポーネント、クエリ、ミューテーションなどが含まれます。

（現状 features/ 配下のディレクトリ間で依存が発生しているので直したい。機能ではなくドメインで切っているのが原因）

### features/proxy
認証・認可のプロキシを提供するモジュールです。`proxy.ts` でインポートして使用します。ここでアクセス制御を一元管理しています。

認証認可の詳細は [認証・認可設計](./03-authentication.md) を参照してください。