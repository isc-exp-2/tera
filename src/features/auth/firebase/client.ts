import { type FirebaseOptions, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import "client-only";

const firebaseConfig: FirebaseOptions = {
  // Next.js の制限で、`process.env.[変数]` の形だと必要な環境変数がクライアントにバンドルされないため直指定
  // https://nextjs.org/docs/app/guides/environment-variables#bundling-environment-variables-for-the-browser
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const firebaseClientAuth = getAuth(app);
