"use client";

import Image from "next/image";
import { GoogleLogInButton } from "@/features/user/components/google-log-in-button";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#fff9c4] bg-fixed">
      <div className="w-[480px] rounded-2xl bg-white p-8 shadow-xl">
        {/* ロゴ */}
        <div className="mb-4 flex justify-center">
          <Image
            src="/exp-logo.png"   // ← EXPロゴ画像のパス
            alt="EXP"
            width={160}
            height={80}
            priority
          />
        </div>

        {/* タイトル */}
        <h1 className="mb-2 text-center text-lg font-semibold text-gray-800">
          交通費精算システム
        </h1>

        {/* サブテキスト */}
        <p className="mb-6 text-center text-sm text-gray-500">
          
        </p>

        {/* ログインボタン */}
        <div className="flex justify-center">
          <GoogleLogInButton />
        </div>
      </div>
    </div>
  );
}




 
