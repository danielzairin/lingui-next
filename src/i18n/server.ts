import { setupI18n, type I18n } from "@lingui/core";
import { getI18n, setI18n as setLinguiI18n } from "@lingui/react/server";
import { messages as enMessages } from "./en/messages";
import { messages as msMessages } from "./ms/messages";
import * as nextjs from "next/navigation";
import { cookies, headers } from "next/headers";
import {
  DEFAULT_LOCALE,
  Locale,
  LOCALE_COOKIE,
  LOCALE_HEADER_KEY,
} from "./vars";

const englishI18n = setupI18n({
  locale: "en",
  messages: {
    en: enMessages,
  },
});

const bahasaI18n = setupI18n({
  locale: "ms",
  messages: {
    ms: msMessages,
  },
});

function getI18nByLocale(locale: Locale): I18n {
  if (locale === "en") {
    return englishI18n;
  }
  return bahasaI18n;
}

function getRequestLocale(): Locale {
  const locale = headers().get(LOCALE_HEADER_KEY);
  if (!locale) {
    throw Error(`missing '${LOCALE_HEADER_KEY}' value from http header`);
  }
  return locale as Locale;
}

export function getLingui() {
  let i18nCtx = getI18n();
  if (!i18nCtx) {
    // set the i18n context then get it again
    setLinguiI18n(getI18nByLocale(getRequestLocale()));
    i18nCtx = getI18n();
    if (!i18nCtx) {
      throw Error("failed to get i18n context");
    }
  }
  return i18nCtx;
}

// Include locale in NextJS's redirect
export const redirect: typeof nextjs.redirect = (url, type) => {
  const locale: Locale =
    (cookies().get(LOCALE_COOKIE)?.value as Locale) || DEFAULT_LOCALE;
  if (!URL.canParse(url)) {
    const urlWithLocale = `/${locale}${url}`;
    nextjs.redirect(urlWithLocale, type);
  }
  nextjs.redirect(url, type);
};
