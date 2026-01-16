import { ExpLogo } from "@/components/exp-logo";
import { Card } from "@/components/ui/card";
import { GoogleLogInButton } from "@/features/user/components/google-log-in-button";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-120 rounded-2xl bg-white p-8 shadow-xl">
        
        {/* ロゴ */}
        <div className="mb-4 flex justify-center">
          <ExpLogo className="flex w-44 justify-center" />
        </div>

        {/* タイトル */}
        <h1 className="mb-2 text-center font-semibold text-gray-800 text-lg">
          交通費精算システム
        </h1>

        {/* ログインボタン */}
        
          <GoogleLogInButton /> 
          </Card>
         </div>
       );

        }
