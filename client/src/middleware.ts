import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import PocketBase from "pocketbase";

import { i18n } from "./i18n-config";

import Negotiator from "negotiator";

const getUrlWithoutSearchParam = (url: URL, searchParam: string) => {
  const newUrl = new URL(url);
  const params = new URLSearchParams(newUrl.searchParams);
  params.delete(searchParam);
  newUrl.search = params.toString();
  return newUrl;
};

const getLocale = (request: NextRequest): string | undefined => {
  const availableLanguages = i18n.locales as unknown as string[];
  const lang = request.cookies.get("lang");
  const acceptLanguage = request.headers.get("accept-language") ?? undefined;

  return new Negotiator({
    headers: {
      "accept-language": `${lang ? `${lang.value},` : ""}${acceptLanguage}`,
    },
  }).language(availableLanguages);
};

export async function middleware(request: NextRequest) {
  // Skip next internal requests
  if (request.nextUrl.pathname.startsWith("/_next")) return;

  //Skip static icons folder
  if (request.nextUrl.pathname.startsWith("/icons")) return;

  //Skip static 360 folder
  if (request.nextUrl.pathname.startsWith("/360")) return;

  //Skip api routes
  if (request.nextUrl.pathname.startsWith("/api")) return;

  // console.log(request.nextUrl.pathname);

  // Skip favicon requests
  if (request.nextUrl.pathname.endsWith("favicon.ico"))
    return NextResponse.rewrite(`${request.nextUrl.origin}/favicon.ico`);

  // Skip google verification
  // if (request.nextUrl.pathname.endsWith("/google0905d054a6e9b19c.html")) return;

  //Initializing response
  let response = NextResponse.next();
  let newUrl = new URL(request.nextUrl);
  let redirect = false;
  const updateCookies = new Map();
  //Redirect /home to origin
  if (newUrl.pathname.endsWith("/home")) {
    newUrl.pathname = "/";
  }

  // Redirect to the default locale if the pathname is missing the locale
  const pathname = newUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );
  if (pathnameIsMissingLocale) {
    redirect = true;
    const locale = getLocale(request);
    newUrl.pathname = `/${locale}/${pathname}`;
  }

  //Cookie consent
  const consented = newUrl.searchParams.get("consented");
  if (consented !== null) {
    redirect = true;
    newUrl = getUrlWithoutSearchParam(newUrl, "consented");
    if (consented === "true")
      updateCookies.set("consented", {
        name: "consented",
        value: "true",
        httpOnly: true,
        path: "/",
      });
    if (consented === "false") {
      const cookies = request.cookies.getAll();
      const googleAnalyticsCookiesNames = cookies
        .filter((cookie) => cookie.name.startsWith("_ga"))
        .map((cookie) => cookie.name);
      googleAnalyticsCookiesNames.forEach((cookieName) => {
        response.cookies.delete(cookieName);
      });
      updateCookies.set("consented", {
        name: "consented",
        value: "false",
        httpOnly: true,
        path: "/",
      });
    }
  }

  //Handle language change
  const lang = newUrl.searchParams.get("lang");
  if (lang !== null) {
    redirect = true;
    newUrl = getUrlWithoutSearchParam(newUrl, "lang");
    const segments = newUrl.pathname.split("/");
    segments[1] = lang;
    newUrl.pathname = `${segments.join("/")}`;

    const consented = request.cookies.get("consented");
    if (consented?.value === "true") {
      response.cookies.set("lang", lang, {
        httpOnly: true,
        path: "/",
      });
    }
  }

  //Hide UI

  const hideUi = newUrl.searchParams.get("hideUi");
  if (hideUi === "false") {
    newUrl = getUrlWithoutSearchParam(newUrl, "hideUi");
    redirect = true;
  }

  if (redirect) response = NextResponse.redirect(newUrl);
  updateCookies.forEach((cookie) => response.cookies.set(cookie));

  return response;
}
