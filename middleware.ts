import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … if they contain a dot (e.g. `favicon.ico`)
    "/((?!api|_next|_vercel|.*\\..*|favicon.ico).*)",
    // However, match all pathnames within `/api`, except for
    // - … if they start with `/api/auth` or `/api/webhooks`
    // - … if they contain a dot (e.g. `favicon.ico`)
    "/api/((?!auth|webhooks|.*\\..*|trpc).*)",
  ],
};
