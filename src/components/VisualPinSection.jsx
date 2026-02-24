import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const VisualPinSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useGSAP(() => {
    if (!isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".vd-pin-section",
          start: "-15% top",
          end: "200% top",
          scrub: 1.5,
          pin: true,
        },
      });
      tl.to(".visual-box", {
        clipPath: "circle(100% at 50% 50%)",
        ease: "power1.inOut",
      });
    }
  });

  return (
    <section className="vd-pin-section">
      <div
        style={{
          clipPath: isMobile ? "circle(100% at 50% 50%)" : "circle(6% at 50% 50%)",
        }}
        className="size-full visual-box"
      >
        {/* Deep space background */}
        <div
          className="size-full absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #060A0E 0%, #0A1829 30%, #060E22 60%, #0A0A18 100%)",
          }}
        />

        {/* Dot grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(34, 211, 238, 0.07) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Abstract data visualization SVG */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 800 400" className="w-full h-full opacity-25" fill="none">
            {/* Network graph lines */}
            <line x1="200" y1="200" x2="400" y2="150" stroke="#22D3EE" strokeWidth="0.5" />
            <line x1="400" y1="150" x2="600" y2="200" stroke="#22D3EE" strokeWidth="0.5" />
            <line x1="200" y1="200" x2="350" y2="280" stroke="#22D3EE" strokeWidth="0.5" />
            <line x1="350" y1="280" x2="600" y2="200" stroke="#22D3EE" strokeWidth="0.5" />
            <line x1="400" y1="150" x2="350" y2="280" stroke="#818CF8" strokeWidth="0.5" />
            <line x1="100" y1="120" x2="200" y2="200" stroke="#22D3EE" strokeWidth="0.5" />
            <line x1="700" y1="120" x2="600" y2="200" stroke="#22D3EE" strokeWidth="0.5" />
            <line x1="100" y1="300" x2="350" y2="280" stroke="#34D399" strokeWidth="0.5" />
            <line x1="700" y1="300" x2="600" y2="200" stroke="#34D399" strokeWidth="0.5" />
            {/* Nodes */}
            <circle cx="400" cy="150" r="6" fill="#22D3EE" />
            <circle cx="200" cy="200" r="5" fill="#22D3EE" fillOpacity="0.7" />
            <circle cx="600" cy="200" r="5" fill="#22D3EE" fillOpacity="0.7" />
            <circle cx="350" cy="280" r="4" fill="#818CF8" fillOpacity="0.7" />
            <circle cx="100" cy="120" r="3" fill="#22D3EE" fillOpacity="0.5" />
            <circle cx="700" cy="120" r="3" fill="#22D3EE" fillOpacity="0.5" />
            <circle cx="100" cy="300" r="3" fill="#34D399" fillOpacity="0.5" />
            <circle cx="700" cy="300" r="3" fill="#34D399" fillOpacity="0.5" />
            {/* Ripple rings around center node */}
            <circle cx="400" cy="150" r="18" stroke="#22D3EE" strokeWidth="0.5" strokeOpacity="0.4" />
            <circle cx="400" cy="150" r="32" stroke="#22D3EE" strokeWidth="0.5" strokeOpacity="0.2" />
          </svg>
        </div>

        {/* Overlay content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="text-center">
            <p className="font-display text-gold/50 text-sm md:text-base tracking-[0.5em] uppercase mb-4">
              Next Dimension Insight
            </p>
            <h2 className="font-display font-[800] text-white text-3xl md:text-6xl tracking-tighter">
              データが、未来を照らす
            </h2>
            <div className="w-20 h-px mx-auto mt-6" style={{ background: "linear-gradient(90deg, transparent, #22D3EE60, transparent)" }} />
          </div>
        </div>

        {/* Rotating SVG ring */}
        <div className="abs-center md:scale-100 scale-200">
          <svg className="spin-circle w-[15vw] h-[15vw] md:w-[10vw] md:h-[10vw]" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="#22D3EE18" strokeWidth="0.5" strokeDasharray="3 7" />
            <circle cx="100" cy="100" r="70" stroke="#22D3EE0C" strokeWidth="0.5" />
            <circle cx="100" cy="100" r="50" stroke="#22D3EE15" strokeWidth="0.5" strokeDasharray="6 4" />
          </svg>
          <div className="play-btn">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="ml-1">
              <path d="M8 5V19L19 12L8 5Z" fill="#22D3EE" fillOpacity="0.8" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualPinSection;
