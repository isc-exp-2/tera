import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CaseManagementPage() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="bg-indigo-600 px-6 py-2 text-white">
            ＋ 案件を追加
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl">案件を追加</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label className="text-gray-700">
                案件名<span className="text-red-500">*</span>
              </Label>
              <Input placeholder="例: コメット子安小学校" />
            </div>
            <div className="grid gap-3">
              <Label className="text-gray-700">
                交通費金額（円）<span className="text-red-500">*</span>
              </Label>
              <Input placeholder="例: 200" />
            </div>
            <Label className="text-gray-700">
              案件のステータス<span className="text-red-500">*</span>
            </Label>
            <Select>
              <SelectTrigger className="w-full bg-gray-100">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exp">EXP.（EXP.が費用負担）</SelectItem>
                <SelectItem value="external">外部（外部が費用負担）</SelectItem>
              </SelectContent>
              <Label className="text-gray-500 text-xs">
                ステータスは合計金額の計算に使用されます
              </Label>
            </Select>
          </div>
          {/* <DialogFooter> */}
          <div className="flex w-full gap-4 pt-4">
            <DialogClose asChild>
              <Button variant="outline" className="flex-1 py-5">
                キャンセル
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="flex-1 bg-indigo-600 py-5 text-white"
            >
              <Save />
              追加
            </Button>
          </div>
          {/* </DialogFooter> */}
        </DialogContent>
      </form>
    </Dialog>
  );
}
