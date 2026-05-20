"use client";
import SearchTutor from "@/components/SearchTutors/SearchTutors";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const TutorsPage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tutors`)
      .then((res) => res.json())
      .then((data) => setTutors(data))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto my-10 px-2 md:px-0">
      <div>
        <SearchTutor setTutors={setTutors} />
      </div>
      {!loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-2 gap-4 my-3">
          {tutors.map((tutor, idx) => (
            <div
              key={idx}
              className="p-4 bg-base-100 border-primary/50 rounded-lg border flex flex-col justify-between gap-2"
            >
              <div className="card flex flex-col gap-2 justify-between">
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
                <div className="flex flex-col items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h1 className="text-lg font-semibold inline-block uppercase">
                      {tutor.tutorName}
                    </h1>
                    <div className="uppercase text-sm">{tutor.subject}</div>
                    <p className="text-xs">{tutor.institution.name}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-2">
                <div className="flex justify-between items-end w-full">
                  <p className="text-sm">Hourly Fee</p>
                  <span className="text-xl text-primary">
                    ${tutor.hourlyFee}/hr
                  </span>
                </div>
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
      ) : (
        <div className="flex justify-center items-center min-h-100 border my-5 rounded-lg border-primary/50">
          <span className="loading loading-spinner loading-xl text-primary"></span>
        </div>
      )}
    </div>
  );
};

export default TutorsPage;
