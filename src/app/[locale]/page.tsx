import { setLingui } from "@/i18n/server";
import { Trans } from "@lingui/macro";
import { Locale } from "@/i18n/vars";

type Props = {
  params: {
    locale: Locale;
  };
};

export default function Home({ params }: Props) {
  setLingui(params.locale);

  return (
    <main className="min-h-screen p-5">
      <p className="font-bold">
        <Trans>Hello, world!</Trans>
      </p>
    </main>
  );
}
