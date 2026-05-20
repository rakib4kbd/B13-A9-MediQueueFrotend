import LoginForm from "@/components/LoginForm/LoginForm";
import React from "react";

export const metadata = {
  title: Login,
};

const LoginPage = () => {
  return (
    <div className="container mx-auto">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
