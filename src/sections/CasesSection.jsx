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
      <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {/* Node connector lines */}
        <line x1="30" y1="28" x2="75" y2="42" stroke={c} strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 3" className="cv-flow" />
        <line x1="75" y1="42" x2="125" y2="28" stroke={c} strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 3" className="cv-flow" style={{animationDelay:".4s"}} />
        <line x1="125" y1="28" x2="170" y2="42" stroke={c} strokeOpacity=".2" strokeWidth="1" strokeDasharray="3 3" className="cv-flow" style={{animationDelay:".8s"}} />
        {/* Nodes */}
        {[[30,28,"Input"],[75,42,"Claude"],[125,28,"n8n"],[170,42,"Slack"]].map(([x,y,label],i)=>(
          <g key={label} className="cv-fade" style={{animationDelay:`${i*.15}s`}}>
            <rect x={x-17} y={y-12} width="34" height="24" rx="6"
              fill={label==="Claude"?`${c}22`:`${c}0D`} stroke={c} strokeOpacity={label==="Claude"?.5:.2} strokeWidth="1"/>
            <text x={x} y={y+4} fill={c} fillOpacity={label==="Claude"?.9:.6}
              fontSize="10" fontFamily="Syne" fontWeight="700" textAnchor="middle">{label}</text>
          </g>
        ))}
        {/* Scan line */}
        <line x1="0" y1="0" x2="200" y2="0" stroke={c} strokeOpacity=".35" strokeWidth="1.5" className="cv-scan"/>
        {/* Terminal at bottom */}
        <rect x="6" y="62" width="188" height="32" rx="5" fill={`${c}08`} stroke={c} strokeOpacity=".18" strokeWidth=".8"/>
        <text x="12" y="74" fill={c} fillOpacity=".5" fontSize="9" fontFamily="Syne">$ Trigger → Claude → Slack ✓</text>
        {/* Big metric */}
        <text x="12" y="92" fill={c} fillOpacity=".9" fontSize="18" fontFamily="Syne" fontWeight="700">42%</text>
        <text x="52" y="92" fill={c} fillOpacity=".45" fontSize="9" fontFamily="Syne">業務時間削減</text>
        <text x="155" y="74" fill={c} fillOpacity=".3" fontSize="8" fontFamily="Syne" className="cv-blink">█</text>
      </svg>
    ),

    // ── Social Ads: 縦棒グラフ（ROAS成長） ──
    "Social Ads": (
      <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {/* Grid */}
        {[20,40,60,75].map(y=>(
          <line key={y} x1="10" y1={y} x2="195" y2={y} stroke={c} strokeOpacity=".06" strokeWidth=".5"/>
        ))}
        {/* Vertical bars */}
        {[
          {x:12,h:22,label:"1月",op:.28},{x:46,h:33,label:"2月",op:.4},
          {x:80,h:45,label:"3月",op:.52},{x:114,h:55,label:"4月",op:.64},
          {x:148,h:63,label:"5月",op:.78},{x:182,h:72,label:"6月",op:.95},
        ].map((b,i)=>(
          <g key={b.label} className="cv-fade" style={{animationDelay:`${i*.08}s`}}>
            <rect x={b.x} y={78-b.h} width="24" height={b.h} rx="3"
              fill={c} fillOpacity={b.op} className="cv-bar-y" style={{animationDelay:`${i*.06}s`}}/>
            {/* Label above bar with bg for contrast */}
            <rect x={b.x+1} y={78-b.h-14} width="22" height="13" rx="2" fill="#060A0E" fillOpacity=".65"/>
            <text x={b.x+12} y={78-b.h-4} fill="#F8FAFC" fillOpacity=".9" fontSize="9" fontFamily="Syne" fontWeight="700" textAnchor="middle">{b.label}</text>
          </g>
        ))}
        {/* Big ROAS metric — top-left badge, clear of bars */}
        <rect x="6" y="4" width="82" height="30" rx="6" fill="#060A0E" fillOpacity=".7"/>
        <text x="14" y="23" fill={c} fillOpacity="1" fontSize="24" fontFamily="Syne" fontWeight="700">×8.4</text>
        <text x="52" y="23" fill="#F8FAFC" fillOpacity=".6" fontSize="10" fontFamily="Syne">ROAS</text>
        <text x="52" y="32" fill="#F8FAFC" fillOpacity=".4" fontSize="9" fontFamily="Syne">達成</text>
        {/* Trend overlay line */}
        <polyline points="24,56 58,45 92,34 126,22 160,14 194,6"
          stroke={c} strokeWidth="1.5" strokeDasharray="3 3" opacity=".5" strokeLinecap="round" className="cv-draw"/>
      </svg>
    ),

    // ── LINE: 拡散リング（友だち増加） ──
    "LINE": (
      <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {/* Expanding wave rings from center-left */}
        <circle cx="65" cy="52" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:"0s"}}/>
        <circle cx="65" cy="52" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:".7s"}}/>
        <circle cx="65" cy="52" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:"1.4s"}}/>
        {/* Static rings */}
        <circle cx="65" cy="52" r="18" stroke={c} strokeOpacity=".12" strokeWidth="1" fill="none"/>
        <circle cx="65" cy="52" r="30" stroke={c} strokeOpacity=".08" strokeWidth="1" fill="none"/>
        <circle cx="65" cy="52" r="42" stroke={c} strokeOpacity=".05" strokeWidth="1" fill="none"/>
        {/* Center */}
        <circle cx="65" cy="52" r="10" fill={c} fillOpacity=".18" stroke={c} strokeOpacity=".5" strokeWidth="1"/>
        <text x="65" y="57" fill={c} fontSize="10" fontFamily="Syne" fontWeight="700" textAnchor="middle" opacity=".9">LINE</text>
        {/* Orbit user dots */}
        {[0,60,120,180,240,300].map((deg,i)=>{
          const rad=(deg-90)*Math.PI/180;
          return (
            <g key={i} className="cv-fade" style={{animationDelay:`${.1+i*.1}s`}}>
              <circle cx={65+30*Math.cos(rad)} cy={52+30*Math.sin(rad)} r="4.5"
                fill={c} fillOpacity=".15" stroke={c} strokeOpacity=".4" strokeWidth="1"/>
              <circle cx={65+30*Math.cos(rad)} cy={52+30*Math.sin(rad)} r="2" fill={c} opacity=".8"/>
            </g>
          );
        })}
        {/* Big count — right-aligned to prevent overflow */}
        <text x="196" y="44" fill={c} fillOpacity=".95" fontSize="22" fontFamily="Syne" fontWeight="700" textAnchor="end">+8,000</text>
        <text x="196" y="58" fill={c} fillOpacity=".55" fontSize="11" fontFamily="Syne" textAnchor="end">友だち獲得</text>
        <text x="196" y="71" fill={c} fillOpacity=".35" fontSize="9" fontFamily="Syne" textAnchor="end">3ヶ月で達成</text>
      </svg>
    ),

    // ── Funnel: 台形ファネル ──
    "Funnel": (
      <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {[
          {tw:180,bw:148,y:2,op:.18,label:"クリック",n:"12,400"},
          {tw:148,bw:116,y:19,op:.28,label:"LP閲覧",n:"9,800"},
          {tw:116,bw:84,y:36,op:.40,label:"LINE登録",n:"4,200"},
          {tw:84,bw:52,y:53,op:.55,label:"商談",n:"980"},
          {tw:52,bw:28,y:70,op:.80,label:"成約",n:"312"},
        ].map((s,i)=>{
          const tx=(200-s.tw)/2, bx=(200-s.bw)/2;
          return (
            <g key={i} className="cv-fade" style={{animationDelay:`${i*.1}s`}}>
              <polygon points={`${tx},${s.y} ${tx+s.tw},${s.y} ${bx+s.bw},${s.y+17} ${bx},${s.y+17}`}
                fill={c} fillOpacity={s.op} stroke={c} strokeOpacity=".12" strokeWidth=".5"/>
              <text x="8" y={s.y+13} fill="#F8FAFC" fillOpacity=".7" fontSize="9" fontFamily="Syne">{s.label}</text>
              <text x="192" y={s.y+13} fill="#F8FAFC" fillOpacity=".95" fontSize="9.5" fontFamily="Syne" fontWeight="700" textAnchor="end">{s.n}</text>
            </g>
          );
        })}
        {/* Big CVR badge */}
        <text x="100" y="96" fill={c} fillOpacity=".95" fontSize="18" fontFamily="Syne" fontWeight="700" textAnchor="middle">CVR ×3.2</text>
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
                return <text key={label} x={cx+(r+13)*Math.cos(a)} y={cy+(r+13)*Math.sin(a)+3}
                  fill={c} fillOpacity=".45" fontSize="8" fontFamily="Syne" textAnchor="middle">{label}</text>;
              })}
              {/* After dots */}
              {after.map((v,i)=>{
                const a=(i/5)*2*Math.PI-Math.PI/2;
                return <circle key={i} cx={cx+r*v*Math.cos(a)} cy={cy+r*v*Math.sin(a)} r="3"
                  fill={c} opacity=".85" className="cv-fade" style={{animationDelay:`${.3+i*.07}s`}}/>;
              })}
              {/* Score bars on right */}
              {[
                {label:"ChatGPT",v:91},{label:"プロンプト",v:87},{label:"自動化",v:83},
              ].map((s,i)=>(
                <g key={s.label} className="cv-fade" style={{animationDelay:`${.2+i*.1}s`}}>
                  <text x="128" y={14+i*22} fill={c} fillOpacity=".5" fontSize="8.5" fontFamily="Syne">{s.label}</text>
                  <rect x="128" y={18+i*22} width="62" height="6" rx="3" fill={c} fillOpacity=".08"/>
                  <rect x="128" y={18+i*22} width={62*s.v/100} height="6" rx="3" fill={c} fillOpacity=".75"
                    className="cv-bar-x" style={{animationDelay:`${.3+i*.1}s`}}/>
                  <text x="193" y={23+i*22} fill={c} fillOpacity=".85" fontSize="9" fontFamily="Syne" fontWeight="700" textAnchor="end">{s.v}pt</text>
                </g>
              ))}
            </>
          );
        })()}
      </svg>
    ),

    // ── Automation: ワークフローパイプライン ──
    "Automation": (
      <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {/* Pipeline rows */}
        {[
          {y:22,nodes:["メール受信","分類AI","Notion登録","完了"],speeds:["0s",".2s",".4s",".6s"]},
          {y:50,nodes:["在庫検知","n8n","Slack通知","完了"],speeds:[".1s",".3s",".5s",".7s"]},
        ].map((row,ri)=>(
          <g key={ri}>
            {row.nodes.map((n,i,arr)=>{
              const x=10+i*47;
              return (
                <g key={n} className="cv-fade" style={{animationDelay:row.speeds[i]}}>
                  <rect x={x} y={row.y-10} width="40" height="20" rx="5"
                    fill={i===1?`${c}1A`:`${c}0C`} stroke={c} strokeOpacity={i===1?.45:.2} strokeWidth="1"/>
                  <text x={x+20} y={row.y+4} fill="#F8FAFC" fillOpacity={i===1?.95:.65}
                    fontSize="8.5" fontFamily="Syne" fontWeight={i===1?"700":"400"} textAnchor="middle">{n}</text>
                  {i<arr.length-1&&(
                    <line x1={x+40} y1={row.y} x2={x+47} y2={row.y}
                      stroke={c} strokeOpacity=".3" strokeWidth="1" strokeDasharray="3 2" className="cv-flow"
                      style={{animationDelay:`${.2+i*.2}s`}}/>
                  )}
                </g>
              );
            })}
          </g>
        ))}
        {/* Big 200h metric */}
        <text x="100" y="82" fill={c} fillOpacity=".95" fontSize="22" fontFamily="Syne" fontWeight="700" textAnchor="middle">200h</text>
        <text x="100" y="96" fill={c} fillOpacity=".45" fontSize="10" fontFamily="Syne" textAnchor="middle">月間自動化削減</text>
        {/* Scanning line */}
        <line x1="0" y1="0" x2="200" y2="0" stroke={c} strokeOpacity=".25" strokeWidth="1" className="cv-scan"/>
      </svg>
    ),

    // ── Promotion: 同心円ブロードキャスト ──
    "Promotion": (
      <svg viewBox="0 0 200 100" fill="none" className="w-full h-full">
        <style>{caseAnimStyles}</style>
        {/* Broadcast rings */}
        <circle cx="48" cy="50" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:"0s"}}/>
        <circle cx="48" cy="50" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:".8s"}}/>
        <circle cx="48" cy="50" r="4" fill={c} opacity="0" className="cv-wave" style={{animationDelay:"1.6s"}}/>
        <circle cx="48" cy="50" r="15" stroke={c} strokeOpacity=".12" strokeWidth="1" fill="none"/>
        <circle cx="48" cy="50" r="28" stroke={c} strokeOpacity=".08" strokeWidth="1" fill="none"/>
        <circle cx="48" cy="50" r="42" stroke={c} strokeOpacity=".04" strokeWidth="1" fill="none"/>
        {/* Center icon */}
        <circle cx="48" cy="50" r="9" fill={c} fillOpacity=".2" stroke={c} strokeOpacity=".5" strokeWidth="1"/>
        <text x="48" y="55" fill={c} fontSize="10" fontFamily="Syne" fontWeight="700" textAnchor="middle" opacity=".9">▲</text>
        {/* Channel bars on right */}
        {[
          {label:"インフルエンサー",v:.86,reach:"2.4M"},
          {label:"SNS広告",v:.65,reach:"1.8M"},
          {label:"オーガニック",v:.38,reach:"680K"},
          {label:"LP経由",v:.18,reach:"124K"},
        ].map((ch,i)=>(
          <g key={ch.label} className="cv-fade" style={{animationDelay:`${i*.1}s`}}>
            <text x="98" y={12+i*22} fill={c} fillOpacity=".45" fontSize="8" fontFamily="Syne">{ch.label}</text>
            <rect x="98" y={16+i*22} width="72" height="5.5" rx="2.5" fill={c} fillOpacity=".08"/>
            <rect x="98" y={16+i*22} width={72*ch.v} height="5.5" rx="2.5" fill={c} fillOpacity=".68"
              className="cv-bar-x" style={{animationDelay:`${.1+i*.1}s`}}/>
            <text x="173" y={21+i*22} fill={c} fillOpacity=".85" fontSize="10" fontFamily="Syne" fontWeight="700" textAnchor="end">{ch.reach}</text>
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
