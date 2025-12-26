/**
 * 到達しえないが、型システム上到達可能とされているコードパスに到達した場合に呼び出す
 * @param message
 */
export function unreachable(message: string): never {
  throw new Error(`到達不可能なコードに到達しました: ${message}`);
}
