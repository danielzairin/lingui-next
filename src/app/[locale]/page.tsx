import { msg, Trans } from "@lingui/macro";
import { Locale } from "@/i18n/vars";
import { getLingui } from "@/i18n/server";

type Props = {
  params: {
    locale: Locale;
  };
};

export default function Home({ params }: Props) {
  const { i18n } = getLingui();

  return (
    <main className="min-h-screen p-5">
      <p>Locale: {i18n.locale}</p>
      <p className="font-bold">
        <Trans>Hello, world!</Trans>
      </p>
      <Card />
    </main>
  );
}

function Card() {
  const { _ } = getLingui();

  return (
    <div className="p-4 shadow border rounded" title={_(msg`Hello, world!`)}>
      <Trans>Hello, world!</Trans>
    </div>
  );
}
