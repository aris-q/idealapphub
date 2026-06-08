import { db } from "../../../lib/firebase";
import { collection, getDocs, addDoc, orderBy, query } from "firebase/firestore";

export async function GET() {
  try {
    console.log("[API/PRODUCTS] Fetching all products");
    const q = query(collection(db, "products"), orderBy("name", "asc"));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("[API/PRODUCTS] Fetched:", products.length, "items");
    return Response.json(products);
  } catch (err) {
    console.error("[API/PRODUCTS] GET error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[API/PRODUCTS] Adding:", body);
    const docRef = await addDoc(collection(db, "products"), body);
    console.log("[API/PRODUCTS] Added id:", docRef.id);
    return Response.json({ id: docRef.id, ...body });
  } catch (err) {
    console.error("[API/PRODUCTS] POST error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
