// pages/api/auth.ts
import db from "@/config/firebase";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const userId = auth.currentUser?.uid; // Ensure user is logged in
if (userId) {
  const userRef = db.collection("users").doc(userId);
} else {
  console.error("User is not authenticated");
}

