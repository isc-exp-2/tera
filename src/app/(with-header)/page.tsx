import { FileText, FolderKanban, UsersRound } from "lucide-react";
import ListCard from "@/components/list-card";
import { urls } from "@/constants";
import { hasEnoughRole, Role } from "@/entities/role";
import { getSelf } from "@/features/user/get-self";

export default async function () {
  const self = await getSelf();
  if (!self) return;
  return (
    <main className="mx-auto max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="mb-2 font-medium text-gray-900 text-xl tracking-[-0.3em]">
          ようこそ
        </h1>
        <p className="text-gray-600 tracking-[-0.14em]">
          メニューから操作を選択してください
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ListCard
          title="申請一覧（個人）"
          description="自分の交通費申請を確認・管理できます"
          iconbg="bg-indigo-100"
          icon={FileText}
          iconclassName="text-indigo-600 w-6 h-6"
          href={urls.merequests}
        />

        {hasEnoughRole(self.role, Role.Leader) && (
          <>
            <ListCard
              title="申請一覧（全体）"
              description="全メンバーの申請を承認・精算できます"
              iconbg="bg-green-100"
              icon={UsersRound}
              iconclassName="text-green-600 w-6 h-6"
              href={urls.managerequests}
            />

            <ListCard
              title="案件一覧"
              description="交通費申請の案件を管理できます"
              iconbg="bg-purple-100"
              icon={FolderKanban}
              iconclassName="text-purple-600 w-6 h-6"
              href={urls.manageProjects}
            />
          </>
        )}
      </div>
    </main>
  );
}
