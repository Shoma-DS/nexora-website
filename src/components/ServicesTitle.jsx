import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const ServicesTitle = () => {
  useGSAP(() => {
    const firstTextSplit = SplitText.create(".first-text-split h1", {
      type: "chars",
    });
    const secondTextSplit = SplitText.create(".second-text-split h1", {
      type: "chars",
    });

    gsap.from(firstTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 30%",
      },
    });

    gsap.to(".services-text-scroll", {
      duration: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 10%",
      },
    });

    gsap.from(secondTextSplit.chars, {
      yPercent: 200,
      stagger: 0.02,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".services-section",
        start: "top 1%",
      },
    });
  });

  return (
    <div className="section-title col-center h-full 2xl:gap-24 xl:gap-20 gap-12">
      <div className="overflow-hidden 2xl:py-0 py-3 first-text-split">
        <h1>Our 5</h1>
      </div>

      <div
        style={{
          clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
        }}
        className="services-text-scroll"
      >
        <div className="bg-gold pb-4 2xl:pt-0 pt-3 2xl:px-6 px-4">
          <h2 className="text-bg-primary font-display">Core</h2>
        </div>
      </div>

      <div className="overflow-hidden 2xl:py-0 py-3 second-text-split">
        <h1>Services</h1>
      </div>
    </div>
  );
};

export default ServicesTitle;
