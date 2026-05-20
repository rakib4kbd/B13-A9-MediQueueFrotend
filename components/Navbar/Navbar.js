"use client";
import React from "react";
import ThemeToggler from "./ThemeToggler/ThemeToggler";
import { User } from "lucide-react";
import Link from "next/link";
import LogOutButton from "./LogOutButton/LogOutButton";
import { useSession } from "@/lib/auth-client";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();
  const { data, isPending } = useSession();
  const user = data?.user;

  const closeMobileMenu = () => {
    const checkbox = document.getElementById("navbar-1-toggle");
    if (checkbox) checkbox.checked = false;
  };

  return (
    <div className="relative z-50 max-lg:collapse bg-base-200 shadow-sm w-full border-b border-primary/50 rounded-none overflow-visible">
      <input id="navbar-1-toggle" className="peer hidden" type="checkbox" />
      <label
        htmlFor="navbar-1-toggle"
        className="fixed inset-0 hidden max-lg:peer-checked:block"
      ></label>
      <div className="collapse-title navbar overflow-visible">
        <div className="navbar-start overflow-visible">
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
          {isPending ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            <ul className="menu menu-horizontal px-1">
              {regularLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.navigation}
                    className={`btn btn-ghost rounded-none flex items-center justify-center flex-row px-4 gap-1 ${
                      pathname === link.navigation
                        ? "border-b-2 rounded-none border-b-primary"
                        : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}

              {user &&
                loggedInLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.navigation}
                      className={`btn btn-ghost rounded-none flex items-center justify-center flex-row px-4 gap-1 ${
                        pathname === link.navigation
                          ? "border-b-2 rounded-none border-b-primary"
                          : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="navbar-end overflow-visible">
          {isPending ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : (
            <ul className="menu menu-horizontal px-1 flex items-center">
              <li>
                <ThemeToggler />
              </li>
              {!user && (
                <li>
                  <Link
                    href={"/login"}
                    onClick={closeMobileMenu}
                    className="btn btn-primary"
                  >
                    Log In
                  </Link>
                </li>
              )}
              {user && (
                <li>
                  <div className="dropdown dropdown-end relative z-50 overflow-visible">
                    {user?.image ? (
                      <div
                        tabIndex={0}
                        role="button"
                        className="relative w-10 h-10"
                      >
                        <Image
                          src={user?.image}
                          alt="profile_image"
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    ) : (
                      <div tabIndex={0} role="button">
                        <User />
                      </div>
                    )}
                    <ul
                      tabIndex={-1}
                      className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 shadow-sm"
                    >
                      <li>
                        <Link
                          href={"/profile"}
                          onClick={closeMobileMenu}
                          className="btn btn-ghost"
                        >
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
          )}
        </div>
      </div>

      <div className="collapse-content lg:hidden z-50">
        {isPending ? (
          <span className="loading loading-spinner text-primary"></span>
        ) : (
          <ul className="menu w-full px-1 flex flex-col items-center justify-center gap-2">
            {regularLinks.map((link, idx) => (
              <li key={idx} className="w-full">
                <Link
                  href={link.navigation}
                  className="btn"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              </li>
            ))}

            {user &&
              loggedInLinks.map((link, idx) => (
                <li key={idx} className="w-full">
                  <Link
                    href={link.navigation}
                    className="btn"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
