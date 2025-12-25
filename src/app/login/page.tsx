"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseClientAuth } from "@/features/auth/firebase/client";
import { getSelf } from "@/features/auth/get-self";
import { logIn } from "@/features/auth/log-in";
import { logOut } from "@/features/auth/log-out";

export default function () {
  async function onLogInClick() {
    const googleProvider = new GoogleAuthProvider();
    const cred = await signInWithPopup(firebaseClientAuth, googleProvider);
    const idToken = await cred.user.getIdToken();
    await logIn(idToken);
  }

  async function onLogOutClick() {
    const self = await getSelf();
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
