import RegisterForm from "@/components/RegisterForm/RegisterForm";
import React from "react";

export const metadata = {
  title: "Register",
};

const RegisterPage = async ({ searchParams }) => {
  const params = await searchParams;
  return (
    <div className="container mx-auto">
      <RegisterForm searchParams={params} />
    </div>
  );
};

export default RegisterPage;
