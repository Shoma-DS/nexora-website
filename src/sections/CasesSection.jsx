import { caseStudies } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const caseAnimStyles = `
  @keyframes cv-draw { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
  @keyframes cv-draw-long { from { stroke-dashoffset: 700; } to { stroke-dashoffset: 0; } }
  @keyframes cv-bar-y { from { transform: scaleY(0); } to { transform: scaleY(1); } }
  @keyframes cv-bar-x { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes cv-fade { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
  @keyframes cv-pulse { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.5);opacity:1} }
  @keyframes cv-wave { 0%{r:4;opacity:.8} 100%{r:30;opacity:0} }
  @keyframes cv-spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes cv-flow { 0%{stroke-dashoffset:30;opacity:0} 20%{opacity:.7} 100%{stroke-dashoffset:0;opacity:.3} }
  @keyframes cv-blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes cv-scan { 0%{opacity:0;transform:translateY(0)} 20%{opacity:.6} 80%{opacity:.6} 100%{opacity:0;transform:translateY(80px)} }
  @keyframes cv-ping { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(2.5);opacity:0} }

  .cv-draw { stroke-dasharray:400; animation: cv-draw 1.6s ease-out forwards; }
  .cv-draw-l { stroke-dasharray:700; animation: cv-draw-long 2s ease-out forwards; }
  .cv-bar-y { transform-origin:bottom; animation: cv-bar-y 1s cubic-bezier(.16,1,.3,1) both; }
  .cv-bar-x { transform-origin:left; animation: cv-bar-x 1s cubic-bezier(.16,1,.3,1) both; }
  .cv-fade { animation: cv-fade .6s ease-out both; }
  .cv-pulse { animation: cv-pulse 2s ease-in-out infinite; }
  .cv-wave { animation: cv-wave 2s ease-out infinite; }
  .cv-spin { transform-origin:center; animation: cv-spin 10s linear infinite; }
  .cv-flow { stroke-dasharray:20 10; animation: cv-flow 2.2s ease-in-out infinite; }
  .cv-blink { animation: cv-blink 1.1s step-end infinite; }
  .cv-scan { animation: cv-scan 3.5s ease-in-out infinite; }
  .cv-ping { animation: cv-ping 2s ease-out infinite; }
`;

// Abstract data visualizations per sector — each with unique animation style
const SectorVisual = ({ sector, color = "#22D3EE" }) => {
  const c = color;
  const visuals = {

    // ── AI Bot: ターミナル + ノードグラフ ──
    "AI Bot": (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {/* Node connector lines */}
        <line x1="30" y1="28" x2="75" y2="45" stroke={c} strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 3" className="cv-flow" />
        <line x1="75" y1="45" x2="125" y2="30" stroke={c} strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 3" className="cv-flow" style={{animationDelay:".4s"}} />
        <line x1="125" y1="30" x2="170" y2="50" stroke={c} strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 3" className="cv-flow" style={{animationDelay:".8s"}} />
        {/* Nodes */}
        {[[30,28,"Input"],[75,45,"Claude"],[125,30,"n8n"],[170,50,"Slack"]].map(([x,y,label],i)=>(
          <g key={label} className="cv-fade" style={{animationDelay:`${i*.15}s`}}>
            <rect x={x-15} y={y-11} width="30" height="22" rx="5"
              fill={label==="Claude"?`${c}22`:`${c}0D`} stroke={c} strokeOpacity={label==="Claude"?.5:.2} strokeWidth="1"/>
            <text x={x} y={y+4} fill={c} fillOpacity={label==="Claude"?.9:.55}
              fontSize="7.5" fontFamily="Syne" fontWeight="700" textAnchor="middle">{label}</text>
          </g>
        ))}
        {/* Scan line */}
        <line x1="0" y1="0" x2="200" y2="0" stroke={c} strokeOpacity=".35" strokeWidth="1.5" className="cv-scan"/>
        {/* Terminal at bottom */}
        <rect x="8" y="63" width="184" height="22" rx="4" fill={`${c}08`} stroke={c} strokeOpacity=".15" strokeWidth=".5"/>
        <text x="14" y="76" fill={c} fillOpacity=".4" fontSize="7" fontFamily="Syne">$ AI response: 42% 業務削減達成 ✓</text>
        <text x="14" y="80" fill={c} fillOpacity=".25" fontSize="6" fontFamily="Syne" className="cv-blink">█</text>
      </svg>
    ),

    // ── Social Ads: 縦棒グラフ（ROAS成長） ──
    "Social Ads": (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {/* Grid */}
        {[20,40,60,80].map(y=>(
          <line key={y} x1="20" y1={y} x2="195" y2={y} stroke={c} strokeOpacity=".06" strokeWidth=".5"/>
        ))}
        {/* Vertical bars */}
        {[
          {x:30,h:30,label:"1月",op:.35},{x:58,h:42,label:"2月",op:.45},
          {x:86,h:52,label:"3月",op:.55},{x:114,h:63,label:"4月",op:.65},
          {x:142,h:72,label:"5月",op:.78},{x:170,h:80,label:"6月",op:.95},
        ].map((b,i)=>(
          <g key={b.label} className="cv-fade" style={{animationDelay:`${i*.08}s`}}>
            <rect x={b.x} y={85-b.h} width="22" height={b.h} rx="3"
              fill={c} fillOpacity={b.op} className="cv-bar-y" style={{animationDelay:`${i*.06}s`}}/>
            <text x={b.x+11} y="89" fill={c} fillOpacity=".35" fontSize="6" fontFamily="Syne" textAnchor="middle">{b.label}</text>
          </g>
        ))}
        {/* ROAS label at top */}
        <text x="185" y="10" fill={c} fillOpacity=".8" fontSize="9" fontFamily="Syne" fontWeight="700" textAnchor="end">×8.4 ROAS</text>
        {/* Trend overlay line */}
        <polyline points="41,55 69,43 97,33 125,22 153,13 181,5"
          stroke={c} strokeWidth="1.5" strokeDasharray="3 3" opacity=".5" strokeLinecap="round" className="cv-draw"/>
      </svg>
    ),

    // ── LINE: 拡散リング（友だち増加） ──
    "LINE": (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {/* Expanding wave rings from center */}
        <circle cx="100" cy="45" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:"0s"}}/>
        <circle cx="100" cy="45" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:".7s"}}/>
        <circle cx="100" cy="45" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:"1.4s"}}/>
        {/* Static rings */}
        <circle cx="100" cy="45" r="18" stroke={c} strokeOpacity=".12" strokeWidth="1" fill="none"/>
        <circle cx="100" cy="45" r="30" stroke={c} strokeOpacity=".08" strokeWidth="1" fill="none"/>
        <circle cx="100" cy="45" r="42" stroke={c} strokeOpacity=".05" strokeWidth="1" fill="none"/>
        {/* Center */}
        <circle cx="100" cy="45" r="8" fill={c} fillOpacity=".18" stroke={c} strokeOpacity=".5" strokeWidth="1"/>
        <text x="100" y="49" fill={c} fontSize="8" fontFamily="Syne" fontWeight="700" textAnchor="middle" opacity=".9">LINE</text>
        {/* Orbit user dots */}
        {[0,60,120,180,240,300].map((deg,i)=>{
          const rad=(deg-90)*Math.PI/180;
          return (
            <g key={i} className="cv-fade" style={{animationDelay:`${.1+i*.1}s`}}>
              <circle cx={100+30*Math.cos(rad)} cy={45+30*Math.sin(rad)} r="4"
                fill={c} fillOpacity=".15" stroke={c} strokeOpacity=".4" strokeWidth="1"/>
              <circle cx={100+30*Math.cos(rad)} cy={45+30*Math.sin(rad)} r="1.5" fill={c} opacity=".8"/>
            </g>
          );
        })}
        {/* Count badge */}
        <text x="152" y="16" fill={c} fillOpacity=".8" fontSize="10" fontFamily="Syne" fontWeight="700">+8,000</text>
        <text x="152" y="26" fill={c} fillOpacity=".4" fontSize="7" fontFamily="Syne">友だち獲得</text>
      </svg>
    ),

    // ── Funnel: 台形ファネル ──
    "Funnel": (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {[
          {tw:180,bw:145,y:4,op:.18,label:"クリック",n:"12,400"},
          {tw:145,bw:110,y:20,op:.28,label:"LP閲覧",n:"9,800"},
          {tw:110,bw:78,y:36,op:.40,label:"LINE登録",n:"4,200"},
          {tw:78,bw:50,y:52,op:.55,label:"商談",n:"980"},
          {tw:50,bw:30,y:68,op:.80,label:"成約",n:"312"},
        ].map((s,i)=>{
          const tx=(200-s.tw)/2, bx=(200-s.bw)/2;
          return (
            <g key={i} className="cv-fade" style={{animationDelay:`${i*.1}s`}}>
              <polygon points={`${tx},${s.y} ${tx+s.tw},${s.y} ${bx+s.bw},${s.y+16} ${bx},${s.y+16}`}
                fill={c} fillOpacity={s.op} stroke={c} strokeOpacity=".12" strokeWidth=".5"/>
              <text x="28" y={s.y+12} fill={c} fillOpacity=".5" fontSize="7" fontFamily="Syne">{s.label}</text>
              <text x="172" y={s.y+12} fill={c} fillOpacity=".7" fontSize="7" fontFamily="Syne" textAnchor="end">{s.n}</text>
            </g>
          );
        })}
        {/* CVR badge */}
        <text x="186" y="87" fill={c} fillOpacity=".8" fontSize="9" fontFamily="Syne" fontWeight="700" textAnchor="end">CVR ×3.2</text>
      </svg>
    ),

    // ── AI Training: レーダーチャート ──
    "AI Training": (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {(()=>{
          const cx=72,cy=48,r=36;
          const axes=["ChatGPT","プロンプト","自動化","倫理","Claude"];
          const before=[.22,.18,.15,.30,.20];
          const after=[.91,.87,.83,.94,.89];
          const pts=(vals)=>vals.map((v,i)=>{
            const a=(i/5)*2*Math.PI-Math.PI/2;
            return `${cx+r*v*Math.cos(a)},${cy+r*v*Math.sin(a)}`;
          }).join(" ");
          return (
            <>
              {/* Grid */}
              {[.25,.5,.75,1].map(p=>(
                <polygon key={p} points={pts(axes.map(()=>p))}
                  stroke={c} strokeOpacity=".08" strokeWidth=".5" fill="none"/>
              ))}
              {/* Axes */}
              {axes.map((_,i)=>{
                const a=(i/5)*2*Math.PI-Math.PI/2;
                return <line key={i} x1={cx} y1={cy} x2={cx+r*Math.cos(a)} y2={cy+r*Math.sin(a)} stroke={c} strokeOpacity=".1" strokeWidth=".5"/>;
              })}
              {/* Before */}
              <polygon points={pts(before)} fill={`${c}10`} stroke={c} strokeOpacity=".2" strokeWidth=".8"/>
              {/* After */}
              <polygon points={pts(after)} fill={`${c}25`} stroke={c} strokeOpacity=".8" strokeWidth="1.5" className="cv-fade"/>
              {/* Axis labels */}
              {axes.map((label,i)=>{
                const a=(i/5)*2*Math.PI-Math.PI/2;
                return <text key={label} x={cx+(r+12)*Math.cos(a)} y={cy+(r+12)*Math.sin(a)+3}
                  fill={c} fillOpacity=".4" fontSize="6.5" fontFamily="Syne" textAnchor="middle">{label}</text>;
              })}
              {/* After dots */}
              {after.map((v,i)=>{
                const a=(i/5)*2*Math.PI-Math.PI/2;
                return <circle key={i} cx={cx+r*v*Math.cos(a)} cy={cy+r*v*Math.sin(a)} r="2.5"
                  fill={c} opacity=".85" className="cv-fade" style={{animationDelay:`${.3+i*.07}s`}}/>;
              })}
              {/* Score bars on right */}
              {[
                {label:"ChatGPT",v:91},{label:"プロンプト",v:87},{label:"自動化",v:83},
              ].map((s,i)=>(
                <g key={s.label} className="cv-fade" style={{animationDelay:`${.2+i*.1}s`}}>
                  <text x="130" y={18+i*18} fill={c} fillOpacity=".45" fontSize="6.5" fontFamily="Syne">{s.label}</text>
                  <rect x="130" y={22+i*18} width="60" height="5" rx="2.5" fill={c} fillOpacity=".08"/>
                  <rect x="130" y={22+i*18} width={60*s.v/100} height="5" rx="2.5" fill={c} fillOpacity=".7"
                    className="cv-bar-x" style={{animationDelay:`${.3+i*.1}s`}}/>
                  <text x="193" y={26+i*18} fill={c} fillOpacity=".7" fontSize="6.5" fontFamily="Syne" fontWeight="700" textAnchor="end">{s.v}</text>
                </g>
              ))}
            </>
          );
        })()}
      </svg>
    ),

    // ── Automation: ワークフローパイプライン ──
    "Automation": (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {/* Pipeline rows */}
        {[
          {y:20,nodes:["メール受信","分類AI","Notion登録","完了"],speeds:["0s",".2s",".4s",".6s"]},
          {y:50,nodes:["在庫検知","n8n","Slack通知","完了"],speeds:[".1s",".3s",".5s",".7s"]},
        ].map((row,ri)=>(
          <g key={ri}>
            {row.nodes.map((n,i,arr)=>{
              const x=12+i*47;
              return (
                <g key={n} className="cv-fade" style={{animationDelay:row.speeds[i]}}>
                  <rect x={x} y={row.y-9} width="38" height="18" rx="4"
                    fill={i===1?`${c}1A`:`${c}0C`} stroke={c} strokeOpacity={i===1?.4:.18} strokeWidth=".8"/>
                  <text x={x+19} y={row.y+4} fill={c} fillOpacity={i===1?.85:.5}
                    fontSize="6.5" fontFamily="Syne" fontWeight={i===1?"700":"400"} textAnchor="middle">{n}</text>
                  {i<arr.length-1&&(
                    <line x1={x+38} y1={row.y} x2={x+47} y2={row.y}
                      stroke={c} strokeOpacity=".3" strokeWidth="1" strokeDasharray="3 2" className="cv-flow"
                      style={{animationDelay:`${.2+i*.2}s`}}/>
                  )}
                </g>
              );
            })}
          </g>
        ))}
        {/* 200h badge */}
        <rect x="60" y="68" width="80" height="18" rx="5" fill={`${c}12`} stroke={c} strokeOpacity=".25" strokeWidth=".8"/>
        <text x="100" y="80" fill={c} fillOpacity=".9" fontSize="9" fontFamily="Syne" fontWeight="700" textAnchor="middle">200h / 月 削減</text>
        {/* Scanning line */}
        <line x1="0" y1="0" x2="200" y2="0" stroke={c} strokeOpacity=".25" strokeWidth="1" className="cv-scan"/>
      </svg>
    ),

    // ── Promotion: 同心円ブロードキャスト ──
    "Promotion": (
      <svg viewBox="0 0 200 90" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {/* Broadcast rings */}
        <circle cx="55" cy="45" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:"0s"}}/>
        <circle cx="55" cy="45" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:".8s"}}/>
        <circle cx="55" cy="45" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:"1.6s"}}/>
        <circle cx="55" cy="45" r="15" stroke={c} strokeOpacity=".12" strokeWidth="1" fill="none"/>
        <circle cx="55" cy="45" r="26" stroke={c} strokeOpacity=".08" strokeWidth="1" fill="none"/>
        <circle cx="55" cy="45" r="38" stroke={c} strokeOpacity=".04" strokeWidth="1" fill="none"/>
        {/* Center icon */}
        <circle cx="55" cy="45" r="8" fill={c} fillOpacity=".2" stroke={c} strokeOpacity=".5" strokeWidth="1"/>
        <text x="55" y="49" fill={c} fontSize="8" fontFamily="Syne" fontWeight="700" textAnchor="middle" opacity=".9">▲</text>
        {/* Channel bars on right */}
        {[
          {label:"インフルエンサー",v:.86,reach:"2.4M"},
          {label:"SNS広告",v:.65,reach:"1.8M"},
          {label:"オーガニック",v:.38,reach:"680K"},
          {label:"LP経由",v:.18,reach:"124K"},
        ].map((ch,i)=>(
          <g key={ch.label} className="cv-fade" style={{animationDelay:`${i*.1}s`}}>
            <text x="103" y={16+i*19} fill={c} fillOpacity=".4" fontSize="6" fontFamily="Syne">{ch.label}</text>
            <rect x="103" y={20+i*19} width="72" height="4.5" rx="2" fill={c} fillOpacity=".08"/>
            <rect x="103" y={20+i*19} width={72*ch.v} height="4.5" rx="2" fill={c} fillOpacity=".65"
              className="cv-bar-x" style={{animationDelay:`${.1+i*.1}s`}}/>
            <text x="178" y={24+i*19} fill={c} fillOpacity=".7" fontSize="6.5" fontFamily="Syne" fontWeight="700" textAnchor="end">{ch.reach}</text>
          </g>
        ))}
      </svg>
    ),
  };

  return visuals[sector] || visuals["AI Bot"];
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
