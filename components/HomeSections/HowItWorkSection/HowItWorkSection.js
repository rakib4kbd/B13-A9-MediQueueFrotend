import { CalendarCheck } from "lucide-react";
import { BookOpen } from "lucide-react";
import { Search } from "lucide-react";
import React from "react";

const howItWork = [
  {
    id: 1,
    logo: <Search />,
    bg: "bg-primary/20",
    title: "Search",
    description: "Search for tutors based on your subject and preferences.",
  },
  {
    id: 2,
    logo: <CalendarCheck />,
    bg: "bg-secondary/20",
    title: "Book",
    description: "Book a session with your chosen tutor at a convenient time.",
  },
  {
    id: 3,
    logo: <BookOpen />,
    bg: "bg-neutral/20",
    title: "Learn",
    description: "Connect with your tutor and start learning!",
  },
];

const HowItWorkSection = () => {
  return (
    <div className="my-10">
      <div className="container mx-auto">
        <div className="my-10">
          <h2 className="text-3xl font-bold text-center">How It Works</h2>
          <p className="text-neutral text-center">
            Getting started with our platform is simple and straightforward.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {howItWork.map((step) => (
            <div
              key={step.id}
              className="bg-white p-5 rounded-lg shadow-md text-center flex flex-col items-center gap-3 hover:shadow-md hover:shadow-primary/20"
            >
              <div
                className={`flex justify-center ${step.bg} p-5 rounded-full`}
              >
                {step.logo}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorkSection;
