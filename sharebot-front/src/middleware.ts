import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { accountTH, type TokenInfoT } from "@/system/token_holders";


export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;


  // console.log("middleware:", pathname, searchParams.toString());

  const res = NextResponse.next();

  const accountToken = accountTH.decodeFromCookie({ cookies, req: request, res });

  // const isAccountLoggedIn = true;
  const isAccountLoggedIn = accountToken && accountToken.token && accountToken.expiresAt > Date.now() / 1000;

  if (isAccountLoggedIn ) {
    if (pathname == "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/g/")) {
      // if pathname is /g/:groupKey, then redirect to /?groupKey=:groupKey
      const pathItems = pathname.split("/");
      const groupKey = pathItems[2];
      if (!(["create"].includes(groupKey)) && (pathItems.length == 3 || pathItems[3] == "")) {
        return NextResponse.redirect(new URL(`/g/${groupKey}/c`, request.url));
      }
    }
  }

  if (!isAccountLoggedIn ) {
    if (pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    if (pathname.startsWith("/g/")) {
      // if pathname is /g/:groupKey, then redirect to /?groupKey=:groupKey
      const groupKey = pathname.split("/")[2];
      return NextResponse.redirect(new URL(`/?groupKey=${groupKey}`, request.url));
    }
  }

  return res;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|images|icons).*)",
  ],
};
