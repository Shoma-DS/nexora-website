import { caseStudies } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Abstract data visualizations per sector
const SectorVisual = ({ sector, color = "#22D3EE" }) => {
  const visuals = {
    Finance: (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        {/* Line chart - declining bad debt */}
        <polyline points="10,70 35,60 55,50 80,42 100,30 130,20 160,15 190,10"
          stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
        <polyline points="10,70 35,60 55,50 80,42 100,30 130,20 160,15 190,10 190,90 10,90"
          fill={`${color}12`} />
        {/* Grid lines */}
        {[20, 40, 60, 80].map(y => (
          <line key={y} x1="10" y1={y} x2="190" y2={y} stroke={color} strokeOpacity="0.08" strokeWidth="0.5" strokeDasharray="4 4" />
        ))}
        {/* Data points */}
        {[[10,70],[55,50],[100,30],[160,15],[190,10]].map(([x,y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill={color} opacity="0.8" />
        ))}
        {/* Down trend indicator */}
        <text x="160" y="8" fill={color} fontSize="8" fontFamily="Syne" opacity="0.6">−60%</text>
      </svg>
    ),
    Manufacturing: (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        {/* Circular gauge */}
        <circle cx="100" cy="55" r="40" stroke={color} strokeOpacity="0.1" strokeWidth="8" />
        <circle cx="100" cy="55" r="40" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${Math.PI * 80 * 0.8} ${Math.PI * 80}`}
          transform="rotate(-210 100 55)" opacity="0.8" />
        {/* Gear teeth hints */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map(deg => (
          <rect key={deg} x="97" y="9" width="6" height="10" rx="1"
            fill={color} fillOpacity="0.15"
            transform={`rotate(${deg} 100 55)`} />
        ))}
        {/* Metric text */}
        <text x="100" y="51" fill={color} fontSize="18" fontFamily="Syne" fontWeight="700"
          textAnchor="middle" opacity="0.9">80%</text>
        <text x="100" y="63" fill={color} fontSize="7" fontFamily="Noto Sans JP"
          textAnchor="middle" opacity="0.5">稼働率改善</text>
        {/* Bar indicators on sides */}
        <rect x="15" y="40" width="6" height="30" rx="3" fill={color} fillOpacity="0.2" />
        <rect x="15" y="55" width="6" height="15" rx="3" fill={color} fillOpacity="0.7" />
        <rect x="179" y="40" width="6" height="30" rx="3" fill={color} fillOpacity="0.2" />
        <rect x="179" y="46" width="6" height="24" rx="3" fill={color} fillOpacity="0.7" />
      </svg>
    ),
    Retail: (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        {/* Bar chart - inventory reduction */}
        {[
          { x: 20, h: 65, label: "Before", opacity: 0.25 },
          { x: 50, h: 55, label: "", opacity: 0.3 },
          { x: 80, h: 48, label: "", opacity: 0.4 },
          { x: 110, h: 38, label: "", opacity: 0.55 },
          { x: 140, h: 28, label: "", opacity: 0.7 },
          { x: 170, h: 20, label: "After", opacity: 0.9 },
        ].map((bar, i) => (
          <g key={i}>
            <rect x={bar.x} y={90 - bar.h - 10} width="22" height={bar.h} rx="3"
              fill={color} fillOpacity={bar.opacity} />
          </g>
        ))}
        {/* Baseline */}
        <line x1="10" y1="80" x2="200" y2="80" stroke={color} strokeOpacity="0.2" strokeWidth="0.5" />
        {/* Trend line */}
        <polyline points="31,18 61,22 91,29 121,39 151,49 181,58"
          stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        {/* Labels */}
        <text x="31" y="88" fill={color} fontSize="6" fontFamily="Syne" textAnchor="middle" opacity="0.5">1Q</text>
        <text x="181" y="88" fill={color} fontSize="6" fontFamily="Syne" textAnchor="middle" opacity="0.5">6Q</text>
        <text x="190" y="62" fill={color} fontSize="8" fontFamily="Syne" opacity="0.7">−35%</text>
      </svg>
    ),
    Healthcare: (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        {/* ECG / pulse line */}
        <polyline
          points="5,50 30,50 40,50 50,20 57,70 63,50 75,50 85,50 95,15 103,75 110,50 130,50 140,50 150,25 157,65 163,50 180,50 200,50"
          stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"
        />
        {/* Speed indicators - concentric arcs */}
        <path d="M 160 80 A 30 30 0 0 1 190 50" stroke={color} strokeWidth="1.5" opacity="0.3" strokeLinecap="round" />
        <path d="M 153 83 A 37 37 0 0 1 193 46" stroke={color} strokeWidth="1" opacity="0.2" strokeLinecap="round" />
        {/* 5x badge */}
        <circle cx="175" cy="25" r="14" fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
        <text x="175" y="22" fill={color} fontSize="11" fontFamily="Syne" fontWeight="700"
          textAnchor="middle" opacity="0.9">5×</text>
        <text x="175" y="32" fill={color} fontSize="5.5" fontFamily="Syne"
          textAnchor="middle" opacity="0.6">SPEED</text>
        {/* Grid */}
        <line x1="0" y1="50" x2="145" y2="50" stroke={color} strokeOpacity="0.1" strokeWidth="0.5" />
      </svg>
    ),
    Cloud: (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        {/* Cost reduction visualization - stacked area */}
        <path d="M10,75 L40,70 L70,62 L100,50 L130,35 L160,22 L190,15 L190,85 L10,85Z"
          fill={color} fillOpacity="0.08" />
        <polyline points="10,75 40,70 70,62 100,50 130,35 160,22 190,15"
          stroke={color} strokeWidth="1.5" opacity="0.7" />
        {/* Cloud nodes */}
        {[[30,30],[100,20],[170,28]].map(([x,y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="10" fill={color} fillOpacity="0.1" stroke={color} strokeOpacity="0.3" strokeWidth="1" />
            <circle cx={x} cy={y} r="3" fill={color} opacity="0.6" />
          </g>
        ))}
        {/* Connecting dashed lines between clouds */}
        <line x1="40" y1="30" x2="90" y2="20" stroke={color} strokeOpacity="0.25" strokeDasharray="4 3" strokeWidth="1" />
        <line x1="110" y1="20" x2="160" y2="28" stroke={color} strokeOpacity="0.25" strokeDasharray="4 3" strokeWidth="1" />
        {/* Savings badge */}
        <text x="110" y="72" fill={color} fontSize="9" fontFamily="Syne" fontWeight="700" opacity="0.8">−55% COST</text>
      </svg>
    ),
    Logistics: (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        {/* Route map dots */}
        {[
          [20,70],[50,45],[80,60],[110,30],[145,55],[175,20]
        ].map(([x,y], i, arr) => (
          <g key={i}>
            {i < arr.length - 1 && (
              <>
                {/* Old route (dashed) */}
                <line x1={x} y1={y} x2={arr[i+1][0]} y2={arr[i+1][1]}
                  stroke={color} strokeOpacity="0.15" strokeDasharray="3 3" strokeWidth="1" />
              </>
            )}
            <circle cx={x} cy={y} r="5" fill={color} fillOpacity="0.2" stroke={color} strokeOpacity="0.5" strokeWidth="1" />
            <circle cx={x} cy={y} r="2" fill={color} opacity="0.8" />
          </g>
        ))}
        {/* Optimized route (solid, shorter-looking) */}
        <polyline points="20,70 60,35 110,30 175,20"
          stroke={color} strokeWidth="2" opacity="0.7" strokeLinecap="round" strokeLinejoin="round" />
        {/* Speed arrow */}
        <path d="M155 60 L185 60 L178 55 M185 60 L178 65" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <text x="20" y="87" fill={color} fontSize="7" fontFamily="Syne" opacity="0.5">ORIGIN</text>
        <text x="158" y="87" fill={color} fontSize="7" fontFamily="Syne" opacity="0.5">DEST +42%</text>
      </svg>
    ),
    EdTech: (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        {/* Progress ring - large */}
        <circle cx="60" cy="50" r="35" stroke={color} strokeOpacity="0.1" strokeWidth="6" />
        <circle cx="60" cy="50" r="35" stroke={color} strokeWidth="6" strokeLinecap="round"
          strokeDasharray={`${Math.PI * 70 * 0.78} ${Math.PI * 70}`}
          transform="rotate(-90 60 50)" opacity="0.8" />
        <text x="60" y="47" fill={color} fontSize="13" fontFamily="Syne" fontWeight="700"
          textAnchor="middle" opacity="0.9">2.8×</text>
        <text x="60" y="58" fill={color} fontSize="6" textAnchor="middle" opacity="0.5">完了率</text>

        {/* Progress bars - individual learners */}
        {[
          { y: 18, w: 90, op: 0.5 },
          { y: 30, w: 110, op: 0.6 },
          { y: 42, w: 75, op: 0.45 },
          { y: 54, w: 125, op: 0.7 },
          { y: 66, w: 100, op: 0.55 },
          { y: 78, w: 130, op: 0.8 },
        ].map((bar, i) => (
          <g key={i}>
            <rect x="115" y={bar.y} width="75" height="6" rx="3" fill={color} fillOpacity="0.08" />
            <rect x="115" y={bar.y} width={bar.w * 0.6} height="6" rx="3" fill={color} fillOpacity={bar.op} />
          </g>
        ))}
      </svg>
    ),
  };

  return visuals[sector] || visuals.Finance;
};

const CasesSection = () => {
  useGSAP(() => {
    gsap.set(".cases-section", {
      marginTop: "-140vh",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cases-section",
        start: "top bottom",
        end: "200% top",
        scrub: true,
      },
    });

    tl.to(".cases-section .first-title", { xPercent: 70 })
      .to(".cases-section .sec-title", { xPercent: 25 }, "<")
      .to(".cases-section .third-title", { xPercent: -50 }, "<");

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cases-section",
        start: "10% top",
        end: "200% top",
        scrub: 1.5,
        pin: true,
      },
    });

    pinTl.from(".case-card", {
      yPercent: 150,
      stagger: 0.2,
      ease: "power1.inOut",
    });
  });

  return (
    <section id="cases" className="cases-section">
      <div className="absolute size-full flex flex-col items-center pt-[5vw]">
        <h1 className="text-white/10 first-title">Case</h1>
        <h1 className="text-gradient-gold sec-title">Study</h1>
        <h1 className="text-white/10 third-title">Results</h1>
      </div>

      <div className="pin-box">
        {caseStudies.map((study, index) => (
          <div
            key={index}
            className={`case-card ${study.translation || ""} ${study.rotation}`}
          >
            <div
              className="w-full md:h-[500px] h-[420px] flex flex-col"
              style={{ background: study.bg }}
            >
              {/* Visual area - top 45% */}
              <div className="relative flex-none" style={{ height: "45%" }}>
                {/* Subtle top gradient overlay */}
                <div className="absolute inset-0 opacity-40"
                  style={{
                    background: `radial-gradient(ellipse at 50% 0%, ${
                      index % 5 === 0 ? "#22D3EE" :
                      index % 5 === 1 ? "#818CF8" :
                      index % 5 === 2 ? "#34D399" :
                      index % 5 === 3 ? "#FB923C" : "#F472B6"
                    }15, transparent 70%)`
                  }}
                />
                {/* Sector SVG visualization */}
                <div className="absolute inset-0 p-4 flex items-center">
                  <SectorVisual
                    sector={study.sector}
                    color={
                      index % 5 === 0 ? "#22D3EE" :
                      index % 5 === 1 ? "#818CF8" :
                      index % 5 === 2 ? "#34D399" :
                      index % 5 === 3 ? "#FB923C" : "#F472B6"
                    }
                  />
                </div>
                {/* Case number + sector badge */}
                <div className="absolute top-4 left-4">
                  <span className="font-display text-white/30 text-[10px] tracking-[0.3em] uppercase">
                    Case {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span
                    className="font-display text-[9px] tracking-[0.25em] uppercase px-2 py-1 rounded-full"
                    style={{
                      color: index % 5 === 0 ? "#22D3EE" : index % 5 === 1 ? "#818CF8" : index % 5 === 2 ? "#34D399" : index % 5 === 3 ? "#FB923C" : "#F472B6",
                      border: `1px solid ${index % 5 === 0 ? "#22D3EE30" : index % 5 === 1 ? "#818CF830" : index % 5 === 2 ? "#34D39930" : index % 5 === 3 ? "#FB923C30" : "#F472B630"}`,
                      background: index % 5 === 0 ? "#22D3EE08" : index % 5 === 1 ? "#818CF808" : index % 5 === 2 ? "#34D39908" : index % 5 === 3 ? "#FB923C08" : "#F472B608",
                    }}
                  >
                    {study.sector}
                  </span>
                </div>
              </div>

              {/* Divider */}
              <div
                className="flex-none h-px mx-6"
                style={{
                  background: `linear-gradient(90deg, transparent, ${
                    index % 5 === 0 ? "#22D3EE40" : index % 5 === 1 ? "#818CF840" : index % 5 === 2 ? "#34D39940" : index % 5 === 3 ? "#FB923C40" : "#F472B640"
                  }, transparent)`
                }}
              />

              {/* Content area - bottom 55% */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-[700] text-white/90 text-lg tracking-tight">
                    {study.title}
                  </h3>
                  <p className="font-body text-white/40 text-xs leading-[1.7] mt-2">
                    {study.detail}
                  </p>
                </div>

                {/* Key metric */}
                <div>
                  <div className="flex items-end gap-2 mb-1">
                    <span
                      className="font-display font-[800] text-3xl tracking-tight leading-none"
                      style={{
                        color: index % 5 === 0 ? "#22D3EE" : index % 5 === 1 ? "#A5F3FC" : index % 5 === 2 ? "#34D399" : index % 5 === 3 ? "#FB923C" : "#F472B6",
                      }}
                    >
                      {study.metric}
                    </span>
                    <span className="font-body text-white/60 text-xs mb-1">{study.metricLabel}</span>
                  </div>
                  <p className="font-body text-white/50 text-xs">{study.result}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CasesSection;
