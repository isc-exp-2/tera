import { NextRequest } from "next/server";

export function createMockReqWithPathname(pathname: string): NextRequest {
  return new NextRequest(`http://localhost${pathname}`);
}
