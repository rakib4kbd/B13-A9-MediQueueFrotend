import React from "react";

const KeyMetrics = () => {
  const keyMetrics = [
    { value: "95%", label: "Passing Rate" },
    { value: "12k+", label: "Sessions Completed" },
    { value: "4.9/5", label: "Average Rating" },
    { value: "500+", label: "Satisfied Students" },
  ];
  return (
    <div>
      <h1 className="text-3xl font-bold">Why Choose Us</h1>
      <p className="text-muted-foreground">
        We are committed to providing the highest quality medical tutoring
        services to help you achieve your academic goals.
      </p>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {keyMetrics.map((metric, index) => (
          <div
            key={index}
            className="bg-base-100 rounded-lg shadow p-6 flex flex-col items-center"
          >
            <h2 className="text-2xl font-bold text-primary/75">
              {metric.value}
            </h2>
            <p className="text-sm font-semibold">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;
