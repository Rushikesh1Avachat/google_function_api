import db from "../config/firebase";

interface User {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

export const createUser = async (userData: User) => {
  if (!userData.fullName || !userData.email || !userData.mobile || !userData.password) {
    throw new Error("All fields are required");
  }
  const newUser = await db.collection("users").add(userData);
  return newUser.id;
};

export const getAllUsers = async () => {
  const snapshot = await db.collection("users").get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getUserById = async (userId: string) => {
  const userRef = db.collection("users").doc(userId);
  const doc = await userRef.get();
  return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const updateUser = async (userId: string, updateData: Partial<User>) => {
  await db.collection("users").doc(userId).update(updateData);
};

export const deleteUser = async (userId: string) => {
  await db.collection("users").doc(userId).delete();
};
