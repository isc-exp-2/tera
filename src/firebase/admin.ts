import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { envKeys } from "@/constants";
import { getEnv } from "@/lib/get-env";

import "server-only";

const adminApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert({
        projectId: getEnv(envKeys.firebase.projectId),
        clientEmail: getEnv(envKeys.firebase.clientEmail),
        privateKey: getEnv(envKeys.firebase.privateKey).replace(/\\n/g, "\n"), // 改行コードの置換
      }),
    });

export const firebaseAdminAuth = getAuth(adminApp);

export const firestore = getFirestore();
