import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// ── Messages ─────────────────────────────────────────
const MESSAGES = [
  { from: "bot",  text: "こんにちは！NEXORAのAIアシスタントです。\nどのようなお手伝いができますか？" },
  { from: "user", text: "業務を自動化してコスト削減したい" },
  { from: "bot",  text: "承知しました！ChatGPT・n8n・Difyを組み合わせて、\n貴社の業務フローを自動化します。" },
  { from: "bot",  visual: "workflow" },
  { from: "user", text: "SNS広告のROASも改善したい" },
  { from: "bot",  text: "Meta広告 × AIクリエイティブ最適化でROASを最大化。\n業界平均の3.2倍のCTRを実現します。" },
  { from: "bot",  visual: "roas" },
  { from: "user", text: "LINE公式アカウントも構築できますか？" },
  { from: "bot",  text: "もちろんです！フルファネルを設計して、\n3ヶ月で友だち8,000人を獲得しましょう！" },
  { from: "bot",  visual: "line" },
];

// ── Visuals ───────────────────────────────────────────
const WorkflowVisual = ({ c = "#22D3EE" }) => (
  <svg viewBox="0 0 220 58" fill="none" className="w-full" style={{ height: 58 }}>
    <style>{`
      @keyframes wf-f{0%{stroke-dashoffset:40;opacity:0}30%{opacity:.8}100%{stroke-dashoffset:0;opacity:.35}}
      @keyframes wf-n{0%,100%{opacity:.6}50%{opacity:1}}
      .wf-f{stroke-dasharray:12 28;animation:wf-f 2s ease-in-out infinite}
      .wf-n{animation:wf-n 2.5s ease-in-out infinite}
    `}</style>
    {[[38,29,72,29],[108,29,142,29],[178,29,212,29]].map(([x1,y1,x2,y2],i)=>(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c}
        strokeOpacity=".5" strokeWidth="1.2" className="wf-f" style={{animationDelay:`${i*.3}s`}}/>
    ))}
    {[{x:2,l:"入力",s:"メール",a:1},{x:72,l:"Claude",s:"AI判断",a:0},{x:142,l:"n8n",s:"自動化",a:0},{x:212,l:"完了",s:"通知",a:0}].map(({x,l,s,a},i)=>(
      <g key={l}>
        <rect x={x} y={14} width="36" height="28" rx="6"
          fill={a?`${c}25`:`${c}0E`} stroke={c} strokeOpacity={a?.55:.22} strokeWidth="1"/>
        <text x={x+18} y={26} fill={a?c:"#F8FAFC"} fillOpacity={a?.95:.75}
          fontSize="8" fontFamily="Syne" fontWeight="700" textAnchor="middle"
          className="wf-n" style={{animationDelay:`${i*.2}s`}}>{l}</text>
        <text x={x+18} y={36} fill={c} fillOpacity=".4" fontSize="7" fontFamily="Syne" textAnchor="middle">{s}</text>
      </g>
    ))}
    <text x="110" y="54" fill={c} fillOpacity=".55" fontSize="9" fontFamily="Syne" textAnchor="middle">業務時間 42% 削減達成</text>
  </svg>
);

const RoasVisual = ({ c = "#818CF8" }) => (
  <svg viewBox="0 0 220 66" fill="none" className="w-full" style={{ height: 66 }}>
    <style>{`
      @keyframes rb{from{transform:scaleY(0)}to{transform:scaleY(1)}}
      .rb{transform-origin:bottom;animation:rb 1s cubic-bezier(.16,1,.3,1) both}
    `}</style>
    {[14,30,46].map(y=>(<line key={y} x1="4" y1={y} x2="216" y2={y} stroke={c} strokeOpacity=".07" strokeWidth=".5"/>))}
    {[{x:10,h:16,l:"1Q",v:"2.1"},{x:46,h:27,l:"2Q",v:"3.4"},{x:82,h:39,l:"3Q",v:"5.1"},
      {x:118,h:49,l:"4Q",v:"6.8"},{x:154,h:57,l:"5Q",v:"8.4×"},{x:190,h:57,l:"達成",v:"✓"}].map((b,i)=>(
      <g key={b.l}>
        <rect x={b.x} y={57-b.h} width="24" height={b.h} rx="3"
          fill={c} fillOpacity={0.22+i*.12} className="rb" style={{animationDelay:`${i*.07}s`}}/>
        <text x={b.x+12} y={57-b.h-3} fill="#F8FAFC" fillOpacity=".8"
          fontSize="8.5" fontFamily="Syne" fontWeight="700" textAnchor="middle">{b.v}</text>
        <text x={b.x+12} y={63} fill={c} fillOpacity=".45" fontSize="7" fontFamily="Syne" textAnchor="middle">{b.l}</text>
      </g>
    ))}
    <polyline points="22,41 58,30 94,18 130,8 166,0 202,0"
      stroke={c} strokeWidth="1.5" strokeDasharray="3 3" opacity=".55" strokeLinecap="round"/>
  </svg>
);

const LineVisual = ({ c = "#34D399" }) => (
  <svg viewBox="0 0 220 68" fill="none" className="w-full" style={{ height: 68 }}>
    <style>{`
      @keyframes lr{0%{r:8;opacity:.7}100%{r:40;opacity:0}}
      .lr1{animation:lr 2.2s ease-out infinite}
      .lr2{animation:lr 2.2s ease-out .75s infinite}
      .lr3{animation:lr 2.2s ease-out 1.5s infinite}
    `}</style>
    <circle cx="50" cy="36" r="8" fill={c} opacity="0" className="lr1"/>
    <circle cx="50" cy="36" r="8" fill={c} opacity="0" className="lr2"/>
    <circle cx="50" cy="36" r="8" fill={c} opacity="0" className="lr3"/>
    <circle cx="50" cy="36" r="18" stroke={c} strokeOpacity=".12" strokeWidth=".8" fill="none"/>
    <circle cx="50" cy="36" r="30" stroke={c} strokeOpacity=".07" strokeWidth=".8" fill="none"/>
    <circle cx="50" cy="36" r="9" fill={c} fillOpacity=".2" stroke={c} strokeOpacity=".6" strokeWidth="1"/>
    <text x="50" y="40" fill={c} fontSize="9" fontFamily="Syne" fontWeight="700" textAnchor="middle">LINE</text>
    {[{l:"友だち獲得",v:"+8,000",s:"3ヶ月"},{l:"開封率",v:"68%",s:"業界2.1倍"},{l:"リピート率",v:"+34%",s:"前月比"}].map((s,i)=>(
      <g key={s.l}>
        <text x="92" y={12+i*20} fill={c} fillOpacity=".45" fontSize="7.5" fontFamily="Syne">{s.l}</text>
        <text x="92" y={23+i*20} fill={c} fillOpacity=".9" fontSize="12" fontFamily="Syne" fontWeight="700">{s.v}</text>
        <text x="137" y={23+i*20} fill="#F8FAFC" fillOpacity=".4" fontSize="8" fontFamily="Syne">{s.s}</text>
      </g>
    ))}
  </svg>
);

// ── Typing dots ───────────────────────────────────────
const TypingDots = () => (
  <div style={{display:"flex",gap:5,alignItems:"center",padding:"3px 0"}}>
    {[0,1,2].map(i=>(
      <span key={i} style={{
        width:7,height:7,borderRadius:"50%",background:"#22D3EE",opacity:.7,display:"block",
        animation:"cb-dot .9s ease-in-out infinite",animationDelay:`${i*.18}s`,
      }}/>
    ))}
  </div>
);

// ── Message bubble ────────────────────────────────────
const Bubble = ({ msg, index, refCb }) => {
  const isUser = msg.from === "user";
  const color = index <= 3 ? "#22D3EE" : index <= 6 ? "#818CF8" : "#34D399";

  return (
    <div
      ref={refCb}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3 md:mb-4`}
      style={{ opacity: 0, transform: "translateY(18px)" }}
    >
      {/* Bot avatar */}
      {!isUser && (
        <div style={{
          width: 30, height: 30, borderRadius: "50%",
          border: `1px solid ${color}45`, background: `${color}18`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, alignSelf: "flex-end", marginBottom: 2, marginRight: 8,
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      )}

      {/* Bubble */}
      <div style={{
        maxWidth: "76%",
        border: "1px solid",
        borderRadius: isUser ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
        padding: msg.visual ? "10px 12px" : "10px 15px",
        background: isUser ? `linear-gradient(135deg,${color}26,${color}12)` : "#0D1520",
        borderColor: isUser ? `${color}45` : `${color}28`,
        boxShadow: isUser ? "none" : `0 0 18px ${color}08, inset 0 1px 0 rgba(255,255,255,.03)`,
        position: "relative", overflow: "hidden",
      }}>
        {/* Inner shimmer on bot bubbles */}
        {!isUser && (
          <div style={{
            position:"absolute",top:0,left:0,right:0,height:1,
            background:`linear-gradient(90deg,transparent,${color}20,transparent)`,
          }}/>
        )}
        {msg.text && (
          <p style={{
            fontFamily:"'Noto Sans JP',sans-serif",
            fontSize: 13, lineHeight: 1.75,
            color: "rgba(248,250,252,.88)",
            whiteSpace: "pre-line", margin: 0,
          }}>{msg.text}</p>
        )}
        {msg.visual === "workflow" && <WorkflowVisual c="#22D3EE"/>}
        {msg.visual === "roas"     && <RoasVisual c="#818CF8"/>}
        {msg.visual === "line"     && <LineVisual c="#34D399"/>}
      </div>
    </div>
  );
};

// ── Global keyframes ──────────────────────────────────
const STYLES = `
  @keyframes cb-dot  { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
  @keyframes cb-scan { 0%{opacity:0;transform:translateY(-20px)} 15%{opacity:.1} 85%{opacity:.1} 100%{opacity:0;transform:translateY(105vh)} }
  @keyframes cb-glow { 0%,100%{opacity:.04} 50%{opacity:.1} }
  @keyframes cb-hdot { 0%,100%{box-shadow:0 0 6px #22D3EE60} 50%{box-shadow:0 0 16px #22D3EE,0 0 32px #22D3EE60} }
  @keyframes cb-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
  @keyframes cb-edge { 0%{stroke-dashoffset:40;opacity:0} 30%{opacity:.6} 100%{stroke-dashoffset:0;opacity:.2} }

  .cb-scan-line { animation: cb-scan 7s ease-in-out infinite; }
  .cb-glow-blob { animation: cb-glow 5s ease-in-out infinite; }
  .cb-hdot      { animation: cb-hdot 2.5s ease-in-out infinite; border-radius:50%; }
  .cb-node-f    { animation: cb-float 8s ease-in-out infinite; }
  .cb-edge-flow { stroke-dasharray:10 22; animation: cb-edge 2.5s ease-in-out infinite; }
`;

// ── Main Section ──────────────────────────────────────
const ChatbotSection = () => {
  const msgsInnerRef = useRef(null);
  const msgRefs = useRef([]);

  useGSAP(() => {
    const msgs = msgRefs.current.filter(Boolean);
    if (!msgs.length) return;

    // Set initial hidden state
    gsap.set(msgs, { opacity: 0, y: 18 });

    const scrollPerMsg = window.innerWidth < 768 ? 260 : 320;
    const scrollLength = msgs.length * scrollPerMsg;

    // Pin the full-screen section
    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".cb-fullscreen",
        start: "top top",
        end: `+=${scrollLength}`,
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Reveal each message in sequence
    msgs.forEach((el, i) => {
      pinTl.to(el,
        { opacity: 1, y: 0, duration: 0.55, ease: "power2.out" },
        i * 0.9
      );
    });

    // Scroll the messages area upward to always show latest
    const inner = msgsInnerRef.current;
    if (inner && inner.parentElement) {
      pinTl.to(inner, {
        y: () => {
          const overflow = inner.scrollHeight - inner.parentElement.clientHeight;
          return overflow > 0 ? -(overflow + 16) : 0;
        },
        ease: "none",
        duration: msgs.length * 0.9,
        invalidateOnRefresh: true,
      }, 0);
    }
  });

  return (
    <section id="chatbot" className="cb-fullscreen">
      <style>{STYLES}</style>

      {/* ── Full-screen background (looks like a real chat app) ── */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(160deg, #05080F 0%, #070D1A 35%, #050B14 65%, #05080E 100%)"
      }}>
        {/* Dot grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(rgba(34,211,238,.055) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}/>

        {/* Ambient glow spots */}
        <div className="cb-glow-blob absolute rounded-full" style={{
          top:"20%",left:"15%",width:"35vw",height:"35vh",
          background:"radial-gradient(ellipse,rgba(34,211,238,.07),transparent 70%)",
        }}/>
        <div className="cb-glow-blob absolute rounded-full" style={{
          bottom:"25%",right:"10%",width:"28vw",height:"28vh",
          background:"radial-gradient(ellipse,rgba(129,140,248,.06),transparent 70%)",
          animationDelay:"2.5s",
        }}/>

        {/* Scan line */}
        <div className="cb-scan-line absolute left-0 w-full h-px" style={{
          background:"linear-gradient(90deg,transparent,rgba(34,211,238,.18),transparent)"
        }}/>

        {/* Corner bracket — top left */}
        <svg className="absolute top-5 left-5" width="32" height="32" viewBox="0 0 32 32" fill="none" opacity=".3">
          <line x1="1" y1="1" x2="20" y2="1" stroke="#22D3EE" strokeWidth="1.5"/>
          <line x1="1" y1="1" x2="1" y2="20" stroke="#22D3EE" strokeWidth="1.5"/>
          <circle cx="1" cy="1" r="1.5" fill="#22D3EE"/>
        </svg>
        {/* Corner bracket — bottom right */}
        <svg className="absolute bottom-5 right-5" width="32" height="32" viewBox="0 0 32 32" fill="none" opacity=".3">
          <line x1="31" y1="31" x2="12" y2="31" stroke="#22D3EE" strokeWidth="1.5"/>
          <line x1="31" y1="31" x2="31" y2="12" stroke="#22D3EE" strokeWidth="1.5"/>
          <circle cx="31" cy="31" r="1.5" fill="#22D3EE"/>
        </svg>

        {/* Floating network nodes (subtle, right side) */}
        <svg className="absolute right-0 top-0 h-full pointer-events-none"
          style={{width:"min(280px, 28vw)",opacity:.18}}
          viewBox="0 0 280 800" fill="none" preserveAspectRatio="xMidYMid slice">
          {[
            [240,120,3,"#22D3EE"],[180,220,2.5,"#818CF8"],[220,380,2,"#34D399"],
            [150,480,3,"#22D3EE"],[200,600,2.5,"#F472B6"],[240,700,2,"#22D3EE"],
          ].map(([x,y,r,c],i)=>(
            <g key={i} className="cb-node-f" style={{animationDelay:`${i*.6}s`}}>
              <circle cx={x} cy={y} r={Number(r)+5} fill={c} fillOpacity=".05"/>
              <circle cx={x} cy={y} r={Number(r)} fill={c} opacity=".7"/>
            </g>
          ))}
          {[[0,1],[1,2],[2,3],[3,4],[4,5],[0,2],[1,3]].map(([a,b],i)=>{
            const nodes=[[240,120],[180,220],[220,380],[150,480],[200,600],[240,700]];
            return (
              <line key={i}
                x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]}
                stroke="#22D3EE" strokeOpacity=".08" strokeWidth=".6"/>
            );
          })}
        </svg>
      </div>

      {/* ── Chat UI (full-screen, no frame) ── */}
      <div className="relative z-10 h-full flex flex-col">

        {/* Header — looks like a real chat app status bar */}
        <div className="flex items-center gap-3 px-4 md:px-8 py-3 md:py-4 flex-shrink-0"
          style={{
            borderBottom: "1px solid rgba(34,211,238,.12)",
            background: "rgba(5,8,14,.85)",
            backdropFilter: "blur(20px)",
          }}>
          <div className="cb-hdot w-2.5 h-2.5 flex-shrink-0"
            style={{background:"#22D3EE",width:10,height:10}}/>
          <div className="flex items-center gap-2.5 flex-1 min-w-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{background:"rgba(34,211,238,.12)",border:"1px solid rgba(34,211,238,.25)"}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2 12L12 17L22 12" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="min-w-0">
              <p className="font-display font-[700] text-white text-sm tracking-tight leading-none">NEXORA AI</p>
              <p className="font-body text-[10px] mt-0.5" style={{color:"rgba(34,211,238,.6)"}}>● オンライン</p>
            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="font-display text-[9px] tracking-[0.3em] uppercase hidden sm:block"
              style={{color:"rgba(255,255,255,.2)"}}>scroll</span>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{opacity:.3}}>
              <path d="M8 3V13M8 13L4 9M8 13L12 9" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Section label */}
          <div className="hidden md:flex items-center gap-2 ml-4 flex-shrink-0">
            <span className="font-display text-[9px] tracking-[0.35em] uppercase"
              style={{color:"rgba(34,211,238,.35)"}}>AI Experience</span>
          </div>
        </div>

        {/* Messages area — fills the rest of viewport */}
        <div className="flex-1 overflow-hidden relative"
          style={{minHeight: 0}}>

          {/* Fade gradient top (hides messages scrolling off the top) */}
          <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none" style={{
            height: 60,
            background: "linear-gradient(to bottom, rgba(5,8,14,1) 0%, transparent 100%)",
          }}/>
          {/* Fade gradient bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none" style={{
            height: 80,
            background: "linear-gradient(to top, rgba(5,8,14,1) 0%, transparent 100%)",
          }}/>

          {/* Inner scrollable container (moved by GSAP) */}
          <div ref={msgsInnerRef} className="px-4 md:px-0 pt-4 pb-20"
            style={{willChange:"transform"}}>
            {/* Center messages on desktop */}
            <div className="mx-auto" style={{maxWidth: 580}}>
              {MESSAGES.map((msg, i) => (
                <Bubble
                  key={i}
                  msg={msg}
                  index={i}
                  refCb={el => { msgRefs.current[i] = el; }}
                />
              ))}

              {/* Typing indicator — appears last */}
              <div
                ref={el => { msgRefs.current[MESSAGES.length] = el; }}
                className="flex justify-start mb-4"
                style={{ opacity: 0, transform: "translateY(18px)" }}
              >
                <div style={{
                  width:30,height:30,borderRadius:"50%",border:"1px solid rgba(34,211,238,.35)",
                  background:"rgba(34,211,238,.12)",display:"flex",alignItems:"center",
                  justifyContent:"center",flexShrink:0,alignSelf:"flex-end",marginBottom:2,marginRight:8,
                }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div style={{
                  border:"1px solid rgba(34,211,238,.22)",borderRadius:"4px 16px 16px 16px",
                  padding:"10px 15px",background:"#0D1520",
                }}>
                  <TypingDots/>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input bar (decorative) */}
        <div className="flex-shrink-0 px-4 md:px-8 py-3 flex items-center gap-3"
          style={{
            borderTop: "1px solid rgba(34,211,238,.1)",
            background: "rgba(5,8,14,.9)",
            backdropFilter: "blur(20px)",
          }}>
          <div className="flex-1 rounded-full px-4 py-2.5 font-body text-sm"
            style={{
              background:"rgba(255,255,255,.04)",
              border:"1px solid rgba(34,211,238,.12)",
              color:"rgba(255,255,255,.2)",
              pointerEvents:"none",userSelect:"none",
            }}>
            メッセージを入力…
          </div>
          <div className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center"
            style={{background:"rgba(34,211,238,.15)",border:"1px solid rgba(34,211,238,.3)"}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
