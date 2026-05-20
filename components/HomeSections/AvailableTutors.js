import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

const AvailableTutors = async () => {
  const tutors = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutors?limit=6`,
  ).then((res) => res.json());

  return (
    <div className="container mx-auto my-20 px-2 md:px-0">
      <div className="flex items-center justify-between my-5">
        <h1 className="text-3xl font-semibold">Available Tutors</h1>
        <Link href={"/tutors"} className="btn btn-ghost">
          View All Tutors
          <span>
            <ArrowRightIcon width={18} />
          </span>
        </Link>
      </div>
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
                    className="object-cover rounded-lg"
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
    </div>
  );
};

export default AvailableTutors;
