import Link from "next/link";
import React from "react";

export const metadata = {
  title: "404 | Not Found",
};
const NotFound = () => {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-center min-h-50 text-2xl bg-base-200 my-2 rounded-lg border border-neutral/25">
        Page Not Found
      </div>
      <Link href={"/"} className="btn btn-primary btn-block">
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
