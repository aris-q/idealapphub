import { db } from "../../../../lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export async function DELETE(req, { params }) {
  try {
    console.log("[API/PRODUCTS] Deleting id:", params.id);
    await deleteDoc(doc(db, "products", params.id));
    console.log("[API/PRODUCTS] Deleted:", params.id);
    return Response.json({ success: true });
  } catch (err) {
    console.error("[API/PRODUCTS] DELETE error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    console.log("[API/PRODUCTS] Updating id:", params.id, body);
    await updateDoc(doc(db, "products", params.id), body);
    return Response.json({ success: true });
  } catch (err) {
    console.error("[API/PRODUCTS] PATCH error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
