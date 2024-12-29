"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  const whatsappNumber = "905532808273";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="container px-4 py-8 md:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">İletişim</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Clock className="w-5 h-5 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Çalışma Saatleri</h3>
                <div className="text-muted-foreground space-y-1">
                  <p>Hafta içi: 09:00 - 20:00</p>
                  <p>Cumartesi: 10:00 - 16:00</p>
                  <p>Pazar: Kapalı</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Telefon</h3>
                <p className="text-muted-foreground">
                  <a href="tel:+905532808273" className="hover:underline">
                    +90 553 280 82 73
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MessageSquare className="w-5 h-5 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">WhatsApp</h3>
                <p className="text-muted-foreground">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    WhatsApp ile mesaj gönderin
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">E-posta</h3>
                <p className="text-muted-foreground">
                  <a href="mailto:info@otocpap.com" className="hover:underline">
                    info@otocpap.com
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 mt-1" />
              <div>
                <h3 className="font-semibold mb-1">Adres</h3>
                <p className="text-muted-foreground">
                  Dönüşüm Medikal Uyku Ve Solunum Cihazları
                  <br />
                  Kartaltepe, Torkam E5, Süvari Cd. No:10 Ofis 21
                  <br />
                  34295 Küçükçekmece/İstanbul
                </p>
              </div>
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input placeholder="Adınız" />
              <Input placeholder="Soyadınız" />
            </div>
            <Input type="email" placeholder="E-posta adresiniz" />
            <Input placeholder="Konu" />
            <Textarea placeholder="Mesajınız" className="min-h-[120px]" />
            <Button type="submit" className="w-full">
              Gönder
            </Button>
          </form>
        </div>

        <div className="aspect-video w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.1799548644376!2d28.796517475858064!3d40.999434271351795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa39132b2e789%3A0x6f8c76fd006519ba!2zRMO2bsO8xZ_DvG0gTWVkaWthbCBVeWt1IFZlIFNvbHVudW0gQ2loYXpsYXI!5e0!3m2!1str!2str!4v1735485773813!5m2!1str!2str"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
