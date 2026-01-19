export function toHalfWidth(str: string): string {
  return str.replace(/[０-９]/g, (s: string) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
}
