"use client";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const CancelBookingButton = ({ session, token }) => {
  const router = useRouter();
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {session.status !== "cancelled" ? (
        <button
          className="btn btn-sm btn-error text-white"
          onClick={() =>
            document.getElementById(`modal_${session._id}`).showModal()
          }
        >
          Cancel Booking
        </button>
      ) : (
        <button
          className="btn btn-sm btn-error text-white"
          disabled
          onClick={() =>
            document.getElementById(`modal_${session._id}`).showModal()
          }
        >
          Cancel Booking
        </button>
      )}
      <dialog id={`modal_${session._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Cancellation</h3>
          <p className="py-4">Are you sure you want to cancel this booking?</p>
          <div className="my-2 flex gap-3 items-center justify-end">
            <button
              onClick={() =>
                document.getElementById(`modal_${session._id}`).close()
              }
              className="btn btn-sm btn-outline"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/${session._id}`,
                  {
                    method: "PATCH",
                    cache: "no-store",
                    headers: {
                      "Content-Type": "application/json",
                      authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status: "cancelled" }),
                  },
                );

                const data = await res.json();
                if (data.acknowledged) {
                  toast.success("Session cancelled successfully");
                } else {
                  toast.error(data.message || "Failed to cancel session");
                }

                document.getElementById(`modal_${session._id}`).close();
                router.refresh();
              }}
              className="btn btn-sm btn-error text-white"
            >
              Confirm
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default CancelBookingButton;
