"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CancelBookingButton = ({ session, token }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  return (
    <>
      <button
        className={`btn btn-sm btn-error text-white ${session.status === "cancelled" && "btn-disabled"}`}
        onClick={() =>
          document.getElementById(`modal_${session._id}`).showModal()
        }
      >
        Cancel Booking
      </button>

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
              Back
            </button>
            <button
              onClick={async () => {
                setLoading(true);
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
                setLoading(false);
              }}
              className="btn btn-sm btn-error text-white w-25"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="loading loading-sm loading-spinner"></div>
                </div>
              ) : (
                "Confirm"
              )}
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
