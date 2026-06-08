import { db } from "../../../../lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export async function DELETE(req, { params }) {
  try {
    console.log("[API/NEWS] Deleting id:", params.id);
    await deleteDoc(doc(db, "news", params.id));
    console.log("[API/NEWS] Deleted:", params.id);
    return Response.json({ success: true });
  } catch (err) {
    console.error("[API/NEWS] DELETE error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    console.log("[API/NEWS] Updating id:", params.id, body);
    await updateDoc(doc(db, "news", params.id), body);
    return Response.json({ success: true });
  } catch (err) {
    console.error("[API/NEWS] PATCH error:", err.message);
    return Response.json({ error:

cat > "app/api/news/[id]/route.js" << 'EOF'
import { db } from "../../../../lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";

export async function DELETE(req, { params }) {
  try {
    console.log("[API/NEWS] Deleting id:", params.id);
    await deleteDoc(doc(db, "news", params.id));
    console.log("[API/NEWS] Deleted:", params.id);
    return Response.json({ success: true });
  } catch (err) {
    console.error("[API/NEWS] DELETE error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req, { params }) {
  try {
    const body = await req.json();
    console.log("[API/NEWS] Updating id:", params.id, body);
    await updateDoc(doc(db, "news", params.id), body);
    return Response.json({ success: true });
  } catch (err) {
    console.error("[API/NEWS] PATCH error:", err.message);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
