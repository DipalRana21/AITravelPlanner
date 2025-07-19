import React from "react";

const logos = [
  { name: "Nomad List", url: "/nomadlist-icon.svg" },
  { name: "Dribble", url: "/dribbble-icon.svg" },
  { name: "Stackover Flow", url: "/stackoverflow-icon.svg" },
  { name: "Product Hunt", url: "/producthunt-icon.svg" },
];

export default function TrustedBy() {
  return (
    <div className="mt-16 text-center text-white">
      <p className="text-lg font-semibold text-gray-300 mb-6">
        Trusted by creators from
      </p>
      <div className="flex justify-center items-center gap-10 flex-wrap">
        {logos.map((logo) => (
          <div key={logo.name} className="flex flex-col items-center">
            <img
              src={logo.url}
              alt={logo.name}
              className="h-10 object-contain grayscale hover:grayscale-0 transition duration-300"
            />
            <p className="mt-2 text-sm text-gray-400">{logo.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
