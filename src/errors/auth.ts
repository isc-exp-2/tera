/**
 * ログインが必要な場面でログインしていない場合のエラー
 */
export class UnauthorizedError extends Error {
  constructor() {
    super("ログインが必要です");
  }
}

/**
 * ログインはしているが、権限が足りない場合のエラー
 */
export class ForbiddenError extends Error {
  constructor() {
    super("アクセス権がありません");
    this.name = "ForbiddenError";
  }
}
