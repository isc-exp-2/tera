import { useState } from "react";
import type { GenericSchema } from "valibot";
import v from "@/entities/valibot";

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

  // 型推論厳格にするためas const
  return [value, handleSetValue, error] as const;
}
