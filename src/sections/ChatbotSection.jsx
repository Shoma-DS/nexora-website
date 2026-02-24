import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

// ── Background network data ───────────────────────────
const BG_NODES = [
  { x: 80,  y: 120, r: 2.5, c: "#22D3EE" },
  { x: 220, y: 60,  r: 2,   c: "#818CF8" },
  { x: 360, y: 140, r: 2,   c: "#34D399" },
  { x: 60,  y: 280, r: 2,   c: "#818CF8" },
  { x: 300, y: 320, r: 2.5, c: "#22D3EE" },
  { x: 160, y: 200, r: 3.5, c: "#22D3EE", glow: true },
];
const BG_EDGES = [[0,5],[1,5],[2,5],[3,5],[4,5],[0,1],[1,2],[3,4]];

// ── Chat messages ────────────────────────────────────
const MESSAGES = [
  { from: "bot",  text: "こんにちは！NEXORAのAIアシスタントです。\nどのようなお手伝いができますか？" },
  { from: "user", text: "業務を自動化してコスト削減したい" },
  { from: "bot",  text: "承知しました！ChatGPT・n8n・Difyを組み合わせて、\n貴社の業務フローを自動化します。" },
  { from: "bot",  visual: "workflow" },
  { from: "user", text: "SNS広告のROASも改善したい" },
  { from: "bot",  text: "Meta広告 × AIクリエイティブ最適化で\nROASを最大化します。" },
  { from: "bot",  visual: "roas" },
  { from: "user", text: "LINE公式も構築したいです" },
  { from: "bot",  text: "フルファネルを設計して、\n3ヶ月で友だち8,000人を獲得しましょう！" },
  { from: "bot",  visual: "line" },
];

// ── Mini SVG Visuals ─────────────────────────────────
const WorkflowVisual = ({ c = "#22D3EE" }) => (
  <svg viewBox="0 0 210 56" fill="none" className="w-full" style={{ height: 56 }}>
    <style>{`
      @keyframes wf-flow { 0%{stroke-dashoffset:40;opacity:0} 30%{opacity:.7} 100%{stroke-dashoffset:0;opacity:.3} }
      @keyframes wf-nd   { 0%,100%{opacity:.6} 50%{opacity:1} }
      .wf-flow { stroke-dasharray:12 28; animation: wf-flow 2s ease-in-out infinite; }
      .wf-nd   { animation: wf-nd 2.5s ease-in-out infinite; }
    `}</style>
    {[[36,28,70,28],[106,28,140,28],[176,28,210,28]].map(([x1,y1,x2,y2],i)=>(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={c} strokeOpacity=".5" strokeWidth="1.2"
        className="wf-flow" style={{animationDelay:`${i*0.3}s`}}/>
    ))}
    {[{x:0,l:"入力",s:"メール",a:true},{x:70,l:"Claude",s:"AI分析"},{x:140,l:"n8n",s:"自動化"},{x:176,l:"完了",s:"通知"}].map(({x,l,s,a},i)=>(
      <g key={l}>
        <rect x={x} y={12} width="36" height="28" rx="6"
          fill={a?`${c}22`:`${c}0D`} stroke={c} strokeOpacity={a?.5:.2} strokeWidth="1"/>
        <text x={x+18} y={24} fill={a?c:"#F8FAFC"} fillOpacity={a?.95:.7}
          fontSize="8" fontFamily="Syne" fontWeight="700" textAnchor="middle" className="wf-nd"
          style={{animationDelay:`${i*0.2}s`}}>{l}</text>
        <text x={x+18} y={34} fill={c} fillOpacity=".4"
          fontSize="7" fontFamily="Syne" textAnchor="middle">{s}</text>
      </g>
    ))}
    <text x="105" y="52" fill={c} fillOpacity=".6" fontSize="9" fontFamily="Syne" textAnchor="middle">業務時間 42% 削減</text>
  </svg>
);

const RoasVisual = ({ c = "#818CF8" }) => (
  <svg viewBox="0 0 210 64" fill="none" className="w-full" style={{ height: 64 }}>
    <style>{`
      @keyframes rb-y { from{transform:scaleY(0)} to{transform:scaleY(1)} }
      .rb-y { transform-origin:bottom; animation: rb-y 1s cubic-bezier(.16,1,.3,1) both; }
    `}</style>
    {[14,28,42].map(y=>(<line key={y} x1="0" y1={y} x2="210" y2={y} stroke={c} strokeOpacity=".06" strokeWidth=".5"/>))}
    {[{x:10,h:16,l:"1Q",v:"2.1"},{x:44,h:26,l:"2Q",v:"3.4"},{x:78,h:38,l:"3Q",v:"5.1"},
      {x:112,h:48,l:"4Q",v:"6.8"},{x:146,h:54,l:"目標",v:"8.4×"},{x:180,h:54,l:"ROAS",v:"達成"}].map((b,i)=>(
      <g key={b.l}>
        <rect x={b.x} y={55-b.h} width="22" height={b.h} rx="3"
          fill={c} fillOpacity={0.25+i*0.12} className="rb-y" style={{animationDelay:`${i*0.07}s`}}/>
        <text x={b.x+11} y={55-b.h-3} fill="#F8FAFC" fillOpacity=".75"
          fontSize="8" fontFamily="Syne" fontWeight="700" textAnchor="middle">{b.v}</text>
        <text x={b.x+11} y={62} fill={c} fillOpacity=".45" fontSize="7" fontFamily="Syne" textAnchor="middle">{b.l}</text>
      </g>
    ))}
    <polyline points="21,39 55,29 89,17 123,7 157,1 191,1"
      stroke={c} strokeWidth="1.5" strokeDasharray="3 3" opacity=".5" strokeLinecap="round"/>
  </svg>
);

const LineVisual = ({ c = "#34D399" }) => (
  <svg viewBox="0 0 210 66" fill="none" className="w-full" style={{ height: 66 }}>
    <style>{`
      @keyframes lr { 0%{r:8;opacity:.7} 100%{r:38;opacity:0} }
      .lr1{animation:lr 2.2s ease-out infinite}
      .lr2{animation:lr 2.2s ease-out .7s infinite}
      .lr3{animation:lr 2.2s ease-out 1.4s infinite}
    `}</style>
    <circle cx="50" cy="34" r="8" fill={c} opacity="0" className="lr1"/>
    <circle cx="50" cy="34" r="8" fill={c} opacity="0" className="lr2"/>
    <circle cx="50" cy="34" r="8" fill={c} opacity="0" className="lr3"/>
    <circle cx="50" cy="34" r="16" stroke={c} strokeOpacity=".12" strokeWidth=".8" fill="none"/>
    <circle cx="50" cy="34" r="28" stroke={c} strokeOpacity=".07" strokeWidth=".8" fill="none"/>
    <circle cx="50" cy="34" r="8" fill={c} fillOpacity=".2" stroke={c} strokeOpacity=".6" strokeWidth="1"/>
    <text x="50" y="38" fill={c} fontSize="8.5" fontFamily="Syne" fontWeight="700" textAnchor="middle">LINE</text>
    {[{l:"友だち獲得",v:"+8,000",s:"3ヶ月"},{l:"開封率",v:"68%",s:"業界2.1倍"},{l:"リピート率",v:"+34%",s:"前月比"}].map((s,i)=>(
      <g key={s.l}>
        <text x="92" y={12+i*19} fill={c} fillOpacity=".45" fontSize="7" fontFamily="Syne">{s.l}</text>
        <text x="92" y={22+i*19} fill={c} fillOpacity=".9" fontSize="11" fontFamily="Syne" fontWeight="700">{s.v}</text>
        <text x="136" y={22+i*19} fill="#F8FAFC" fillOpacity=".4" fontSize="8" fontFamily="Syne">{s.s}</text>
      </g>
    ))}
  </svg>
);

// ── Typing indicator ─────────────────────────────────
const TypingDots = () => (
  <div style={{display:"flex",alignItems:"center",gap:5,padding:"2px 0"}}>
    {[0,1,2].map(i=>(
      <span key={i} style={{
        width:7,height:7,borderRadius:"50%",background:"#22D3EE",opacity:.7,display:"block",
        animation:"cb-dot-bounce .9s ease-in-out infinite",animationDelay:`${i*0.18}s`,
      }}/>
    ))}
  </div>
);

// ── Single message bubble ────────────────────────────
const ChatMessage = ({ msg, index, msgRef }) => {
  const isUser = msg.from === "user";
  const color = index <= 3 ? "#22D3EE" : index <= 6 ? "#818CF8" : "#34D399";
  return (
    <div ref={msgRef}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
      style={{ opacity: 0, transform: "translateY(16px)" }}
    >
      {!isUser && (
        <div style={{
          width:28,height:28,borderRadius:"50%",border:`1px solid ${color}40`,
          background:`${color}15`,display:"flex",alignItems:"center",justifyContent:"center",
          flexShrink:0,alignSelf:"flex-end",marginBottom:2,marginRight:8,
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="2" strokeLinecap="round"/>
            <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      )}
      <div style={{
        maxWidth:"78%",border:"1px solid",borderRadius:isUser?"14px 4px 14px 14px":"4px 14px 14px 14px",
        padding:msg.visual?"10px 12px":"10px 14px",position:"relative",overflow:"hidden",
        background: isUser
          ? `linear-gradient(135deg,${color}22,${color}10)`
          : "#0F1923",
        borderColor: isUser ? `${color}40` : `${color}25`,
        boxShadow: isUser ? "none" : `0 0 16px ${color}08`,
      }}>
        {msg.text && (
          <p style={{
            fontFamily:"'Noto Sans JP',sans-serif",fontSize:13,lineHeight:1.7,
            color:"rgba(248,250,252,.85)",whiteSpace:"pre-line",margin:0,
          }}>{msg.text}</p>
        )}
        {msg.visual === "workflow" && <WorkflowVisual c="#22D3EE"/>}
        {msg.visual === "roas"     && <RoasVisual c="#818CF8"/>}
        {msg.visual === "line"     && <LineVisual c="#34D399"/>}
      </div>
    </div>
  );
};

// ── Section CSS ──────────────────────────────────────
const chatbotStyles = `
  @keyframes cb-dot-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
  @keyframes cb-bg-float { 0%,100%{transform:translate(0,0)} 50%{transform:translate(4px,-10px)} }
  @keyframes cb-bg-flow  { 0%{stroke-dashoffset:30;opacity:0} 30%{opacity:.5} 100%{stroke-dashoffset:0;opacity:.15} }
  @keyframes cb-glow-p   { 0%,100%{opacity:.04} 50%{opacity:.1} }
  @keyframes cb-orbit    { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes cb-scan     { 0%{opacity:0;transform:translateY(0)} 15%{opacity:.12} 85%{opacity:.12} 100%{opacity:0;transform:translateY(700px)} }
  @keyframes cb-hglow    { 0%,100%{box-shadow:0 0 8px #22D3EE50} 50%{box-shadow:0 0 20px #22D3EE90} }
  @keyframes cb-shimmer  { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }

  .cb-bg-float { animation: cb-bg-float 8s ease-in-out infinite; }
  .cb-bg-flow  { stroke-dasharray:10 20; animation: cb-bg-flow 2.5s ease-in-out infinite; }
  .cb-glow-p   { animation: cb-glow-p 5s ease-in-out infinite; }
  .cb-orbit    { animation: cb-orbit 22s linear infinite; transform-box:fill-box; transform-origin:center; }
  .cb-scan     { animation: cb-scan 6s ease-in-out infinite; }
  .cb-hglow    { animation: cb-hglow 2.5s ease-in-out infinite; }

  .cb-window-shimmer {
    position:absolute;inset:0;pointer-events:none;
    background:linear-gradient(105deg,transparent 40%,rgba(34,211,238,.04) 50%,transparent 60%);
    animation:cb-shimmer 4s linear infinite;
  }
`;

// ── Main Component ───────────────────────────────────
const ChatbotSection = () => {
  const chatScrollRef = useRef(null);
  const msgRefs = useRef([]);

  useGSAP(() => {
    const isMobileView = window.innerWidth < 768;
    const msgs = msgRefs.current.filter(Boolean);

    // Initialize: hide all messages
    gsap.set(msgs, { opacity: 0, y: 16 });

    if (isMobileView) {
      // ── Mobile: auto-play on viewport enter (no pin) ──
      ScrollTrigger.create({
        trigger: ".cb-section",
        start: "top 75%",
        once: true,
        onEnter: () => {
          msgs.forEach((el, i) => {
            gsap.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.45,
              delay: i * 0.55,
              ease: "power2.out",
              onComplete: () => {
                // Auto-scroll chat window to latest message
                if (chatScrollRef.current) {
                  chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
                }
              },
            });
          });
        },
      });
    } else {
      // ── Desktop: pin + scrub ──
      const scrollLength = msgs.length * 310;

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cb-section",
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: 1.5,
          pin: true,
        },
      });

      msgs.forEach((el, i) => {
        pinTl.to(el, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, i * 0.85);
      });

      // Scroll the messages area
      const inner = document.querySelector(".cb-msgs-inner");
      if (inner && inner.parentElement) {
        pinTl.to(inner, {
          y: () => {
            const overflow = inner.scrollHeight - inner.parentElement.clientHeight;
            return overflow > 0 ? -overflow - 20 : 0;
          },
          ease: "none",
          duration: msgs.length * 0.85,
        }, 0);
      }

      // Left content parallax
      gsap.to(".cb-left-content", {
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".cb-section",
          start: "top top",
          end: `+=${scrollLength}`,
          scrub: true,
        },
      });
    }
  });

  return (
    <section id="chatbot" className="cb-section bg-bg-primary overflow-hidden relative">
      <style>{chatbotStyles}</style>

      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{background:"linear-gradient(135deg,#060A0E 0%,#0A1220 40%,#06101E 70%,#060A0E 100%)"}}/>
        <div className="absolute top-1/3 left-1/4 w-[50vw] h-[50vh] rounded-full cb-glow-p"
          style={{background:"radial-gradient(ellipse,rgba(34,211,238,.07),transparent 70%)"}}/>
        <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vh] rounded-full cb-glow-p"
          style={{background:"radial-gradient(ellipse,rgba(129,140,248,.05),transparent 70%)",animationDelay:"2.5s"}}/>
        <div className="absolute inset-0"
          style={{backgroundImage:"radial-gradient(rgba(34,211,238,.055) 1px,transparent 1px)",backgroundSize:"36px 36px"}}/>
        <div className="cb-scan absolute left-0 w-full h-px"
          style={{background:"linear-gradient(90deg,transparent,rgba(34,211,238,.18),transparent)"}}/>

        {/* BG network SVG */}
        <svg className="absolute left-0 top-0 w-1/3 h-full opacity-35" viewBox="0 0 400 600" fill="none"
          preserveAspectRatio="xMidYMid slice">
          {BG_EDGES.map(([a,b],i)=>(
            <g key={i}>
              <line x1={BG_NODES[a].x} y1={BG_NODES[a].y} x2={BG_NODES[b].x} y2={BG_NODES[b].y}
                stroke="#22D3EE" strokeOpacity=".07" strokeWidth=".6"/>
              <line x1={BG_NODES[a].x} y1={BG_NODES[a].y} x2={BG_NODES[b].x} y2={BG_NODES[b].y}
                stroke="#22D3EE" strokeOpacity=".3" strokeWidth=".8"
                className="cb-bg-flow" style={{animationDelay:`${i*0.3}s`}}/>
            </g>
          ))}
          {BG_NODES.map((n,i)=>(
            <g key={i} className="cb-bg-float" style={{animationDelay:`${i*0.7}s`}}>
              <circle cx={n.x} cy={n.y} r={n.r+6} fill={n.c} fillOpacity=".04"
                stroke={n.c} strokeOpacity=".12" strokeWidth=".5"/>
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} opacity={n.glow?.9:.6}
                style={n.glow?{filter:`drop-shadow(0 0 5px ${n.c})`}:{}}/>
            </g>
          ))}
          <g className="cb-orbit" style={{transformOrigin:"160px 200px"}}>
            <ellipse cx="160" cy="200" rx="90" ry="50" stroke="#22D3EE"
              strokeOpacity=".07" strokeWidth=".5" strokeDasharray="4 8" fill="none"/>
            <circle cx="160" cy="150" r="2.5" fill="#22D3EE" opacity=".45"/>
          </g>
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-14 px-4 md:px-10 lg:px-16 py-10 lg:py-0">

        {/* Left: Title */}
        <div className="cb-left-content lg:w-2/5 flex-none w-full">
          <p className="font-display text-gold/50 text-[10px] md:text-xs tracking-[0.5em] uppercase mb-2 md:mb-4">
            AI Experience
          </p>
          <h2 className="font-display font-[800] text-white text-2xl md:text-3xl lg:text-[2.8rem] tracking-tighter leading-[1.15] mb-2 md:mb-4">
            AIが、リアルタイムで<br/>
            <span className="text-gradient-gold">課題を解決する</span>
          </h2>
          <p className="hidden md:block font-body text-white/40 text-sm leading-[1.85] max-w-xs">
            スクロールしながら体験してください。<br/>
            NEXORAのAIアシスタントが業務自動化・<br/>
            広告最適化・LINE構築を提案します。
          </p>

          {/* Tags — desktop only */}
          <div className="hidden lg:flex flex-wrap gap-2 mt-6">
            {["ChatGPT","n8n","Meta広告","LINE","Dify"].map(tag=>(
              <span key={tag}
                className="font-display text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                style={{border:"1px solid rgba(34,211,238,.2)",background:"rgba(34,211,238,.05)",color:"rgba(34,211,238,.7)"}}>
                {tag}
              </span>
            ))}
          </div>

          {/* Scroll hint — desktop only */}
          <div className="hidden lg:flex items-center gap-2 mt-8">
            <span className="font-display text-[9px] tracking-[0.35em] text-white/25 uppercase">Scroll</span>
            <div className="w-6 h-px bg-gradient-to-r from-gold/40 to-transparent"/>
          </div>
        </div>

        {/* Right: Chat window */}
        <div className="lg:w-3/5 w-full flex-none min-w-0">
          {/* Window chrome */}
          <div style={{
            border:"1px solid rgba(34,211,238,.18)",
            background:"linear-gradient(180deg,#0A1018,#060A0E)",
            borderRadius:18,
            boxShadow:"0 0 50px rgba(34,211,238,.06),0 0 100px rgba(129,140,248,.03)",
            position:"relative",overflow:"hidden",
            height: "min(62vh, 540px)",
          }}>
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{background:"linear-gradient(90deg,transparent,rgba(34,211,238,.4),transparent)"}}/>
            {/* Shimmer */}
            <div className="cb-window-shimmer"/>

            {/* Header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b"
              style={{borderColor:"rgba(34,211,238,.1)"}}>
              <div className="cb-hglow w-2 h-2 rounded-full flex-shrink-0"
                style={{background:"#22D3EE",borderRadius:"50%"}}/>
              <div className="min-w-0">
                <p className="font-display font-[700] text-white text-xs md:text-sm tracking-tight truncate">
                  NEXORA AI Assistant
                </p>
                <p className="font-body text-white/30 text-[9px]">オンライン・応答中</p>
              </div>
              <div className="ml-auto flex gap-1.5 flex-shrink-0">
                {["#22D3EE","#818CF8","#34D399"].map((c,i)=>(
                  <div key={i} className="w-2 h-2 rounded-full" style={{background:c,opacity:.45}}/>
                ))}
              </div>
            </div>

            {/* Messages scroll area */}
            <div
              ref={chatScrollRef}
              style={{
                height:"calc(100% - 56px)",
                overflowY:"auto",
                scrollbarWidth:"none",
                msOverflowStyle:"none",
              }}
            >
              <style>{`.cb-msgs-inner::-webkit-scrollbar{display:none}`}</style>
              <div className="cb-msgs-inner px-3 md:px-4 pt-3 pb-4">
                {MESSAGES.map((msg, i) => (
                  <ChatMessage
                    key={i}
                    msg={msg}
                    index={i}
                    msgRef={el => { msgRefs.current[i] = el; }}
                  />
                ))}
                {/* Typing indicator */}
                <div
                  ref={el => { msgRefs.current[MESSAGES.length] = el; }}
                  className="flex justify-start mb-3"
                  style={{ opacity: 0, transform: "translateY(16px)" }}
                >
                  <div style={{
                    width:28,height:28,borderRadius:"50%",border:"1px solid rgba(34,211,238,.3)",
                    background:"rgba(34,211,238,.1)",display:"flex",alignItems:"center",
                    justifyContent:"center",flexShrink:0,alignSelf:"flex-end",marginBottom:2,marginRight:8,
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div style={{
                    border:"1px solid rgba(34,211,238,.2)",borderRadius:"4px 14px 14px 14px",
                    padding:"10px 14px",background:"#0F1923",
                  }}>
                    <TypingDots/>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress track */}
          <div className="mt-3 flex items-center gap-3 px-1">
            <div className="flex-1 h-px" style={{background:"rgba(34,211,238,.08)"}}>
              <div className="h-full"
                style={{
                  background:"linear-gradient(90deg,#22D3EE,#818CF8)",
                  width:"0%",
                  transition:"width .3s ease",
                }}/>
            </div>
            <span className="font-display text-[9px] tracking-[0.3em] text-white/18 uppercase flex-shrink-0">
              AI Chat
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
