import { HeroSlider } from "@/components/hero-slider";
import { ProductSlider } from "@/components/product-slider";
import { FeaturedProducts } from "@/components/featured-products";
import { Newsletter } from "@/components/newsletter";

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSlider />
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              En Çok Beğenilen Ürünler
            </h2>
            <ProductSlider />
          </div>
        </section>
        <section className="py-20 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">
              Öne Çıkan Ürünler
            </h2>
            <FeaturedProducts />
          </div>
        </section>
      </main>
      <Newsletter />
    </div>
  );
}
