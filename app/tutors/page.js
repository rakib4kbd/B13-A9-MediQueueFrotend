"use client";
import SearchTutor from "@/components/SearchTutors/SearchTutors";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tutors`)
      .then((res) => res.json())
      .then((data) => setTutors(data));
  }, []);

  return (
    <div className="container mx-auto my-10 px-2 md:px-0">
      <div>
        <SearchTutor setTutors={setTutors} />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 my-3">
        {tutors.map((tutor, idx) => (
          <div
            key={idx}
            className="p-4 bg-base-100 rounded-lg border border-neutral/20 flex flex-col justify-between gap-2"
          >
            <div className="card flex flex-col gap-2">
              <figure className="relative aspect-square w-full">
                {tutor.photo ? (
                  <Image
                    src={tutor.photo}
                    alt={tutor.photo}
                    fill
                    className="object-contain rounded-lg"
                  />
                ) : (
                  <figure className="relative aspect-square w-full">
                    <Image
                      src={
                        "https://images.unsplash.com/photo-1629425733761-caae3b5f2e50"
                      }
                      alt="default_image"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </figure>
                )}
              </figure>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h1 className="text-lg font-semibold inline-block uppercase">
                    {tutor.tutorName}
                  </h1>
                  <div className="uppercase text-neutral text-sm">
                    {tutor.subject}
                  </div>
                </div>
                <div className="flex flex-col text-end justify-end items-end">
                  <p className="text-sm">Fee</p>
                  <span className="text-xl text-primary">
                    ${tutor.hourlyFee}/hr
                  </span>
                </div>
              </div>
            </div>
            <p className="text-xs">{tutor.institution.name}</p>
            <div className="space-y-1">
              <div>
                <Link
                  href={`/tutor/${tutor._id}`}
                  className="btn btn-primary btn-block"
                >
                  Book a Session
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorsPage;
