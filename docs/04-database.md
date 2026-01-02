# データベースについて
このドキュメントでは、アプリケーションで使われているデータベースとその設計について説明します。

## データベースの構造
TERA では Firebase Firestore をデータベースとして使用しています。Firestore は NoSQL 型のドキュメント指向データベースです。
構造としては以下です:
```ts
{
  users: { // ユーザーコレクション
    [userId]: { // Firebase Authentication の UID
      firstName: "John",
      lastName: "Doe",
      departmentId: "departmentId",
      enrollmentYear: 2025,
      role: "member | leader | teacher | admin",
    },
  },
  departments: {
    [departmentId]: {
      name: "Department Name",
    },
  },
  projects: {
    [projectId]: {
      name: "Project Name",
      expense: 1000,
      status: "exp | external",
      createdBy: "userId",
      createdAt: "timestamp",
    },
  },
  requests: {
    [requestId]: {
      projectId: "projectId",
      requestedBy: "userId",
      date: "timestamp",
      memo: "string",
      status: "pending | approved | rejected | paid",
    },
  },
};
```

## データベースに関するアプリケーションコードの実装
データベースへのアクセスは主に Firebase Admin SDK を使用してサーバーサイドで行われます。
Firebase Admin SDK は Firebase Sucurity Rules を完全にバイパスするので、認証・認可チェックをサーバーサイドで確実に行う必要があることに注意してください。

クライアントサイドからのデータベースアクセスは、基本的に Server Functions を介して行われます。認証認可チェックはすべて Server Functions 内で行います。
そしてクライアントは Tanstack Query を使用して Server Functions と通信します。

また、データベースから取得したデータや更新するデータは全て valibot スキーマでバリデーションを行っています。
"pending" や "approved" などのステータス値も valibot の enum 機能を使ってバリデーションしています。