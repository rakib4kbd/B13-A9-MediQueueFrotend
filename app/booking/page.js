import { auth } from "@/lib/auth";
import { Dot } from "lucide-react";
import { headers } from "next/headers";

const BookedSessionPage = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  const bookedSessionsPromise = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/${user.id}`,
  );
  const bookedSessions = await bookedSessionsPromise.json();

  console.log(bookedSessions);
  return (
    <div className="container mx-auto my-10">
      <h1 className="text-2xl font-bold mb-4">Booked Sessions</h1>

      <div className="overflow-x-auto rounded-box border border-base-content/20 bg-base-200">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookedSessions.map((session, index) => (
              <tr key={session._id}>
                <th>{index + 1}</th>
                <td className="font-semibold">{session.tutorName}</td>
                <td className="uppercase">
                  <p className="badge badge-info rounded-sm">
                    {session.status}
                  </p>
                </td>
                <td>
                  <button className="btn btn-sm btn-error btn-outline">
                    Cancel Session
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookedSessionPage;
