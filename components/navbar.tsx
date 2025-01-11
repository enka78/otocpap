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
import {
  ChevronDown,
  Menu,
  Moon,
  Sun,
  X,
  User,
  LogOut,
  Settings,
  ShoppingBag,
} from "lucide-react";
import { MegaMenu } from "./mega-menu";
import { CartSheet } from "./cart-sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
  const router = useRouter();

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

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

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

            <Link
              href={`/${currentLocale}/shop`}
              className="flex items-center gap-2 text-sm font-medium relative group"
            >
              <span>Shop</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <CartSheet />

            {isAuthenticated && (
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:scale-110 transition-transform relative"
                >
                  <User className="h-4 w-4" />
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </Button>
                <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                    <Link
                      href={`/${currentLocale}/profile`}
                      className={cn(
                        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Kullanıcı Bilgilerim</span>
                    </Link>
                    <Link
                      href={`/${currentLocale}/orders`}
                      className={cn(
                        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      <span>Siparişlerim</span>
                    </Link>
                    <button
                      onClick={() => {
                        dispatch(logout());
                        router.push(`/${currentLocale}/login`);
                      }}
                      className={cn(
                        "relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-red-100 text-red-600 hover:text-red-700"
                      )}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

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
              <Link
                href={`/${currentLocale}/shop`}
                className="block p-2 hover:bg-accent rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              {isAuthenticated && (
                <>
                  <div className="h-px bg-border" />
                  <Link
                    href={`/${currentLocale}/profile`}
                    className="flex items-center p-2 hover:bg-accent rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Kullanıcı Bilgilerim</span>
                  </Link>
                  <Link
                    href={`/${currentLocale}/orders`}
                    className="flex items-center p-2 hover:bg-accent rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span>Siparişlerim</span>
                  </Link>
                  <button
                    className="flex items-center w-full p-2 hover:bg-accent rounded-lg text-red-600"
                    onClick={() => {
                      dispatch(logout());
                      router.push(`/${currentLocale}/login`);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Çıkış Yap</span>
                  </button>
                </>
              )}
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
