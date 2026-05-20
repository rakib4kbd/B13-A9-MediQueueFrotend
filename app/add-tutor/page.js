import AddTutorForm from "@/components/AddTutorForm/AddTutorForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "Add Tutor",
};

const AddTutorPage = async () => {
  const { token } = await auth.api.getToken({ headers: await headers() });
  return (
    <div className="container mx-auto py-10">
      <AddTutorForm token={token} />
    </div>
  );
};

export default AddTutorPage;
