"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { googleLoginAllowedDomain, urls } from "@/constants";
import { logIn } from "@/features/user/log-in";
import { firebaseClientAuth } from "@/firebase/client";

export function GoogleLogInButton() {
  const router = useRouter();

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
    router.push(urls.home);
  }

  return (
    <Button
      type="button"
      onClick={onClick}
      className="w-full cursor-pointer rounded-lg bg-sky-600 py-2 text-white hover:bg-sky-400"
    >
      Googleでログイン（gn.iwasaki.ac.jp のみ）
    </Button>
  );
}
