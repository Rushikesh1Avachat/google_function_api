"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { doc, getDoc, deleteDoc, collection, getFirestore, Firestore } from "firebase/firestore";
import { db } from "@/firebase/firebaseConfig";

type User = {
  exists: any;
  data(): User;
  id: string;
  fullName: string;
  email: string;
  mobile: string;
};

const DeleteUser = () => {
  const [users, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState()
  const router = useRouter();
 

  useEffect(() => {
    if (users) {
      const fetchUser = async () => {
        if (users.exists()) {
          setUser({  ...(users.data() as User) });
        }
      };
      fetchUser();
    }
  }, [users]);

  const handleDelete = async () => {
    if (userId) {
      await deleteDoc(doc(db, "users", userId));
      router.push("/dashboard");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Delete User</h2>
      {users ? (
        <div>
          <p className="mb-4">Are you sure you want to delete this user?</p>
          <p><strong>Name:</strong> {users.fullName}</p>
          <p><strong>Email:</strong> {users.email}</p>
          <p><strong>Mobile:</strong> {users.mobile}</p>
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