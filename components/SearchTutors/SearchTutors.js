"use client";

import { Search } from "lucide-react";
import { useForm } from "react-hook-form";

const SearchTutor = ({ setTutors }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = async (data) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutors?search=${data.search}&registrationStart=${data.startDate}&registrationEnd=${data.endDate}`,
    );
    const tutors = await res.json();
    setTutors(tutors);
  };

  return (
    <div className="bg-base-100 rounded-lg p-5 border border-neutral/20">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="form-control md:col-span-2">
            <label className="label">
              <span className="label-text font-semibold">Search Tutor</span>
            </label>

            <label className="input input-bordered w-full">
              <Search />
              <input
                type="text"
                placeholder="Search by tutor name..."
                {...register("search")}
              />
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Start Date</span>
            </label>

            <input
              type="date"
              className="input input-bordered w-full"
              {...register("startDate")}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">End Date</span>
            </label>

            <input
              type="date"
              className="input input-bordered w-full"
              {...register("endDate")}
            />
          </div>
        </div>

        <div className="flex justify-end flex-col-reverse mt-5 gap-4">
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className="btn btn-outline btn-primary"
          >
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchTutor;
