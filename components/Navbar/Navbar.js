"use client";
import React from "react";
import ThemeToggler from "./ThemeToggler/ThemeToggler";
import { User } from "lucide-react";
import Link from "next/link";
import LogOutButton from "./LogOutButton/LogOutButton";
import { useSession } from "@/lib/auth-client";

const Navbar = () => {
  const regularLinks = [
    { label: "Home", navigation: "/" },
    { label: "Tutors", navigation: "/tutors" },
  ];
  const loggedInLinks = [
    { label: "Add Tutor", navigation: "/add-tutor" },
    { label: "My Tutors", navigation: "/tutors/my-tutors" },
    { label: "My Booked Sessions", navigation: "/booking" },
  ];

  const { data } = useSession();
  const user = data?.user;
  return (
    <div className="max-lg:collapse bg-base-200 shadow-sm w-full border-b border-b/10 rounded-none">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label
        htmlFor="navbar-1-toggle"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>
      <div className="collapse-title navbar">
        <div className="navbar-start">
          <label htmlFor="navbar-1-toggle" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <Link
            href={"/"}
            className="btn btn-ghost text-xl text-primary font-semibold"
          >
            MediQueue
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {regularLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.navigation}>{link.label}</Link>
              </li>
            ))}

            {user &&
              loggedInLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.navigation}>{link.label}</Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="navbar-end">
          <ul className="menu menu-horizontal px-1 flex items-center">
            <li>
              <ThemeToggler />
            </li>
            {!user && (
              <li>
                <Link href={"/login"} className="btn btn-primary">
                  Log In
                </Link>
              </li>
            )}
            {user && (
              <li>
                <div className="dropdown dropdown-hover dropdown-end">
                  <div tabIndex={0} role="button">
                    <User />
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                  >
                    <li>
                      <Link href={"/my-profile"} className="btn btn-ghost">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <LogOutButton />
                    </li>
                  </ul>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="collapse-content lg:hidden z-1">
        <ul className="menu px-1 flex items-center">
          {regularLinks.map((link) => (
            <li key={link.label}>
              <Link href={link.navigation}>{link.label}</Link>
            </li>
          ))}

          {user &&
            loggedInLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.navigation}>{link.label}</Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
