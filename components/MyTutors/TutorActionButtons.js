"use client";

import { Trash2 } from "lucide-react";
import { Pen } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const TutorActionButtons = ({ tutor, token }) => {
  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "ICT",
  ];

  console.log(tutor);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tutorName: tutor?.tutorName || "",
      photo: tutor?.photo || "",
      subject: tutor?.subject || "",

      hourlyFee: tutor?.hourlyFee || 0,
      totalSlot: tutor?.totalSlot || 0,

      sessionStartDate: tutor?.sessionStartDate || "",

      availabilityDay: tutor?.availability?.day || "",
      availabilityTime: tutor?.availability?.time || "",

      institutionName: tutor?.institution?.name || "",
      experience: tutor?.institution?.experience || "",

      area: tutor?.location?.area || "",
      city: tutor?.location?.city || "",
      teachingMode: tutor?.location?.teachingMode || "",
    },
  });

  const router = useRouter();
  const handleDelete = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutor/${tutor._id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );

    const data = await res.json();
    console.log(data);
    if (data.acknowledged) {
      toast.success("Tutor Deleted");
      router.refresh();
    } else {
      toast.error(data.error);
      router.refresh();
    }
  };

  const onEdit = async (data) => {
    const tutorData = {
      tutorName: data.tutorName,
      photo: data.photo,
      subject: data.subject,

      hourlyFee: Number(data.hourlyFee),
      totalSlot: Number(data.totalSlot),

      sessionStartDate: data.sessionStartDate,

      availability: {
        time: data.availabilityTime,
        day: data.availabilityDay,
      },

      institution: {
        name: data.institutionName,
        experience: data.experience,
      },

      location: {
        area: data.area,
        city: data.city,
        teachingMode: data.teachingMode,
      },
    };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutor/${tutor._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tutorData),
      },
    );

    const result = await res.json();

    if (result.acknowledged) {
      toast.success("Tutor Updated Successfully");
      router.refresh();

      document.getElementById(`tutorEdit${tutor._id}`).close();
    } else {
      toast.error(result.error || "Failed to update tutor");
      document.getElementById(`tutorEdit${tutor._id}`).close();
    }
  };

  return (
    <div className="flex items-center justify-end">
      <button
        className="text-neutral btn btn-sm"
        onClick={() =>
          document.getElementById(`tutorEdit${tutor._id}`).showModal()
        }
      >
        <Pen width={18} />
      </button>

      <button
        className="btn btn-sm text-error"
        onClick={() =>
          document.getElementById(`tutorDelete${tutor._id}`).showModal()
        }
      >
        <Trash2 />
      </button>

      {/* TUTOR DELETE MODAL */}
      <dialog id={`tutorDelete${tutor._id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confimation</h3>
          <p className="py-4">Are you sure you want to delete this tutor?</p>

          <div className="modal-action">
            <form method="dialog">
              <div className="flex items-center gap-3">
                <button className="btn btn-outline">Close</button>

                <button
                  onClick={handleDelete}
                  className="btn btn-outline btn-error"
                >
                  Confirm
                </button>
              </div>
              {/* if there is a button in form, it will close the modal */}
            </form>
          </div>
        </div>
      </dialog>

      {/* TUTOR EDIT MODAL */}
      <dialog id={`tutorEdit${tutor._id}`} className="modal">
        <div className="modal-box bg-base-200 border-base-300 rounded-box border">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost absolute right-2 top-5">
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit(onEdit)}>
            <fieldset className="fieldset p-6 ">
              <label className="label">Tutor Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter tutor name"
                {...register("tutorName", {
                  required: true,
                })}
              />

              <label className="label mt-2">Photo URL</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Image URL"
                {...register("photo")}
              />

              <label className="label mt-2">Subject</label>
              <select
                className="select w-full"
                {...register("subject", { required: true })}
              >
                {subjects.map((subject, idx) => (
                  <option key={idx} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="label">Available Days</label>

                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Sun - Thu"
                    {...register("availabilityDay")}
                  />
                </div>

                <div>
                  <label className="label">Available Time Slot</label>

                  <input
                    type="text"
                    className="input w-full"
                    placeholder="10AM - 8PM"
                    {...register("availabilityTime")}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="label">Hourly Fee</label>

                  <label className="input w-full">
                    $
                    <input
                      type="number"
                      min={0}
                      placeholder="500"
                      {...register("hourlyFee", {
                        required: true,
                        valueAsNumber: true,
                      })}
                    />
                  </label>
                </div>

                <div>
                  <label className="label">Total Slot</label>

                  <input
                    type="number"
                    min={0}
                    className="input w-full"
                    placeholder="10"
                    {...register("totalSlot")}
                  />
                </div>
              </div>

              <label className="label mt-3">Session Start Date</label>

              <input
                type="date"
                className="input w-full"
                {...register("sessionStartDate")}
              />

              <label className="label mt-3">Institution Name</label>

              <input
                type="text"
                className="input w-full"
                placeholder="Dhaka University"
                {...register("institutionName")}
              />

              <label className="label mt-3">Experience</label>

              <textarea
                className="textarea w-full"
                placeholder="3 years teaching experience"
                {...register("experience")}
              />

              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <label className="label">Area</label>

                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Dhanmondi"
                    {...register("area")}
                  />
                </div>

                <div>
                  <label className="label">City</label>

                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Dhaka"
                    {...register("city")}
                  />
                </div>
              </div>

              <label className="label mt-3">Teaching Mode</label>

              <select className="select w-full" {...register("teachingMode")}>
                <option value="">Select Mode</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Both">Both</option>
              </select>

              <div className="flex items-center justify-end gap-3 mt-3">
                <button type="submit" className="btn btn-block btn-secondary">
                  Update
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TutorActionButtons;
