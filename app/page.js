import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import NewsSection from "../components/NewsSection";
import ProductsSection from "../components/ProductsSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <NewsSection />
        <ProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}