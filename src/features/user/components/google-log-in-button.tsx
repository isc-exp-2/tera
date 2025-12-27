"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { googleLoginAllowedDomain } from "@/constants";
import { logIn } from "@/features/user/log-in";
import { firebaseClientAuth } from "@/firebase/client";

export function GoogleLogInButton() {
  async function onClick() {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      // gn.iwasaki.ac.jp のみ許可
      // クライアントサイドでの制限なので、セキュリティ上強制力はないが、UX向上のために設定する
      // 実際は、registerUser でドメインチェックを行う
      hd: googleLoginAllowedDomain,
    });
    const cred = await signInWithPopup(firebaseClientAuth, googleProvider);
    const idToken = await cred.user.getIdToken();
    await logIn(idToken);
  }

  return (
    <button type="button" onClick={onClick}>
      Googleでログイン（gn.iwasaki.ac.jp のみ）
    </button>
  );
}
