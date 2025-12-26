export * as collectionKeys from "./collection-keys";

export * as cookieKeys from "./cookie-keys";

export * as envKeys from "./env-keys";

/**
 * Google ログインで許可するメールアドレスのドメイン
 * これはクライアントサイドでの制限でしか無いので、おそらく無理やり他ドメインのメールアドレスでログインすることも可能
 */
export const googleLoginAllowedDomain = "gn.iwasaki.ac.jp";
