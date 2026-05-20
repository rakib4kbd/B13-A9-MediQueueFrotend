import TutorActionButtons from "@/components/MyTutors/TutorActionButtons";
import { auth } from "@/lib/auth";
import { User } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";

export const metadata = {
  title: "My Tutors",
};

const MyTutorPage = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  const { token } = await auth.api.getToken({ headers: await headers() });
  const tutors = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutors?userId=${user.id}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  ).then((res) => res.json());
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">My Tutors</h1>

      <div className="overflow-x-auto rounded-box border border-base-content/20 bg-base-200">
        {tutors.length === 0 ? (
          <p className=" flex items-center justify-center p-4 text-center min-h-50">
            No tutors found.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Tutor Name</th>
                <th>Subject</th>
                <th className="flex items-center justify-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor, index) => (
                <tr key={tutor?._id}>
                  <th>{index + 1}</th>
                  <td className="font-semibold flex items-center gap-3">
                    <div>
                      {tutor?.photo ? (
                        <figure className="relative w-10 h-10">
                          <Image
                            src={tutor?.photo}
                            alt="profile_image"
                            fill
                            className="rounded-full"
                          />
                        </figure>
                      ) : (
                        <figure className="rounded-full border p-1">
                          <User />
                        </figure>
                      )}
                    </div>
                    <div>
                      <p>{tutor?.tutorName}</p>
                      <p className="text-xs font-extralight">
                        {tutor?.institution?.name}
                      </p>
                    </div>
                  </td>

                  <td className="font-semibold">
                    <p className="badge badge-secondary">{tutor?.subject}</p>
                  </td>

                  <td>
                    <TutorActionButtons tutor={tutor} token={token} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyTutorPage;
