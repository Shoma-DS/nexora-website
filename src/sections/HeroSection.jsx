import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";

const ticker = [
  "Generative AI", "//", "ChatGPT", "//", "n8n", "//", "Dify",
  "//", "AI研修", "//", "SNSマーケ", "//", "Meta Ads", "//",
  "LINE構築", "//", "ファネル設計", "//", "LP制作", "//", "プロモーション", "//",
];

// ── Network graph data ──────────────────────────────
const NODES = [
  { x: 720, y: 450, r: 7,  c: "#22D3EE", glow: true  },  // center hub
  { x: 210, y: 175, r: 4,  c: "#22D3EE", glow: true  },
  { x: 1230,y: 180, r: 4,  c: "#818CF8", glow: true  },
  { x: 185, y: 670, r: 3.5,c: "#34D399", glow: false },
  { x: 1255,y: 655, r: 3.5,c: "#22D3EE", glow: false },
  { x: 455, y: 270, r: 3,  c: "#22D3EE", glow: false },
  { x: 985, y: 270, r: 3,  c: "#818CF8", glow: false },
  { x: 370, y: 620, r: 3,  c: "#F472B6", glow: false },
  { x: 1070,y: 625, r: 3,  c: "#34D399", glow: false },
  { x: 70,  y: 440, r: 2.5,c: "#22D3EE", glow: false },
  { x: 1370,y: 440, r: 2.5,c: "#22D3EE", glow: false },
  { x: 720, y: 85,  r: 2.5,c: "#818CF8", glow: false },
  { x: 720, y: 830, r: 2.5,c: "#818CF8", glow: false },
  { x: 590, y: 360, r: 2,  c: "#22D3EE", glow: false },
  { x: 850, y: 360, r: 2,  c: "#22D3EE", glow: false },
  { x: 570, y: 535, r: 2,  c: "#34D399", glow: false },
  { x: 870, y: 535, r: 2,  c: "#34D399", glow: false },
  { x: 310, y: 390, r: 2,  c: "#F472B6", glow: false },
  { x: 1130,y: 390, r: 2,  c: "#F472B6", glow: false },
];

const EDGES = [
  [0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],
  [1,5],[1,9],[1,17],[2,6],[2,10],[2,18],[3,7],[3,9],[4,8],[4,10],
  [5,13],[6,14],[7,15],[8,16],[11,5],[11,6],[12,7],[12,8],
];

// Hex grid positions (cx, cy, animDelay)
const HEXES = [
  [120,160,0],[280,130,0.8],[1160,140,1.2],[1320,160,0.4],
  [80,640,1.6],[240,680,0.6],[1200,660,1.4],[1360,630,0.2],
  [420,140,2],[620,100,1],[840,110,0.5],[1040,150,1.8],
  [130,430,0.9],[1310,430,1.1],
  [360,760,0.3],[600,810,1.5],[840,820,0.7],[1080,760,1.3],
];

const hexPts = (cx, cy, r) =>
  [0,60,120,180,240,300].map(d => {
    const a = d * Math.PI / 180;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(' ');

// Data stream columns
const STREAMS = [
  { x: 140, delay: 0,   dur: 8  },
  { x: 360, delay: 1.5, dur: 11 },
  { x: 560, delay: 3,   dur: 9  },
  { x: 880, delay: 0.8, dur: 10 },
  { x: 1080,delay: 2.2, dur: 7  },
  { x: 1300,delay: 1,   dur: 12 },
];

const heroStyles = `
  @keyframes h-orbit1    { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
  @keyframes h-orbit2    { from{transform:rotate(0deg)}   to{transform:rotate(-360deg)} }
  @keyframes h-orbit3    { from{transform:rotate(0deg)}   to{transform:rotate(360deg)} }
  @keyframes h-pulse     { 0%,100%{opacity:.55;r:var(--r)} 50%{opacity:1;r:calc(var(--r) * 1.55)} }
  @keyframes h-flow      { 0%{stroke-dashoffset:240;opacity:0} 15%{opacity:.55} 80%{opacity:.4} 100%{stroke-dashoffset:0;opacity:.1} }
  @keyframes h-ping1     { 0%{r:6;opacity:.7}  100%{r:70;opacity:0} }
  @keyframes h-ping2     { 0%{r:6;opacity:.45} 100%{r:120;opacity:0} }
  @keyframes h-ping3     { 0%{r:6;opacity:.25} 100%{r:200;opacity:0} }
  @keyframes h-data-fall { 0%{opacity:0;transform:translateY(-40px)} 10%{opacity:.65} 85%{opacity:.4} 100%{opacity:0;transform:translateY(940px)} }
  @keyframes h-glow      { 0%,100%{opacity:.035} 50%{opacity:.09} }
  @keyframes h-hex       { 0%,100%{opacity:.04}  50%{opacity:.18} }
  @keyframes h-scan      { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
  @keyframes h-node-fp   { 0%,100%{opacity:.5;transform:scale(1)}   50%{opacity:1;transform:scale(1.4)} }
  @keyframes h-float-pt  { 0%,100%{transform:translate(0,0)}        50%{transform:translate(4px,-12px)} }
  @keyframes h-glitch {
    0%,80%,100% { clip-path:none; transform:none; opacity:1; }
    81%          { clip-path:inset(18% 0 58% 0); transform:translate(-4px,0); opacity:.9; }
    83%          { clip-path:inset(55% 0 22% 0); transform:translate(4px,0);  opacity:.9; }
    85%          { clip-path:inset(8%  0 76% 0); transform:translate(-2px,0); opacity:.85;}
    87%          { clip-path:none; transform:none; opacity:1; }
  }
  @keyframes h-ticker-chroma {
    0%,90%,100% { text-shadow:none; }
    91%         { text-shadow:-2px 0 #F472B6,.5px 0 #22D3EE; }
    92%         { text-shadow: 2px 0 #22D3EE,-1px 0 #F472B6; }
    93%         { text-shadow:none; }
  }

  .h-orbit1  { transform-origin:720px 450px; animation:h-orbit1 28s linear infinite; }
  .h-orbit2  { transform-origin:720px 450px; animation:h-orbit2 18s linear infinite; }
  .h-orbit3  { transform-origin:720px 450px; animation:h-orbit3 45s linear infinite; }
  .h-flow    { stroke-dasharray:24 216; animation:h-flow 3.5s ease-in-out infinite; }
  .h-ping1   { animation:h-ping1 4s ease-out infinite; }
  .h-ping2   { animation:h-ping2 4s ease-out 1.3s infinite; }
  .h-ping3   { animation:h-ping3 4s ease-out 2.6s infinite; }
  .h-glow    { animation:h-glow 5s ease-in-out infinite; }
  .h-hex     { animation:h-hex 4s ease-in-out infinite; }
  .h-scan    { transform-origin:720px 450px; animation:h-scan 10s linear infinite; }
  .h-float   { animation:h-float-pt 9s ease-in-out infinite; }
  .h-glitch  { animation:h-glitch 7s ease-in-out infinite; }
`;

const HeroSection = () => {
  useGSAP(() => {
    const titleSplit = SplitText.create(".hero-title", { type: "chars" });
    const tl = gsap.timeline({ delay: 0.6 });

    tl.to(".hero-content", { opacity: 1, y: 0, ease: "power1.inOut" })
      .to(".hero-text-scroll", {
        duration: 1,
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "circ.out",
      }, "-=0.5")
      .from(titleSplit.chars, { yPercent: 200, stagger: 0.025, ease: "power3.out" }, "-=0.5")
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
      rotate: 4, scale: 0.88, yPercent: 28, ease: "power1.inOut",
    });
  });

  return (
    <section className="bg-bg-primary">
      <div className="hero-container noise-overlay">

        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-100" />

        {/* ─── Rich SVG background ────────────────────── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg viewBox="0 0 1440 900" className="w-full h-full" fill="none"
               preserveAspectRatio="xMidYMid slice">
            <style>{heroStyles}</style>

            {/* Ambient glow blobs */}
            <ellipse cx="720" cy="450" rx="480" ry="260" fill="#22D3EE" className="h-glow" />
            <ellipse cx="220" cy="200" rx="280" ry="200" fill="#818CF8" className="h-glow" style={{animationDelay:"2s"}}/>
            <ellipse cx="1220" cy="700" rx="260" ry="180" fill="#34D399" className="h-glow" style={{animationDelay:"1s"}}/>

            {/* Hex grid cells */}
            {HEXES.map(([cx,cy,d],i)=>(
              <polygon key={`h${i}`} points={hexPts(cx,cy,38)}
                stroke="#22D3EE" strokeOpacity="0.5" strokeWidth="0.6" fill="none"
                className="h-hex" style={{animationDelay:`${d}s`}}/>
            ))}

            {/* Rotating ellipse rings */}
            <g className="h-orbit1" opacity="0.13">
              <ellipse cx="720" cy="450" rx="380" ry="210" stroke="#22D3EE" strokeWidth="0.6" strokeDasharray="8 6"/>
              {/* Orbit dot */}
              <circle cx="720" cy="240" r="3.5" fill="#22D3EE" opacity="0.8"/>
            </g>
            <g className="h-orbit2" opacity="0.09">
              <ellipse cx="720" cy="450" rx="520" ry="290" stroke="#818CF8" strokeWidth="0.5" strokeDasharray="4 10"/>
              <circle cx="720" cy="160" r="2.5" fill="#818CF8" opacity="0.7"/>
              <circle cx="720" cy="740" r="2.5" fill="#818CF8" opacity="0.7"/>
            </g>
            <g className="h-orbit3" opacity="0.06">
              <circle cx="720" cy="450" r="460" stroke="#22D3EE" strokeWidth="0.5" strokeDasharray="14 10"/>
            </g>

            {/* Radar sweep — very subtle */}
            <g className="h-scan" opacity="0.04">
              <path d="M720 450 L720 10" stroke="url(#radarGrad)" strokeWidth="160"
                style={{filter:"blur(18px)"}} strokeLinecap="round"/>
            </g>
            <defs>
              <linearGradient id="radarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#22D3EE" stopOpacity="0"/>
              </linearGradient>
            </defs>

            {/* Network edges with flow */}
            {EDGES.map(([a,b],i)=>{
              const na=NODES[a], nb=NODES[b];
              const edgeColor = i%3===0?"#22D3EE":i%3===1?"#818CF8":"#34D399";
              return (
                <g key={`e${i}`}>
                  {/* Static dim base */}
                  <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke={edgeColor} strokeOpacity="0.07" strokeWidth="0.7"/>
                  {/* Animated flow */}
                  <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke={edgeColor} strokeOpacity="0.4" strokeWidth="0.9"
                    className="h-flow" style={{animationDelay:`${(i*0.22)%3.5}s`}}/>
                </g>
              );
            })}

            {/* Network nodes */}
            {NODES.map((n,i)=>(
              <g key={`n${i}`} className="h-float" style={{animationDelay:`${i*0.35}s`}}>
                {/* Outer glow ring */}
                <circle cx={n.x} cy={n.y} r={n.r+10}
                  fill={n.c} fillOpacity="0.06"
                  stroke={n.c} strokeOpacity="0.2" strokeWidth="0.5"/>
                {/* Node */}
                <circle cx={n.x} cy={n.y} r={n.r}
                  fill={n.c} opacity={n.r >= 4 ? 0.9 : 0.65}
                  style={n.glow ? {filter:`drop-shadow(0 0 6px ${n.c})`} : {}}/>
                {/* Pulse animation on larger nodes */}
                {n.r >= 3.5 && (
                  <circle cx={n.x} cy={n.y} r={n.r}
                    fill="none" stroke={n.c} strokeOpacity="0.6" strokeWidth="1.5"
                    className="h-ping1" style={{animationDelay:`${i*0.6}s`}}/>
                )}
              </g>
            ))}

            {/* Data stream columns */}
            {STREAMS.map((s,i)=>(
              <line key={`s${i}`}
                x1={s.x} y1="-40" x2={s.x} y2="940"
                stroke="#22D3EE" strokeOpacity="0.35" strokeWidth="0.7"
                strokeDasharray="2 40"
                style={{
                  animation: `h-data-fall ${s.dur}s linear ${s.delay}s infinite`,
                }}/>
            ))}

            {/* Center ping rings */}
            <circle cx="720" cy="450" r="6" fill="#22D3EE" opacity="0" className="h-ping1"/>
            <circle cx="720" cy="450" r="6" fill="#22D3EE" opacity="0" className="h-ping2"/>
            <circle cx="720" cy="450" r="6" fill="#22D3EE" opacity="0" className="h-ping3"/>

            {/* Corner frame brackets */}
            {[[28,80,1,1],[1412,80,-1,1],[28,820,1,-1],[1412,820,-1,-1]].map(([x,y,sx,sy],i)=>(
              <g key={`br${i}`} opacity="0.35">
                <line x1={x} y1={y} x2={x+sx*40} y2={y} stroke="#22D3EE" strokeWidth="1.5"/>
                <line x1={x} y1={y} x2={x} y2={y+sy*40} stroke="#22D3EE" strokeWidth="1.5"/>
                <circle cx={x} cy={y} r="2" fill="#22D3EE" opacity="0.7"/>
              </g>
            ))}

            {/* Mid-frame side tick marks */}
            {[[0,450],[1440,450]].map(([x,y],i)=>(
              <g key={`tk${i}`} opacity="0.2">
                <line x1={x} y1={y-30} x2={x+(i===0?12:-12)} y2={y} stroke="#22D3EE" strokeWidth="1"/>
                <line x1={x} y1={y+30} x2={x+(i===0?12:-12)} y2={y} stroke="#22D3EE" strokeWidth="1"/>
              </g>
            ))}
          </svg>
        </div>

        {/* Radial glow center (CSS) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,211,238,0.08)_0%,_transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(129,140,248,0.05)_0%,_transparent_50%)]" />

        {/* Scan line */}
        <div className="scan-line" />

        {/* Floating particles (original) */}
        <div className="hero-particles opacity-0 absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="absolute rounded-full"
              style={{
                left: `${8 + i * 8}%`,
                top: `${12 + (i % 5) * 16}%`,
                width:  i % 3 === 0 ? "3px" : "1.5px",
                height: i % 3 === 0 ? "3px" : "1.5px",
                background: i % 4 === 0 ? "#818CF8" : i % 4 === 1 ? "#34D399" : "#22D3EE",
                boxShadow: `0 0 10px ${i % 4 === 0 ? "#818CF8" : i % 4 === 1 ? "#34D399" : "#22D3EE"}`,
                animation: `float${i % 3} ${7 + i * 1.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        <style>{`
          @keyframes float0 { 0%,100%{transform:translateY(0)}        50%{transform:translateY(-28px)} }
          @keyframes float1 { 0%,100%{transform:translate(0,0)}       50%{transform:translate(8px,-20px)} }
          @keyframes float2 { 0%,100%{transform:translateY(0)}        50%{transform:translateY(-36px)} }
        `}</style>

        {/* ─ Hero content ─────────────────────────────── */}
        <div className="hero-content opacity-0">
          <p className="font-display text-gold/70 text-xs md:text-sm tracking-[0.4em] uppercase mb-6">
            AI × Digital Marketing Partner
          </p>

          <div className="overflow-hidden">
            <h1 className="hero-title h-glitch">NEXORA</h1>
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
              <span key={i}
                className={`font-display text-[10px] tracking-[0.3em] uppercase flex-none ${
                  item === "//" ? "text-gold/20" : "text-white/20"
                }`}>
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
