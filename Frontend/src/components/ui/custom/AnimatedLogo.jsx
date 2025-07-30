// AnimatedLogo.jsx

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import TripMindSVG from "../../../assets/tripmind-logo.svg";

export default function AnimatedLogo() {
  const objectRef = useRef(null);

  useEffect(() => {
    const objectEl = objectRef.current;

    const handleLoad = () => {
      const svgDoc = objectEl.contentDocument;
      if (!svgDoc) return;

      const paths = svgDoc.querySelectorAll("path");
      const logogram = svgDoc.getElementById("logogram");
      const logotype = svgDoc.getElementById("logotype");

      paths.forEach((path) => {
        path.style.stroke = "#fff";
        path.style.fillOpacity = "0";
        path.style.strokeDasharray = path.getTotalLength();
        path.style.strokeDashoffset = path.getTotalLength();
      });

      const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

      paths.forEach((path, i) => {
        tl.to(
          path,
          {
            strokeDashoffset: 0,
            duration: 1,
            delay: i * 0.02,
          },
          0
        );
      });

      tl.to(
        paths,
        {
          fillOpacity: 1,
          stroke: "none",
          duration: 1,
          stagger: 0.01,
          onStart: () => logogram.classList.add("glow"),
        },
        "+=0.5"
      );

      tl.from(
        logotype,
        {
          y: 80,
          opacity: 0,
          scale: 0.9,
          duration: 1.2,
          ease: "elastic.out(1, 0.4)",
        },
        "-=0.8"
      );

      tl.to(
        logogram,
        {
          scale: 1.05,
          transformOrigin: "center",
          yoyo: true,
          repeat: 1,
          duration: 0.2,
        },
        "+=0.3"
      );
    };

    objectEl.addEventListener("load", handleLoad);
    return () => objectEl.removeEventListener("load", handleLoad);
  }, []);

  return (
    <div className="flex items-center justify-center">
      <object
        id="logo"
        type="image/svg+xml"
        data={TripMindSVG}
        ref={objectRef}
        className="w-[300px] max-w-full"
      />
    </div>
  );
}
