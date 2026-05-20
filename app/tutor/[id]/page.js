import BookingInfo from "@/components/Booking/BookingInfo";
import BookSessionButton from "@/components/TutorDetail/BookSessionButton";
import { auth } from "@/lib/auth";
import { MapPin } from "lucide-react";
import { UniversityIcon } from "lucide-react";
import { Lock } from "lucide-react";
import { LockOpen } from "lucide-react";
import { BriefcaseBusinessIcon } from "lucide-react";
import { CircleAlertIcon } from "lucide-react";
import { ArrowLeftIcon } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TutorDetailPage = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({ headers: await headers() });
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutor/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    },
  );
  const tutor = await res.json();
  console.log(tutor);
  return (
    <div className="bg-base-200">
      <div className="container mx-auto py-5">
        <Link href={"/tutors"} className="btn btn-ghost">
          <ArrowLeftIcon /> Back to Tutor Listing
        </Link>

        <div className="grid grid-cols-3 gap-4 py-5">
          <div className="col-span-2 flex flex-row p-4 border border-primary/20 rounded-lg bg-base-100 gap-4">
            <div className="flex items-center justify-center">
              <figure className="relative aspect-square w-40">
                {tutor.photo ? (
                  <Image src={tutor.photo} fill alt="" />
                ) : (
                  <Image
                    src="https://images.unsplash.com/photo-1629425733761-caae3b5f2e50"
                    fill
                    alt=""
                    className="object-cover rounded-lg"
                  />
                )}
              </figure>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-semibold">{tutor.tutorName}</h1>
              <p className="text-primary/75">Specialist in {tutor.subject}</p>
              <p className="flex items-center gap-1">
                <BriefcaseBusinessIcon width={18} />
                {tutor?.institution?.experience}
              </p>
              <p className="flex items-center gap-1">
                <UniversityIcon width={18} />
                {tutor?.institution?.name}
              </p>
              <p className="flex items-center gap-1">
                <MapPin width={18} />
                {tutor?.location?.area},{tutor?.location?.city}
              </p>
              <p className="badge badge-info rounded-lg">
                {tutor?.location?.teachingMode}
              </p>
            </div>
          </div>
          <div className="border border-neutral/20 rounded-lg flex flex-col">
            <div className="flex bg-primary uppercase text-white items-center justify-between px-4 py-2 rounded-t-lg">
              <p className="text-sm">Hourly Rate</p>
              <p className="text-lg font-semibold">${tutor.hourlyFee}</p>
            </div>
            <div className="bg-base-100 rounded-lg">
              <div className="bg-base-100 grid grid-cols-2">
                <div className="bg-base-200 mx-2 my-4 p-4 rounded-lg flex flex-col items-center justify-center text-center ">
                  <p className="uppercase text-sm">Available Days</p>
                  <p>{tutor?.availability?.day}</p>
                </div>
                <div className="bg-base-200 mx-2 my-4 rounded-lg flex flex-col items-center justify-center text-center">
                  <p className="uppercase text-sm">Time Slot</p>
                  <p>{tutor?.availability?.time}</p>
                </div>
              </div>
              <BookingInfo tutor={tutor} />
              <div className="flex items-center justify-center m-2 ">
                <BookSessionButton tutor={tutor} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetailPage;
