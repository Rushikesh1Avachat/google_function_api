"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";
import { Button } from "@/components/ui/button";

const CreateUser = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await addDoc(collection(db, "users"), form);
    router.push("/dashboard");
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} className="border p-2 w-full" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" required />
        <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} className="border p-2 w-full" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} className="border p-2 w-full" required />
        <Button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">Add User</Button>
      </form>
      <Button onClick={() => router.push("/dashboard")} className="mt-4 text-blue-500">Back to Dashboard</Button>
    </div>
  );
};

export default CreateUser;
