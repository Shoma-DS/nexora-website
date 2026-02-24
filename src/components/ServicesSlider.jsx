import { useGSAP } from "@gsap/react";
import { services } from "../constants";
import gsap from "gsap";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { getServiceIcon } from "./ServiceIcons";
import { getServiceCardVisual } from "./ServiceCardVisuals";

const ServicesSlider = () => {
  const sliderRef = useRef();

  const isTablet = useMediaQuery({
    query: "(max-width: 1024px)",
  });

  useGSAP(() => {
    const sliderEl = sliderRef.current;
    if (!sliderEl) return;

    if (!isTablet) {
      const cardsTrack = sliderEl.querySelector(".service-cards");
      if (!cardsTrack) return;

      const getHorizontalShift = () => {
        const cards = cardsTrack.querySelectorAll(":scope > div");
        const lastCard = cards[cards.length - 1];
        if (!lastCard) return 0;

        const lastCardRight = lastCard.offsetLeft + lastCard.clientWidth;
        const viewport = sliderEl.clientWidth;
        // Ensure the last card has a little breathing room on the right.
        return Math.max(0, lastCardRight - viewport + 28);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-section",
          start: "top top",
          end: () => `+=${getHorizontalShift() + Math.max(900, window.innerHeight * 0.9)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(cardsTrack, {
        x: () => `-${getHorizontalShift()}px`,
        ease: "none",
      });
    }

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".services-section",
        start: "top top",
        end: "bottom 80%",
        scrub: true,
      },
    });
    titleTl
      .to(".first-text-split", { xPercent: -30, ease: "power1.inOut" })
      .to(".services-text-scroll", { xPercent: -22, ease: "power1.inOut" }, "<")
      .to(".second-text-split", { xPercent: -10, ease: "power1.inOut" }, "<");
  }, { dependencies: [isTablet], revertOnUpdate: true });

  return (
    <div ref={sliderRef} className="slider-wrapper">
      <div className="service-cards">
        {services.map((service) => {
          const IconComponent = getServiceIcon(service.nameEn);
          const CardVisual = getServiceCardVisual(service.nameEn);
          const showLordicon = service.nameEn === "Generative AI";
          const showLottieIcon = service.nameEn === "AI Training";

          return (
            <div
              key={service.name}
              className={`relative z-30 lg:w-[40vw] w-[85vw] lg:h-[65vh] md:w-[85vw] md:h-[50vh] h-[60vh] flex-none ${service.rotation}`}
            >
              <div className="w-full h-full rounded-3xl border border-white/[0.06] bg-bg-card overflow-hidden relative group cursor-none">
                {/* Top color accent */}
                <div
                  className="absolute top-0 left-0 w-full h-px opacity-90"
                  style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                />
                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-1/2 h-1/2 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity duration-700"
                  style={{ background: `radial-gradient(circle at top right, ${service.color}, transparent 70%)` }}
                />
                {/* Scan line on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `repeating-linear-gradient(0deg, transparent, transparent 3px, ${service.color}05 3px, ${service.color}05 4px)`,
                  }}
                />

                <div className="relative z-10 p-7 md:p-8 flex flex-col h-full">
                  {/* ── Top: icon + tag + title + description ── */}
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: `${service.color}12`,
                          border: `1px solid ${service.color}25`,
                        }}
                      >
                        {showLordicon ? (
                          <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="loop"
                            delay="1200"
                            colors={`primary:${service.color}`}
                            style={{ width: "28px", height: "28px" }}
                          />
                        ) : showLottieIcon ? (
                          <lottie-player
                            src="https://assets3.lottiefiles.com/packages/lf20_jcikwtux.json"
                            background="transparent"
                            speed="1"
                            loop
                            autoplay
                            style={{ width: "28px", height: "28px" }}
                          />
                        ) : (
                          <IconComponent color={service.color} size={28} />
                        )}
                      </div>
                      <span
                        className="font-display text-[9px] tracking-[0.25em] uppercase mt-1"
                        style={{ color: `${service.color}70` }}
                      >
                        {service.nameEn}
                      </span>
                    </div>

                    <h3 className="font-display font-[700] text-white text-lg md:text-xl mb-2 tracking-tight">
                      {service.name}
                    </h3>
                    <p className="font-body text-white/40 text-xs md:text-sm leading-[1.8]">
                      {service.description}
                    </p>
                  </div>

                  {/* ── Middle: service-specific data visualization ── */}
                  <div className="flex-1 min-h-0">
                    <CardVisual color={service.color} />
                  </div>

                  {/* ── Bottom: CTA ── */}
                  <div>
                    <div
                      className="w-full h-px mb-4"
                      style={{ background: `linear-gradient(90deg, ${service.color}30, transparent)` }}
                    />
                    <div className="flex items-center justify-end">
                      <div
                        className="w-9 h-9 rounded-full border flex-center group-hover:scale-110 transition-all duration-300"
                        style={{ borderColor: `${service.color}35` }}
                      >
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
                          className="group-hover:translate-x-0.5 transition-transform duration-300">
                          <path d="M1 7H13M13 7L7 1M13 7L7 13"
                            stroke={service.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesSlider;
