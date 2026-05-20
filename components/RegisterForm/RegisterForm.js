"use client";
import { signIn, signUp } from "@/lib/auth-client";
import { EyeOff } from "lucide-react";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const RegisterForm = ({ searchParams }) => {
  const params = searchParams;

  const [passVis, setPassVis] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = async (formData) => {
    const { name, email, photoUrl, password } = formData;
    const { data, error } = await signUp.email({
      name: name,
      email: email,
      password: password,
      image: photoUrl,
      callbackURL: "/login",
    });
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success(`User Registered: ${data.user.name}`);
      router.replace("/login");
    }
  };
  const handleGoogleLogin = () => {
    signIn.social({
      provider: "google",
    });
  };
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
          <span>Register with Google</span>
        </button>
        <div className="divider">Or</div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm md:w-md border p-4">
            <legend className="fieldset-legend">Register</legend>

            <label className="label">Name</label>
            <input
              type="name"
              className="input w-full"
              placeholder="Name"
              defaultValue={"John Doe"}
              {...register("name", { required: true })}
            />

            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="johndoe@localhost.com"
              defaultValue={"johndoe@localhost.com"}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input w-full"
              placeholder="https://placeholder.com"
              {...register("photoUrl")}
            />

            <label className="label">Password</label>
            {passVis ? (
              <label className="input w-full">
                <input
                  type="text"
                  placeholder="Password"
                  defaultValue={"12345678"}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])/,
                      message:
                        "Password must contain at least one uppercase and one lowercase letter",
                    },
                  })}
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
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])/,
                      message:
                        "Password must contain at least one uppercase and one lowercase letter",
                    },
                  })}
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
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <button className="btn btn-block btn-primary mt-4">Register</button>

            <div className="flex items-end justify-end gap-2">
              <p>Already Registered?</p>
              <Link
                href={"/login"}
                className="btn btn-neutral rounded-md btn-xs btn-outline"
              >
                Login Now
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
