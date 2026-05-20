import AddTutorForm from "@/components/AddTutorForm/AddTutorForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const AddTutorPage = async () => {
  const { token } = await auth.api.getToken({ headers: await headers() });
  return (
    <div className="container mx-auto">
      <div className="mx-auto py-10">
        <h1 className="text-3xl text-neutral font-semibold">Add New Tutor</h1>
        <p>
          Create a professional tutor profile to join the MediQueue network.
          Ensure all medical credentials and availability are accurate for
          student matching.
        </p>
      </div>
      <AddTutorForm token={token} />
    </div>
  );
};

export default AddTutorPage;
