import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NewsSection from "../components/NewsSection";
import ProductsSection from "../components/ProductsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

async function getNews() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, { cache: "no-store" });
    const data = await res.json();
    console.log("[HOME] News fetched:", data.length);
    return data;
  } catch (err) {
    console.error("[HOME] News fetch error:", err.message);
    return [];
  }
}

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, { cache: "no-store" });
    const data = await res.json();
    console.log("[HOME] Products fetched:", data.length);
    return data;
  } catch (err) {
    console.error("[HOME] Products fetch error:", err.message);
    return [];
  }
}

export default async function Home() {
  const news = await getNews();
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NewsSection news={news} />
        <ProductsSection products={products} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
