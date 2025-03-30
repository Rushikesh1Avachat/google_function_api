import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: number
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.length > 0 ? (
            users?.map((user) => (
              <TableRow key={user?.id}>
                <TableCell>{user?.fullName}</TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.mobile}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
