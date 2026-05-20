"use client";
import { signIn, useSession } from "@/lib/auth-client";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const LoginForm = ({ searchParams }) => {
  const params = searchParams;

  const [passVis, setPassVis] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = (formData) => {
    const { email, password } = formData;
    const { data, error } = signIn.email({
      email: email,
      password: password,
      callbackURL: "/",
      //   callbackURL: params["callbackUrl"] || "/",
    });
    if (error) {
      toast.error(error.message);
    }
  };
  const handleGoogleLogin = async () => {
    const { data, error } = await signIn.social({
      provider: "google",
      callbackURL: "/",
      // callbackURL: params["callbackUrl"] || "/",
    });
    if (error) {
      toast.error(error.message);
    }
  };
  const router = useRouter();
  const session = useSession();
  if (session?.data) {
    router.push("/");
  }

  return (
    <div className="container mx-auto my-20 px-2 md:px-0">
      <div className="flex flex-col items-center justify-center">
        <button
          className="btn btn-primary gap-2 w-sm md:w-md"
          onClick={() => {
            handleGoogleLogin();
          }}
        >
          <Image
            src={"/logos/google.png"}
            alt="google"
            width={20}
            height={20}
          />{" "}
          <span>Login with Google</span>
        </button>
        <div className="divider"> Or </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm md:w-md border p-4">
            <legend className="fieldset-legend">Login</legend>

            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              defaultValue={"johndoe@localhost.com"}
              {...register("email", { required: true })}
            />

            <label className="label">Password</label>
            {passVis ? (
              <label className="input w-full">
                <input
                  type="text"
                  placeholder="Password"
                  defaultValue={"12345678"}
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPassVis(!passVis);
                  }}
                >
                  <Eye />
                </button>
              </label>
            ) : (
              <label className="input w-full">
                <input
                  type="password"
                  placeholder="Password"
                  defaultValue={"12345678"}
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPassVis(!passVis);
                  }}
                >
                  <EyeOff />
                </button>
              </label>
            )}

            <button className="btn btn-primary btn-block mt-4">Login</button>

            <div className="mt-5 flex items-end justify-end gap-3">
              <p>Not registered?</p>
              <Link href={"/register"} className="btn btn-xs btn-outline">
                Register Now
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
