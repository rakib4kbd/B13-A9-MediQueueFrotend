import { CircleUserRoundIcon } from "lucide-react";
import React from "react";
import Image from "next/image";

const Profile = ({ user }) => {
  return (
    <div className="card w-full border border-neutral/20 bg-base-200 shadow-xl">
      <figure />

      <div className="card-body items-center text-center">
        {user?.image ? (
          <div className="border border-neutral/50 rounded-full ">
            <Image
              src={user?.image}
              alt={user?.name}
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <CircleUserRoundIcon size={200} />
          </div>
        )}

        <div className="flex flex-col items-center justify-center">
          <h2 className="card-title text-xl font-bold">{user?.name}</h2>

          <p className="text-sm">{user?.email}</p>

          <div className="mt-2">
            {user?.emailVerified ? (
              <span className="badge badge-success">Verified</span>
            ) : (
              <span className="badge badge-warning">Not Verified</span>
            )}
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Joined{" "}
            {new Date(user?.createdAt).toLocaleDateString("en-BD", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
