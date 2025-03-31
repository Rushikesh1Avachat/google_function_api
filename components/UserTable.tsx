import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Dashboard from "@/app/dashboard/page";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: number,
  password:string,
  confirmPassword:string,
}

interface UserTableProps {
  users: User[];
}


const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const router=useRouter()
  if (!users) {
  router.push("/dashboard")
  }
  return (
    <div className="rounded-lg border shadow-sm">
 <Dashboard/>
    </div>
  );
};

export default UserTable;
