import db from "@/config/firebase";
import { any, string } from "zod";


const userId = "someUserId"; // Fetch this from authentication or request
const userRef = db.collection("users").doc(userId);
const userDoc = await userRef.get();

if (!userDoc.exists) {
  throw new Error("User not found");
}

