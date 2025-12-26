"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { googleLoginAllowedDomain } from "@/constants";
import { getAuthSelf } from "@/features/user/get-self";
import { logIn } from "@/features/user/log-in";
import { logOut } from "@/features/user/log-out";
import { firebaseClientAuth } from "@/firebase/client";

export default function () {
  async function onLogInClick() {
    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      hd: googleLoginAllowedDomain,
    });
    const cred = await signInWithPopup(firebaseClientAuth, googleProvider);
    const idToken = await cred.user.getIdToken();
    await logIn(idToken);
  }

  async function onLogOutClick() {
    const self = await getAuthSelf();
    if (self) logOut(self.uid);
  }

  return (
    <>
      <button type="button" onClick={onLogInClick}>
        ログイン
      </button>
      <button type="button" onClick={onLogOutClick}>
        {" "}
        ログアウト
      </button>
    </>
  );
}
