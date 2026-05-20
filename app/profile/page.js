import Profile from "@/components/Profile/Profile";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const generateMetadata = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return {
      title: "Product Not Found",
      description: "This product does not exist",
    };
  }

  return {
    title: `${user.name} @ Sun Cart`,
    description: user.description || "Profile details page",
  };
};

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  return (
    <div className="container mx-auto my-20 flex justify-center px-2 md:px-0">
      <Profile user={user} />
    </div>
  );
};

export default ProfilePage;
