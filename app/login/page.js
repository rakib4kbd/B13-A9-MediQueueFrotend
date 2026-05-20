import LoginForm from "@/components/LoginForm/LoginForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Login",
};

const LoginPage = async ({ searchParams }) => {
  const params = await searchParams;

  return (
    <div className="container mx-auto">
      <LoginForm searchParams={params} />
    </div>
  );
};

export default LoginPage;
