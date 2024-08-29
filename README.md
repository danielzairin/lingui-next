# NextJS i18n with Lingui

An i18n (internationalization) implementation for [NextJS](https://nextjs.org) using [Lingui](https://lingui.dev/).

### Locale Detection

The logic for detecting which locale to use is in `src/app/middleware.ts`.

The locale is chosen based on this order:

1. Locale from pathname
2. Locale from a request cookie
3. Locale from HTTP headers

### Navigation with Link, useRouter and redirect

NextJS's `<Link />`, client-side `useRouter()` hook and server-side `redirect()` function were extended to include the current locale.

For example, you can write the href as `<Link href="/about-us" />` and the final href will be **/en/about-us**

These components can be imported with the following statements:

```
import { Link } from "@/i18n/link";
import { useRouter } from "@/i18n/client";
import { redirect } from "@/i18n/redirect";
```

### Translating Messages

Lingui has tutorials on how to use it's APIs for translating React apps:

1. React (Client Components) Tutorial - https://lingui.dev/tutorials/react
2. React Server Components Tutorial - https://lingui.dev/tutorials/react-rsc

In this codebase, you can use the following npm scripts to extract and compile messages:

```
npm run lingui:extract
npm run lingui:compile
```
