import { useLingui } from "@lingui/react";
import NextLink, { type LinkProps } from "next/link";

// Include locale in NextJS's Link
export function Link(
  props: LinkProps & {
    href: string;
    children?: React.ReactNode;
  }
) {
  const {
    i18n: { locale },
  } = useLingui();
  const hrefWithLocale = `/${locale}${props.href}`;
  return <NextLink {...props} href={hrefWithLocale} />;
}
