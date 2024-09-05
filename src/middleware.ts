import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import {
  DEFAULT_LOCALE,
  Locale,
  LOCALE_COOKIE,
  LOCALE_HEADER_KEY,
} from "./i18n/vars";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const locales: Locale[] = ["en", "ms"];

function getLocaleFromHeaders(req: Request): Locale {
  const headers = Object.fromEntries(req.headers.entries());
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, DEFAULT_LOCALE) as Locale;
}

function getLocaleFromPathname(pathname: string): Locale | null {
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return null;
}

function getLocaleFromCookie(): Locale | null {
  const cookie = cookies().get(LOCALE_COOKIE)?.value;
  for (const locale of locales) {
    if (cookie === locale) {
      return locale;
    }
  }
  return null;
}

function middleware(req: NextRequest, ev: NextFetchEvent) {
  const { pathname } = req.nextUrl;
  let locale = getLocaleFromPathname(pathname);

  if (!locale) {
    // If locale is not in the pathname, try to get it from the cookie or headers
    locale = getLocaleFromCookie() || getLocaleFromHeaders(req);
    req.nextUrl.pathname = `/${locale}${pathname}`;
    const res = NextResponse.redirect(req.nextUrl);
    res.cookies.set(LOCALE_COOKIE, locale);
    return res;
  }

  const reqHeaders = new Headers(req.headers);
  reqHeaders.set(LOCALE_HEADER_KEY, locale);

  const res = NextResponse.next({ request: { headers: reqHeaders } });
  res.cookies.set(LOCALE_COOKIE, locale);
  return res;
}

export default middleware;

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
  ],
};
