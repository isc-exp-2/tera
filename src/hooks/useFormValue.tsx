import { useState } from "react";
import type { GenericSchema } from "valibot";
import v from "@/entities/valibot";

/**
 * フォームの各値とバリデーションエラーを管理するカスタムフック
 * @param initialValue 初期値
 * @param schema Valibotのスキーマ
 * @returns [現在の値, 値を更新する関数, エラーメッセージ(エラーがなければnull) ]
 */

export function useFormValue<T>(
  initialValue: T,
  schema: GenericSchema<unknown, T>,
) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);

  function handleSetValue(newValue: T) {
    const result = v.safeParse(schema, newValue);
    setValue(newValue);

    if (result.success) {
      setError(null);
    } else {
      setError(result.issues[0].message);
    }
  }
  function reset() {
    setValue(initialValue);
    setError(null);
  }

  return [value, handleSetValue, error, reset] as const;
}
