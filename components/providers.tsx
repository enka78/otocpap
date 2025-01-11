"use client";

import React from "react";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/toaster";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/store";

async function getMessages(locale: string) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale: ${locale}`, error);
    return {};
  }
}

export function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const [messages, setMessages] = React.useState({});

  React.useEffect(() => {
    getMessages(locale).then(setMessages).catch(console.error);
  }, [locale]);

  return (
    <ReduxProvider store={store}>
      <NextIntlClientProvider messages={messages} locale={locale}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </NextIntlClientProvider>
    </ReduxProvider>
  );
}
