import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { cache } from "react";

async function fetchWebsiteFromFirebase(slug: string) {
  if (!slug || typeof slug !== "string") return null;

  try {
    const q = query(collection(db, "websites"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
  } catch (error) {
    console.error("Error fetching website:", error);
    return null;
  }
}

// 🔥 Dynamic cache function per tenant slug
export const getWebsiteData = cache(async (slug: string) => {
  if (!slug || typeof slug !== "string") {
    return null;
  }

  try {
    const q = query(collection(db, "websites"), where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;
    return snapshot.docs[0].data();
  } catch (error) {
    console.error("Error fetching website:", error);
    return null;
  }
});