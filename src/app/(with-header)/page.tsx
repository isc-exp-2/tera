import Listcard from "@/components/Listcard"
import { FileText } from 'lucide-react';

export default function () {
  return <main className="py-8 max-w-6xl mx-auto">
  <div className="mb-8">
    <h1 className="text-xl font-medium mb-2 tracking-[-0.3em]">ようこそ</h1>
    <p className="text-gray-600 tracking-[-0.14em]">メニューから操作を選択してください</p>
  </div>

<Listcard
  title="申請一覧（個人）"
  description="自分の交通費申請を確認・管理できます"  
  icon={FileText}
  iconclassName="text-indigo-600 w-6 h-6"
  href="@/me/requests"
/>
  </main>;
}