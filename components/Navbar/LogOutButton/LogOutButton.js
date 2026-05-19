"use client";
import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";

const LogOutButton = () => {
  const router = useRouter();
  return (
    <button
      className="btn btn-error"
      onClick={() => {
        signOut();
        router.replace("/login");
      }}
    >
      Log Out
    </button>
  );
};

export default LogOutButton;
