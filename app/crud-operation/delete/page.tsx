"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

type User = {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
};

const DeleteUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUser({  ...(userDoc.data() as User) });
        }
      };
      fetchUser();
    }
  }, [userId]);

  const handleDelete = async () => {
    if (userId) {
      await deleteDoc(doc(db, "users", userId));
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Delete User</h2>
      {user ? (
        <div>
          <p className="mb-4">Are you sure you want to delete this user?</p>
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Mobile:</strong> {user.mobile}</p>
          <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded w-full mt-4">
            Confirm Delete
          </button>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
      <button onClick={() => router.push("/dashboard")} className="mt-4 text-blue-500">
        Back to Dashboard
      </button>
    </div>
  );
};

export default DeleteUser;