import { Quote } from "lucide-react";
import React from "react";

const KeyMetrics = () => {
  const keyMetrics = [
    { value: "95%", label: "Passing Rate" },
    { value: "12k+", label: "Sessions Completed" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "500+", label: "Satisfied Students" },
  ];
  const quote = [
    {
      text: "Our students consistently achieve outstanding results in their medical examinations.",
      author: "Jessica Person",
      status: "3rd Year Student",
    },
  ];
  return (
    <div className="bg-base-100 py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
        <h1 className="text-3xl font-semibold col-span-4 items-center text-center">
          Why Choose Us
        </h1>

        <div className="col-span-2 grid grid-cols-2 gap-5 items-center justify-center">
          {keyMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-base-200 rounded-lg p-6 flex flex-col items-center"
            >
              <h2 className="text-2xl font-bold text-primary/75">
                {metric.value}
              </h2>
              <p className="text-sm font-semibold">{metric.label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center col-span-2">
          <div className="flex flex-col bg-primary p-10 rounded-lg text-white">
            <Quote />
            <p className="text-lg italic my-5">&quot;{quote[0].text}&quot;</p>
            <p className="text-md font-bold">{quote[0].author}</p>
            <p className="text-sm">{quote[0].status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;
