import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

// ネットワークノード定義
const NODES = [
  { id: 0, cx: 400, cy: 200, r: 8,  color: "#22D3EE", label: "AI Core" },
  { id: 1, cx: 200, cy: 160, r: 5,  color: "#22D3EE", label: "Data" },
  { id: 2, cx: 620, cy: 160, r: 5,  color: "#22D3EE", label: "Analytics" },
  { id: 3, cx: 310, cy: 310, r: 4,  color: "#818CF8", label: "LINE" },
  { id: 4, cx: 510, cy: 310, r: 4,  color: "#818CF8", label: "SNS" },
  { id: 5, cx: 80,  cy: 100, r: 3,  color: "#34D399", label: "" },
  { id: 6, cx: 720, cy: 100, r: 3,  color: "#34D399", label: "" },
  { id: 7, cx: 80,  cy: 320, r: 3,  color: "#34D399", label: "" },
  { id: 8, cx: 720, cy: 320, r: 3,  color: "#22D3EE", label: "" },
  { id: 9, cx: 150, cy: 260, r: 3,  color: "#F472B6", label: "" },
  { id: 10, cx: 650, cy: 260, r: 3, color: "#F472B6", label: "" },
  { id: 11, cx: 400, cy: 60,  r: 3, color: "#22D3EE", label: "" },
  { id: 12, cx: 400, cy: 360, r: 3, color: "#818CF8", label: "" },
];

const EDGES = [
  [0,1],[0,2],[0,3],[0,4],[0,11],
  [1,5],[1,9],[1,3],
  [2,6],[2,10],[2,4],
  [3,7],[3,12],[4,8],[4,12],
  [5,11],[6,11],[7,9],[8,10],
];

const pinBgStyles = `
  @keyframes vp-pulse  { 0%,100%{opacity:.6;transform:scale(1)}  50%{opacity:1;transform:scale(1.6)} }
  @keyframes vp-ring   { 0%{r:8;opacity:.5} 100%{r:38;opacity:0} }
  @keyframes vp-ring2  { 0%{r:8;opacity:.3} 100%{r:60;opacity:0} }
  @keyframes vp-flow   { 0%{stroke-dashoffset:60;opacity:0} 30%{opacity:.7} 100%{stroke-dashoffset:0;opacity:.25} }
  @keyframes vp-rotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes vp-rotateCCW { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }
  @keyframes vp-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes vp-scan   { 0%{opacity:0;transform:translateY(-200px)} 20%{opacity:.15} 80%{opacity:.15} 100%{opacity:0;transform:translateY(600px)} }
  @keyframes vp-data   { 0%{opacity:0;r:2} 50%{opacity:.9} 100%{opacity:0;r:4} }
  @keyframes vp-glow   { 0%,100%{opacity:.04} 50%{opacity:.1} }

  .vp-pulse  { animation: vp-pulse  3s ease-in-out infinite; }
  .vp-ring1  { animation: vp-ring   3s ease-out infinite; }
  .vp-ring2  { animation: vp-ring2  3s ease-out .8s infinite; }
  .vp-ring3  { animation: vp-ring   3s ease-out 1.6s infinite; }
  .vp-flow   { stroke-dasharray:20 40; animation: vp-flow 2.5s ease-in-out infinite; }
  .vp-rotate { transform-origin:400px 200px; animation: vp-rotate 20s linear infinite; }
  .vp-rotateCCW { transform-origin:400px 200px; animation: vp-rotateCCW 14s linear infinite; }
  .vp-float  { animation: vp-float 6s ease-in-out infinite; }
  .vp-scan   { animation: vp-scan 6s ease-in-out infinite; }
  .vp-data   { animation: vp-data 2s ease-in-out infinite; }
  .vp-glow   { animation: vp-glow 4s ease-in-out infinite; }
`;

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

        {/* ── Rich animated SVG background ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg viewBox="0 0 800 420" className="w-full h-full" fill="none"
               style={{ overflow: "visible" }}>
            <style>{pinBgStyles}</style>

            {/* Ambient glow blobs */}
            <ellipse cx="400" cy="200" rx="260" ry="140" fill="#22D3EE" className="vp-glow"/>
            <ellipse cx="200" cy="180" rx="120" ry="80" fill="#818CF8" className="vp-glow" style={{animationDelay:"2s"}}/>
            <ellipse cx="600" cy="230" rx="110" ry="70" fill="#34D399" className="vp-glow" style={{animationDelay:"1s"}}/>

            {/* Rotating outer hexagon frame */}
            <g className="vp-rotate" opacity="0.12">
              <polygon points="400,80 530,155 530,305 400,380 270,305 270,155"
                stroke="#22D3EE" strokeWidth="0.8" fill="none"/>
            </g>
            <g className="vp-rotateCCW" opacity="0.08">
              <polygon points="400,110 500,165 500,295 400,350 300,295 300,165"
                stroke="#818CF8" strokeWidth="0.6" fill="none"/>
            </g>

            {/* Scan line */}
            <line x1="0" y1="0" x2="800" y2="0"
              stroke="#22D3EE" strokeOpacity="0.2" strokeWidth="1.5" className="vp-scan"/>

            {/* Edge lines with flow animation */}
            {EDGES.map(([a, b], i) => {
              const na = NODES[a], nb = NODES[b];
              const delay = `${(i * 0.18) % 2.5}s`;
              return (
                <line key={`e${i}`}
                  x1={na.cx} y1={na.cy} x2={nb.cx} y2={nb.cy}
                  stroke={i % 3 === 0 ? "#22D3EE" : i % 3 === 1 ? "#818CF8" : "#34D399"}
                  strokeOpacity="0.3" strokeWidth="0.8"
                  className="vp-flow"
                  style={{ animationDelay: delay }}
                />
              );
            })}

            {/* Secondary static edge layer for depth */}
            {EDGES.map(([a, b], i) => {
              const na = NODES[a], nb = NODES[b];
              return (
                <line key={`es${i}`}
                  x1={na.cx} y1={na.cy} x2={nb.cx} y2={nb.cy}
                  stroke="#22D3EE" strokeOpacity="0.06" strokeWidth="0.5"
                />
              );
            })}

            {/* Floating data packets travelling along edges */}
            {EDGES.slice(0, 6).map(([a, b], i) => {
              const na = NODES[a], nb = NODES[b];
              const mx = (na.cx + nb.cx) / 2, my = (na.cy + nb.cy) / 2;
              return (
                <circle key={`p${i}`} cx={mx} cy={my} r="2.5"
                  fill="#22D3EE" className="vp-data"
                  style={{ animationDelay: `${i * 0.4}s` }}/>
              );
            })}

            {/* Node circles */}
            {NODES.map(n => (
              <g key={`n${n.id}`} className="vp-float"
                style={{ animationDelay: `${n.id * 0.3}s` }}>
                {/* Ping ring on larger nodes */}
                {n.r >= 5 && (
                  <>
                    <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color} opacity="0"
                      className="vp-ring1" style={{ animationDelay: `${n.id * 0.5}s` }}/>
                    <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color} opacity="0"
                      className="vp-ring2" style={{ animationDelay: `${n.id * 0.5 + 1}s` }}/>
                  </>
                )}
                {/* Node body */}
                <circle cx={n.cx} cy={n.cy} r={n.r + 4}
                  fill={n.color} fillOpacity="0.06"
                  stroke={n.color} strokeOpacity="0.2" strokeWidth="0.5"/>
                <circle cx={n.cx} cy={n.cy} r={n.r}
                  fill={n.color} fillOpacity="0.85"
                  className={n.r >= 5 ? "vp-pulse" : ""}
                  style={{ animationDelay: `${n.id * 0.4}s` }}/>
                {/* Node label */}
                {n.label && (
                  <text x={n.cx} y={n.cy - n.r - 6}
                    fill={n.color} fillOpacity="0.6"
                    fontSize="9" fontFamily="Syne" fontWeight="600" textAnchor="middle">
                    {n.label}
                  </text>
                )}
              </g>
            ))}

            {/* Center node triple rings */}
            <circle cx="400" cy="200" r="22" stroke="#22D3EE" strokeOpacity="0.25" strokeWidth="0.8" fill="none"/>
            <circle cx="400" cy="200" r="38" stroke="#22D3EE" strokeOpacity="0.12" strokeWidth="0.6"
              strokeDasharray="6 4" fill="none" className="vp-rotate"/>
            <circle cx="400" cy="200" r="55" stroke="#818CF8" strokeOpacity="0.08" strokeWidth="0.5"
              strokeDasharray="3 8" fill="none" className="vp-rotateCCW"/>

            {/* Corner accent marks */}
            {[[20,20],[780,20],[20,400],[780,400]].map(([x,y],i)=>(
              <g key={`c${i}`} opacity="0.25">
                <line x1={x} y1={y} x2={x+(i%2===0?14:-14)} y2={y} stroke="#22D3EE" strokeWidth="1"/>
                <line x1={x} y1={y} x2={x} y2={y+(i<2?14:-14)} stroke="#22D3EE" strokeWidth="1"/>
              </g>
            ))}
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
            <div className="w-20 h-px mx-auto mt-6"
              style={{ background: "linear-gradient(90deg, transparent, #22D3EE60, transparent)" }} />
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
