"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";

const BookSessionButton = ({ tutor }) => {
  const { data } = useSession();
  const user = data?.user;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tutorId: "",
      tutorName: "",
      subject: "",
      studentName: "",
      studentEmail: "",
      phone: "",
      status: "pending",
    },
  });

  // Populate form when user/tutor loads
  useEffect(() => {
    if (user && tutor) {
      reset({
        tutorId: tutor?._id || "",
        tutorName: tutor?.tutorName || "",
        subject: tutor?.subject || "",
        studentName: user?.name || "",
        studentEmail: user?.email || "",
        phone: "",
        status: "pending",
      });
    }
  }, [user, tutor, reset]);

  const handleBooking = async (formData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tutorId: formData.tutorId,
            tutorName: formData.tutorName,
            studentName: formData.studentName,
            studentEmail: formData.studentEmail,
            phone: formData.phone,
            userId: user?.id,
            subject: formData.subject,
            status: formData.status,
          }),
        },
      );

      if (res.ok) {
        toast.success("Session booked successfully!");
        document.getElementById("my_modal_3").close();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message);
        document.getElementById("my_modal_3").close();
      }

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex items-center justify-center btn-block">
      {tutor.totalSlot > 0 && new Date(tutor.sessionStartDate) < new Date() ? (
        <>
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="btn btn-primary btn-block"
          >
            Book Session
          </button>

          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form onSubmit={handleSubmit(handleBooking)}>
                <button
                  type="button"
                  onClick={() => document.getElementById("my_modal_3").close()}
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>

                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
                  <legend className="fieldset-legend">
                    Book Tutor Session
                  </legend>

                  <label className="label">Student Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    {...register("studentName")}
                  />

                  <label className="label mt-2">Phone</label>
                  <input
                    type="tel"
                    className="input w-full"
                    placeholder="Phone Number"
                    {...register("phone", {
                      required: "Phone number is required",
                    })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}

                  <label className="label mt-2">Tutor ID</label>
                  <input
                    type="text"
                    className="input w-full"
                    readOnly
                    {...register("tutorId")}
                  />

                  <label className="label mt-2">Tutor Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    readOnly
                    {...register("tutorName")}
                  />

                  {/* Student Email */}
                  <label className="label mt-2">Student Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    readOnly
                    {...register("studentEmail")}
                  />

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  >
                    Submit
                  </button>
                </fieldset>
              </form>
            </div>
          </dialog>
        </>
      ) : (
        <button className="btn btn-primary btn-block" disabled>
          Unavailable
        </button>
      )}
    </div>
  );
};

export default BookSessionButton;
