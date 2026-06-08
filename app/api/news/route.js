import { db } from "../../../lib/firebase";
import { collection, getDocs, addDoc, orderBy, query } from "firebase/firestore";

export async function GET() {
  try {
    console.log("[API/NEWS] Fetching all news");
    const q = query(collection(db, "news"), orderBy("date", "desc"));
    const snapshot = await getDocs(q);
    const news = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log("[API/NEWS] Fetched:", news.length, "items");
    return Response.json(news);
  } catch (err) {
    console.error("[API/NEWS] GET error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("[API/NEWS] Adding:", body);
    const docRef = await addDoc(collection(db, "news"), body);
    console.log("[API/NEWS] Added id:", docRef.id);
    return Response.json({ id: docRef.id, ...body });
  } catch (err) {
    console.error("[API/NEWS] POST error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
