"use client";

import { I18nProvider } from "@lingui/react";
import { useLingui } from "@lingui/react";
import { type Messages, setupI18n } from "@lingui/core";
import * as nextjs from "next/navigation";
import { useState } from "react";
import { Locale } from "./vars";

export function LinguiProvider({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: Locale;
  messages: Messages;
}) {
  const [i18n] = useState(() => {
    return setupI18n({
      locale: locale,
      messages: { [locale]: messages },
    });
  });
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}

// Include locale in NextJS's useRouter
export const useRouter: typeof nextjs.useRouter = () => {
  const {
    i18n: { locale },
  } = useLingui();
  const appRouterInstance = nextjs.useRouter();

  return {
    ...appRouterInstance,
    push: function (href, options) {
      const hrefWithLocale = `/${locale}${href}`;
      appRouterInstance.push(hrefWithLocale, options);
    },
    replace: function (href, options) {
      const hrefWithLocale = `/${locale}${href}`;
      appRouterInstance.push(hrefWithLocale, options);
    },
    prefetch: function (href, options) {
      const hrefWithLocale = `/${locale}${href}`;
      appRouterInstance.prefetch(hrefWithLocale, options);
    },
  };
};

export { useLingui } from "@lingui/react";
