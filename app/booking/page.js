import CancelBookingButton from "@/components/Booking/CancelBookingButton";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const metadata = {
  title: "My Bookings",
};

const BookedSessionPage = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  const { token } = await auth.api.getToken({ headers: await headers() });
  const bookedSessionsPromise = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/${user.id}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const bookedSessions = await bookedSessionsPromise.json();

  return (
    <div className="container mx-auto py-5 md:py-10. px-2">
      <h1 className="text-2xl font-bold mb-4">Booked Sessions</h1>

      <div className="overflow-x-auto rounded-box border border-base-content/20 bg-base-200">
        {bookedSessions.length === 0 ? (
          <p className=" flex items-center justify-center p-4 text-center min-h-50">
            No booked sessions found.
          </p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Tutor Name</th>
                <th>Student Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookedSessions.map((session, index) => (
                <tr key={session._id}>
                  <th>{index + 1}</th>
                  <td className="font-semibold">
                    <p>{session.tutorName}</p>
                    <p className="text-xs">
                      {
                        new Date(session.bookingDate)
                          .toISOString()
                          .split("T")[0]
                      }
                    </p>
                  </td>
                  <td className="font-semibold">
                    <p>{session.studentName}</p>
                    <p className="text-xs">{session.studentEmail}</p>
                  </td>
                  <td className="uppercase">
                    {session.status === "pending" && (
                      <p className="badge badge-info rounded-sm">
                        {session.status}
                      </p>
                    )}
                    {session.status === "confirmed" && (
                      <p className="badge badge-success rounded-sm">
                        {session.status}
                      </p>
                    )}
                    {session.status === "cancelled" && (
                      <p className="badge badge-error rounded-sm">
                        {session.status}
                      </p>
                    )}
                  </td>
                  <td>
                    <CancelBookingButton session={session} token={token} />
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

export default BookedSessionPage;
