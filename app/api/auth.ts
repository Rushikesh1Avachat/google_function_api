// pages/api/auth.ts
import { GoogleAuth } from "google-auth-library";

export default async function handler(req:any, res:any) {
  const auth = new GoogleAuth();
  res.json({ success: true });
}

