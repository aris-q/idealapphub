import Navbar from "../../components/Navbar";
import ProductsSection from "../../components/ProductsSection";
import Footer from "../../components/Footer";
import { db } from "../../lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

export const dynamic = "force-dynamic";

export const metadata = { title: "Products | IdealAppHub" };

async function getProducts() {
  try {
    const q = query(collection(db, "products"), orderBy("name", "asc"));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("[PRODUCTS PAGE] Fetched:", products.length);
    return products;
  } catch (err) {
    console.error("[PRODUCTS PAGE] Fetch error:", err.message);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main style={{ minHeight: "70vh" }}>
        <ProductsSection products={products} />
      </main>
      <Footer />
    </>
  );
}
