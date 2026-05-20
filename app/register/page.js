import RegisterForm from "@/components/RegisterForm/RegisterForm";
import React from "react";

export const metadata = {
  title: "Register",
};

const RegisterPage = () => {
  return (
    <div className="container mx-auto">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
