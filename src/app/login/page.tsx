import { ExpLogo } from "@/components/exp-logo";
import { GoogleLogInButton } from "@/features/user/components/google-log-in-button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-[#e0f7fa] via-[#f1f8e9] to-[#fff9c4] bg-fixed">
      <div className="w-120 rounded-2xl bg-white p-8 shadow-xl">
        {/* ロゴ */}
        <div className="mb-4 flex justify-center">
          <ExpLogo className="flex w-44 justify-center" />
        </div>

        {/* タイトル */}
        <h1 className="mb-2 text-center font-semibold text-gray-800 text-lg">
          交通費精算システム
        </h1>

        {/* サブテキスト */}
        <p className="mb-6 text-center text-gray-500 text-sm"></p>

        {/* ログインボタン */}
        <div className="flex justify-center">
          <GoogleLogInButton />
        </div>
      </div>
    </div>
  );
}
