import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const ticker = [
  "Generative AI", "//", "ChatGPT", "//", "n8n", "//", "Dify",
  "//", "AI研修", "//", "SNSマーケ", "//", "Meta Ads", "//",
  "LINE構築", "//", "ファネル設計", "//", "LP制作", "//", "プロモーション", "//",
];

const HeroSection = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", {
      type: "chars",
    });

    const tl = gsap.timeline({ delay: 0.6 });

    tl.to(".hero-content", {
      opacity: 1,
      y: 0,
      ease: "power1.inOut",
    })
      .to(
        ".hero-text-scroll",
        {
          duration: 1,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "circ.out",
        },
        "-=0.5"
      )
      .from(
        titleSplit.chars,
        {
          yPercent: 200,
          stagger: 0.025,
          ease: "power3.out",
        },
        "-=0.5"
      )
      .to(".hero-particles", { opacity: 1, duration: 2 }, "-=1")
      .from(".hero-ticker", { opacity: 0, y: 10, duration: 0.8 }, "-=1.5");

    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-container",
        start: "1% top",
        end: "bottom top",
        scrub: true,
      },
    });
    heroTl.to(".hero-container", {
      rotate: 4,
      scale: 0.88,
      yPercent: 28,
      ease: "power1.inOut",
    });
  });

  return (
    <section className="bg-bg-primary">
      <div className="hero-container noise-overlay">
        {/* Dot grid background */}
        <div className="absolute inset-0 dot-grid opacity-100" />

        {/* Radial glow center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.06)_0%,_transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(129,140,248,0.04)_0%,_transparent_50%)]" />

        {/* Scan line */}
        <div className="scan-line" />

        {/* Floating particles */}
        <div className="hero-particles opacity-0 absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px rounded-full bg-gold"
              style={{
                left: `${10 + i * 12}%`,
                top: `${15 + (i % 4) * 20}%`,
                width: i % 3 === 0 ? "2px" : "1px",
                height: i % 3 === 0 ? "2px" : "1px",
                boxShadow: `0 0 8px rgba(34, 211, 238, 0.8)`,
                animation: `float${i % 3} ${7 + i * 1.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes float0 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-28px); } }
          @keyframes float1 { 0%, 100% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-18px) translateX(8px); } }
          @keyframes float2 { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-36px); } }
        `}</style>

        {/* Corner accents */}
        <div className="absolute top-24 left-8 w-16 h-16 opacity-20">
          <svg viewBox="0 0 60 60" fill="none">
            <path d="M0 60 L0 0 L60 0" stroke="#22D3EE" strokeWidth="1" />
          </svg>
        </div>
        <div className="absolute top-24 right-8 w-16 h-16 opacity-20">
          <svg viewBox="0 0 60 60" fill="none">
            <path d="M60 60 L60 0 L0 0" stroke="#22D3EE" strokeWidth="1" />
          </svg>
        </div>

        <div className="hero-content opacity-0">
          <p className="font-display text-gold/70 text-xs md:text-sm tracking-[0.4em] uppercase mb-6">
            AI × Digital Marketing Partner
          </p>

          <div className="overflow-hidden">
            <h1 className="hero-title">NEXORA</h1>
          </div>

          <div
            style={{ clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" }}
            className="hero-text-scroll mt-4"
          >
            <div className="hero-subtitle">
              <h1>AIで、売上を加速する</h1>
            </div>
          </div>

          <p className="hero-description">
            生成AI導入・SNS広告・LINE構築・ファネル設計・プロモーション。<br />
            AIとデジタルマーケティングの力で、ビジネスの成長を加速させる。
          </p>

          <div className="hero-button">
            <p>無料相談はこちら</p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
            <span className="font-display text-white/25 text-[10px] tracking-[0.4em] uppercase">Scroll</span>
            <div className="w-px h-10 bg-gradient-to-b from-gold/40 to-transparent" />
          </div>
        </div>

        {/* Tech ticker strip */}
        <div className="hero-ticker opacity-0 absolute bottom-0 left-0 w-full overflow-hidden border-t border-gold/10 bg-bg-primary/30 backdrop-blur-sm py-2.5">
          <div className="ticker-track flex gap-10">
            {[...ticker, ...ticker].map((item, i) => (
              <span
                key={i}
                className={`font-display text-[10px] tracking-[0.3em] uppercase flex-none ${
                  item === "//" ? "text-gold/20" : "text-white/20"
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
