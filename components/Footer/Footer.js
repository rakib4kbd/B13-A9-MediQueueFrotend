import React from "react";

const Footer = () => {
  return (
    <div className="flex gap-5 bg-base-300 my-10 p-10 justify-between">
      <div className="flex flex-col gap-5">
        <p className="text-xl font-semibold text-primary/75">MediQueue</p>
        <p className="text-sm text-muted-foreground w-md">
          Dedicated to providing professional medical tutoring that bridges the
          gap between students and academic excellence.
        </p>
        <p className="text-sm text-muted-foreground w-md">
          © 2024 MediQueue. Professional Tutoring.
        </p>
      </div>
      <div className="flex gap-12 text-sm">
        <div>
          <h1 className="text-xl text-primary/75 mb-2">Services</h1>
          <ul className="flex flex-col gap-2">
            <li>Learning Service</li>
            <li>Book a Tutor</li>
            <li>Academic Support</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl text-primary/75 mb-2">Social</h1>
          <ul className="flex flex-col gap-2">
            <li>X</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl text-primary/75 mb-2">Legal</h1>
          <ul className="flex flex-col gap-2">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
