"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">Hızlı Erişim</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground"
              >
                Ana Sayfa
              </Link>
              <Link
                href="/products"
                className="text-muted-foreground hover:text-foreground"
              >
                Ürünler
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground"
              >
                Faydalı Bilgiler
              </Link>
              <Link
                href="/sleep-test"
                className="text-muted-foreground hover:text-foreground"
              >
                Evde Uyku Testi
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-bold mb-4">Kurumsal</h3>
            <nav className="flex flex-col space-y-2">
              <Link
                href="/about"
                className="text-muted-foreground hover:text-foreground"
              >
                Hakkımızda
              </Link>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-foreground"
              >
                İletişim
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-foreground"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-foreground"
              >
                Kullanım Koşulları
              </Link>
            </nav>
          </div>
          <div>
            <h3 className="font-bold mb-4">İletişim</h3>
            <div className="text-muted-foreground space-y-2">
              <p>Kartaltepe, Torkam E5, Süvari Cd. No:10 Ofis 21</p>
              <p>34295 Küçükçekmece/İstanbul</p>
              <p>Tel: +90 553 280 82 73</p>
              <p>E-posta: info@otocpap.com</p>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4">Çalışma Saatleri</h3>
            <div className="text-muted-foreground space-y-2">
              <p>Hafta içi: 09:00 - 20:00</p>
              <p>Cumartesi: 10:00 - 16:00</p>
              <p>Pazar: Kapalı</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Dönüşüm Medikal. Tüm hakları
            saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
