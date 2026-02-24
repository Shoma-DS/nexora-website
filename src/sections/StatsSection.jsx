import { stats } from "../constants";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";

const StatsSection = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create(".stats-title", { type: "chars" });
    const paragraphSplit = SplitText.create(".stats-section p.stats-desc", {
      type: "words, lines",
      linesClass: "paragraph-line",
    });

    const contentTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top center",
      },
    });
    contentTl
      .from(titleSplit.chars, {
        yPercent: 100,
        stagger: 0.02,
        ease: "power2.out",
      })
      .from(paragraphSplit.words, {
        yPercent: 300,
        rotate: 3,
        ease: "power1.inOut",
        duration: 1,
        stagger: 0.01,
      });

    const titleTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top 80%",
      },
    });
    titleTl.to(".stats-text-scroll", {
      duration: 1,
      opacity: 1,
      clipPath: "polygon(100% 0, 0 0, 0 100%, 100% 100%)",
      ease: "power1.inOut",
    });

    // Counter animations
    gsap.utils.toArray(".stat-number").forEach((el) => {
      const endValue = parseFloat(el.dataset.value);
      const decimals = parseInt(el.dataset.decimals) || 0;
      const obj = { val: 0 };

      gsap.to(obj, {
        val: endValue,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".stats-section",
          start: "top 40%",
        },
        onUpdate() {
          el.textContent = obj.val.toFixed(decimals);
        },
      });
    });
  });

  return (
    <section className="stats-section noise-overlay">
      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="flex md:flex-row flex-col justify-between md:px-10 px-5 mt-14 md:mt-20 pt-20">
        <div className="relative inline-block md:translate-y-10">
          <div className="section-title relative flex flex-col justify-center items-center gap-16">
            <div className="overflow-hidden place-self-start">
              <h1 className="stats-title">Our track</h1>
            </div>
            <div
              style={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
              className="stats-text-scroll place-self-start"
            >
              <div className="bg-gold pb-4 md:pt-0 pt-3 md:px-6 px-4">
                <h2 className="text-bg-primary font-display">Record</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:justify-center items-center translate-y-5 md:mt-0 mt-10">
          <div className="md:max-w-sm max-w-md">
            <p className="stats-desc text-base md:text-right text-balance font-body text-white/50 leading-[2]">
              数字が証明する、NEXORAの実力。
              多くの企業のデータ変革を支援してきた実績が、すべてを語ります。
            </p>
          </div>
        </div>

        <div className="stats-box">
          <div className="list-wrapper">
            {stats.map((stat, index) => (
              <div key={index} className="relative flex-1 col-center">
                <div className="text-center">
                  <p className="md:text-sm text-xs font-body text-white/40">{stat.label}</p>
                  <p className="font-display text-3xl md:text-5xl font-[800] text-gold tracking-tighter mt-2">
                    <span
                      className="stat-number"
                      data-value={stat.value}
                      data-decimals={stat.decimals}
                    >
                      {stat.amount}
                    </span>
                    <span className="text-lg md:text-2xl text-gold/60 ml-1">{stat.suffix}</span>
                  </p>
                </div>
                {index !== stats.length - 1 && (
                  <div className="spacer-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
