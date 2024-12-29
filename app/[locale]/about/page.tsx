"use client";

import React from "react";

export default function AboutPage() {
  return (
    <div className="container px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Hakkımızda</h1>

      <div className="prose max-w-none">
        <p className="mb-4">
          Dönüşüm Medikal olarak, uyku ve solunum sağlığı alanında uzmanlaşmış
          bir sağlık ekipmanları tedarikçisiyiz. Misyonumuz, hastalarımıza en
          kaliteli CPAP, BiPAP ve oksijen konsantratörü cihazlarını sunarak
          yaşam kalitelerini artırmaktır.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Değerlerimiz</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Hasta odaklı yaklaşım</li>
          <li>Yüksek kalite standartları</li>
          <li>Profesyonel hizmet</li>
          <li>Sürekli gelişim</li>
          <li>Güvenilirlik ve şeffaflık</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Hizmetlerimiz</h2>
        <p className="mb-4">
          Uyku apnesi ve solunum rahatsızlıkları için geniş bir ürün yelpazesi
          sunuyoruz:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>CPAP ve BiPAP cihazları</li>
          <li>Oksijen konsantratörleri</li>
          <li>Maske ve aksesuarlar</li>
          <li>Teknik servis ve bakım</li>
          <li>Ürün danışmanlığı</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Neden Biz?</h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Alanında uzman ekip</li>
          <li>Geniş ürün yelpazesi</li>
          <li>Rekabetçi fiyatlar</li>
          <li>Hızlı teslimat</li>
          <li>Satış sonrası destek</li>
        </ul>

        <p className="mt-8">
          Dönüşüm Medikal olarak, müşterilerimize en iyi hizmeti sunmak için
          sürekli kendimizi geliştiriyor ve sektördeki yenilikleri takip
          ediyoruz. Sağlığınız bizim önceliğimizdir.
        </p>
      </div>
    </div>
  );
}
