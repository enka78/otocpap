"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setTheme, setLocale } from "@/store/themeSlice";
import { ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { MegaMenu } from "./mega-menu";

export function Navbar() {
  const t = useTranslations();
  const pathname = usePathname();
  const { theme: currentTheme, setTheme: setNextTheme } = useTheme();
  const dispatch = useDispatch();
  const { theme: reduxTheme, currentLocale } = useSelector(
    (state: RootState) => state.theme
  );
  const [mounted, setMounted] = React.useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navigation = [
    { href: "/", label: t("navigation.home") },
    { href: "/blog", label: t("navigation.blog") },
    { href: "/sleep-test", label: t("navigation.sleepTest") },
    { href: "/about", label: t("navigation.about") },
    { href: "/contact", label: t("navigation.contact") },
  ];

  React.useEffect(() => {
    if (reduxTheme) {
      setNextTheme(reduxTheme);
    }
  }, [reduxTheme, setNextTheme]);

  const toggleTheme = () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    dispatch(setTheme(newTheme));
    setNextTheme(newTheme);
  };

  const handleLocaleChange = () => {
    const newLocale = currentLocale === "tr" ? "en" : "tr";
    dispatch(setLocale(newLocale));
    const segments = pathname.split("/");
    segments[1] = newLocale;
    window.location.href = segments.join("/");
  };

  if (!mounted) {
    return null;
  }

  return (
    <header
      className="sticky top-0 z-50 w-full border-b"
      style={{
        backgroundColor: currentTheme === "dark" ? "#1c202c" : "#fcf8e3",
      }}
    >
      <nav className="flex items-center px-4 md:container py-[5px]">
        <div className="flex flex-1 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div
              className="relative w-[42px] h-[42px] md:w-[60px] md:h-[60px] rounded-full"
              style={{
                backgroundColor:
                  currentTheme === "dark" ? "#1c202c" : "#fcf8e3",
              }}
            >
              <Image
                src="/images/logo.png"
                alt="OTOCPAP Logo"
                width={42}
                height={42}
                className="object-contain md:w-[60px] md:h-[60px]"
                priority
                unoptimized
              />
            </div>
            <span className="font-bold text-base md:text-lg">OTOCPAP</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href={`/${currentLocale}/`}
              className="text-sm font-medium relative group"
            >
              {t("navigation.home")}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>

            <div
              className="relative"
              onMouseLeave={() => setIsMegaMenuOpen(false)}
            >
              <Button
                variant="ghost"
                className="text-sm font-medium h-auto p-0 hover:bg-transparent relative"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
              >
                {t("navigation.products")}
                <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:rotate-180" />
                <div className="absolute -bottom-5 left-0 w-full h-5" />
              </Button>
              <MegaMenu
                isOpen={isMegaMenuOpen}
                currentLocale={currentLocale}
                onClose={() => setIsMegaMenuOpen(false)}
                isMobile={false}
              />
            </div>

            {navigation.slice(1).map((item) => (
              <Link
                key={item.href}
                href={`/${currentLocale}${item.href}`}
                className="text-sm font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:scale-110 transition-transform"
            >
              {currentTheme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLocaleChange}
              className="hover:scale-110 transition-transform"
            >
              {currentLocale === "tr" ? "en" : "tr"}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background md:hidden">
          <div className="px-4">
            <div className="flex justify-between items-center mb-4 py-4">
              <h2 className="text-lg font-bold">Menü</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-4">
              <Link
                href={`/${currentLocale}/`}
                className="block p-2 hover:bg-accent rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("navigation.home")}
              </Link>
              <div
                className="block p-2 hover:bg-accent rounded-lg cursor-pointer"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsMegaMenuOpen(true);
                }}
              >
                {t("navigation.products")}
              </div>
              {navigation.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={`/${currentLocale}${item.href}`}
                  className="block p-2 hover:bg-accent rounded-lg"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Mega Menu - Only show when isMobile is true */}
      {isMegaMenuOpen && isMobile && (
        <MegaMenu
          isOpen={true}
          currentLocale={currentLocale}
          onClose={() => setIsMegaMenuOpen(false)}
          isMobile={true}
        />
      )}
    </header>
  );
}
