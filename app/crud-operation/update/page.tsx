import UpdateUser from "@/components/UpdateUser"; // Ensure correct path

const UpdateUserPage = ({ searchParams }: { searchParams: { id?: string } }) => {
  const userId = searchParams?.id;

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold">Update User</h1>
      {userId ? <UpdateUser userId={userId} /> : <p className="text-red-500">No user ID provided.</p>}
    </div>
  );
};
export default UpdateUserPage