"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

type User = {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
};

const UpdateUser = () => {
  const [form, setForm] = useState<User>({ id: "", fullName: "", email: "", mobile: "" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        const userDoc = await getDoc(doc(db, "users", id));
        if (userDoc.exists()) {
          setForm({  ...(userDoc.data() as User) });
        }
      };
      fetchUser();
    }
  },  [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.id) {
      const userRef = doc(db, "users", form.id);
      await updateDoc(userRef, {
        fullName: form.fullName,
        email: form.email,
        mobile: form.mobile,
      });
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Update User</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="border p-2 w-full"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full"
          required
        />
        <input
          type="text"
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="border p-2 w-full"
          required
        />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded w-full">
          Update User
        </button>
      </form>
      <button onClick={() => router.push("/dashboard")} className="mt-4 text-blue-500">
        Back to Dashboard
      </button>
    </div>
  );
};

export default UpdateUser;