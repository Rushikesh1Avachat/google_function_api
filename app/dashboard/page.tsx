"use client"
import { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "@/firebase/firebaseConfig";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { Account, OAuthProvider, Client } from "appwrite";
export default function Dashboard() {
  const [users, setUsers] = useState<{ id: string; fullName?: string; email?: string; mobile?: string }[]>([]);

  const [form, setForm] = useState({ fullName: "", email: "", mobile: "", password: "", confirmPassword: "" });
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const snapshot = await getDocs(collection(db, "users"));
    setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  };

  const handleAuth = async () => {
     try {
       const account = new Account( new Client);
 
       account.createOAuth2Session(
         OAuthProvider.Google, // Replace with the actual provider name, e.g., 'google'
         'https://localhost:3000/dashboard', // Success redirect URL
         'https://localhost:3000/failure' // Failure redirect URL
     );
     } catch (error) {
       console.error("Google Sign-in Error:", error);
     }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const handleSubmit = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await addDoc(collection(db, "users"), {
      fullName: form.fullName,
      email: form.email,
      mobile: form.mobile,
      password: form.password,
    });
    setForm({ fullName: "", email: "", mobile: "", password: "", confirmPassword: "" });
    router.push("/create");
    router.push("/read");
    router.push("/update");
    router.push("/delete");

  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold text-center mb-6 capitalize"> user data fetched from a Google Cloud</h2>
        <div className="space-y-4">
          <Input placeholder="Full Name" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
          <Input placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <Input placeholder="Mobile" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
          <Input type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <Input type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} />
          <Button className="w-full bg-blue-500 text-white" onClick={handleSubmit}>Submit</Button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <p className="text-gray-600 text-2xl ml-4">OR </p>
          <Button className="w-full  text-white mt-2" onClick={handleAuth}><FcGoogle className="w-5 h-5 size-2"/> Sign Up with Google</Button>
        </div>
      </div>
    </div>
  );
}




