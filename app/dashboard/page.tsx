"use client"
import { useEffect, useState } from "react";
import UserTable from "@/components/UserTable";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <UserTable users={users} />
    </div>
  );
};

export default Dashboard;

