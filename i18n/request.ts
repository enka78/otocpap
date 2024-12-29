import { getRequestConfig } from "next-intl/server";
import { locales } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    messages,
    locale,
    timeZone: "Europe/Istanbul",
  };
});
