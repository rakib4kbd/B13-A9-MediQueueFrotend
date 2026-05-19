"use client";

import React from "react";
import { useForm } from "react-hook-form";

const AddTutorForm = () => {
  const { register, handleSubmit } = useForm();

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "ICT",
  ];

  const days = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];

  const onSubmit = (data) => {
    const availability = days
      .filter((day) => data[`${day}_enabled`])
      .map((day) => ({
        [day]: [
          {
            start: Number(data[`${day}_start`]),
            end: Number(data[`${day}_end`]),
          },
        ],
      }));

    const tutorData = {
      tutorName: data.tutorName,
      photo: data.photo,
      subject: data.subject,

      availability: availability,

      hourlyFee: Number(data.hourlyFee),
      totalSlot: Number(data.totalSlot),

      sessionStartDate: data.sessionStartDate,

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

    console.log(tutorData);
  };

  return (
    <div className="flex items-center justify-center py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm md:w-3xl border p-6">
          <legend className="fieldset-legend text-lg font-semibold">
            Tutor Information
          </legend>

          <label className="label">Tutor Name</label>
          <input
            type="text"
            className="input w-full"
            placeholder="Enter tutor name"
            {...register("tutorName", { required: true })}
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

          <label className="label mt-4 font-bold">Availability</label>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label className="label">Available Days</label>

              <input
                type="text"
                className="input w-full"
                placeholder="Sun - Thu"
                {...register("availability.day")}
              />
            </div>

            <div>
              <label className="label">Time Slot</label>

              <input
                type="number"
                className="input w-full"
                placeholder="10AM - 8 PM"
                {...register("availability.time")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <label className="label">Hourly Fee</label>

              <input
                type="number"
                className="input w-full"
                placeholder="500"
                {...register("hourlyFee")}
              />
            </div>

            <div>
              <label className="label">Total Slot</label>

              <input
                type="number"
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

          <button className="btn btn-primary mt-6">Add Tutor</button>
        </fieldset>
      </form>
    </div>
  );
};

export default AddTutorForm;
