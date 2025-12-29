export function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value === undefined) {
    if (defaultValue !== undefined) return defaultValue;
    throw new MissingEnvError(key);
  }
  return value;
}

class MissingEnvError extends Error {
  constructor(key: string) {
    super(`環境変数 ${key} を設定してください`);
    this.name = "MissingEnvError";
  }
}
