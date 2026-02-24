import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

// ── Background network ───────────────────────────────────
const BG_NODES = [
  { x: 80,  y: 120, r: 2.5, c: "#22D3EE" },
  { x: 220, y: 60,  r: 2,   c: "#818CF8" },
  { x: 360, y: 140, r: 2,   c: "#34D399" },
  { x: 60,  y: 280, r: 2,   c: "#818CF8" },
  { x: 300, y: 320, r: 2.5, c: "#22D3EE" },
  { x: 160, y: 200, r: 3.5, c: "#22D3EE", glow: true },
];
const BG_EDGES = [[0,5],[1,5],[2,5],[3,5],[4,5],[0,1],[1,2],[3,4]];

// ── Chat messages data ───────────────────────────────────
const MESSAGES = [
  { from: "bot",  text: "こんにちは！NEXORAのAIアシスタントです。\nどのようなお手伝いができますか？", delay: 0 },
  { from: "user", text: "業務を自動化してコスト削減したい", delay: 1 },
  { from: "bot",  text: "承知しました！ChatGPT・n8n・Difyを組み合わせて、貴社の業務フローを自動化します。", delay: 2 },
  { from: "bot",  visual: "workflow", delay: 3 },
  { from: "user", text: "SNS広告のROASも改善したい", delay: 4 },
  { from: "bot",  text: "Meta広告 × AIクリエイティブ最適化でROASを最大化します。", delay: 5 },
  { from: "bot",  visual: "roas", delay: 6 },
  { from: "user", text: "LINE公式も構築したいです", delay: 7 },
  { from: "bot",  text: "フルファネルを設計して、3ヶ月で友だち8,000人を獲得しましょう！", delay: 8 },
  { from: "bot",  visual: "line", delay: 9 },
];

// ── Mini SVG visuals ─────────────────────────────────────
const WorkflowVisual = ({ c = "#22D3EE" }) => (
  <svg viewBox="0 0 220 60" fill="none" className="w-full" style={{ height: 60 }}>
    <style>{`
      @keyframes cb-flow { 0%{stroke-dashoffset:40;opacity:0} 30%{opacity:.7} 100%{stroke-dashoffset:0;opacity:.3} }
      @keyframes cb-node { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.2)} }
      .cb-flow { stroke-dasharray:12 28; animation: cb-flow 2s ease-in-out infinite; }
      .cb-node { animation: cb-node 2.5s ease-in-out infinite; }
    `}</style>
    {/* Connector lines */}
    {[[38,30,72,30],[108,30,142,30],[178,30,212,30]].map(([x1,y1,x2,y2],i)=>(
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={c} strokeOpacity=".5" strokeWidth="1.2"
        className="cb-flow" style={{animationDelay:`${i*0.3}s`}}/>
    ))}
    {/* Node boxes */}
    {[
      {x:2,  label:"入力",  sub:"メール",  accent:true},
      {x:72, label:"Claude",sub:"AI分析",  accent:false},
      {x:142,label:"n8n",   sub:"自動化",  accent:false},
      {x:212,label:"完了",  sub:"通知",    accent:false},
    ].map(({x,label,sub,accent},i)=>(
      <g key={label}>
        <rect x={x} y={14} width="36" height="32" rx="6"
          fill={accent?`${c}25`:`${c}0D`} stroke={c}
          strokeOpacity={accent?.55:.2} strokeWidth="1"/>
        <text x={x+18} y={28} fill={accent?c:"#F8FAFC"} fillOpacity={accent?.95:.7}
          fontSize="8.5" fontFamily="Syne" fontWeight="700" textAnchor="middle" className="cb-node"
          style={{animationDelay:`${i*0.2}s`}}>{label}</text>
        <text x={x+18} y={39} fill={c} fillOpacity=".4"
          fontSize="7" fontFamily="Syne" textAnchor="middle">{sub}</text>
      </g>
    ))}
    {/* Metric */}
    <text x="110" y="57" fill={c} fillOpacity=".7" fontSize="9" fontFamily="Syne" textAnchor="middle">
      業務時間 42% 削減
    </text>
  </svg>
);

const RoasVisual = ({ c = "#818CF8" }) => (
  <svg viewBox="0 0 220 70" fill="none" className="w-full" style={{ height: 70 }}>
    <style>{`
      @keyframes cb-bar-y { from{transform:scaleY(0)} to{transform:scaleY(1)} }
      .cb-bar { transform-origin:bottom; animation: cb-bar-y 1s cubic-bezier(.16,1,.3,1) both; }
    `}</style>
    {/* Grid lines */}
    {[15,30,45].map(y=>(
      <line key={y} x1="0" y1={y} x2="220" y2={y} stroke={c} strokeOpacity=".06" strokeWidth=".5"/>
    ))}
    {/* Bars */}
    {[
      {x:12,h:18,label:"1Q",v:"2.1"},{x:46,h:28,label:"2Q",v:"3.4"},
      {x:80,h:40,label:"3Q",v:"5.1"},{x:114,h:52,label:"4Q",v:"6.8"},
      {x:148,h:62,label:"5Q",v:"8.4"},{x:182,h:62,label:"目標",v:"8.4×"},
    ].map((b,i)=>(
      <g key={b.label}>
        <rect x={b.x} y={60-b.h} width="24" height={b.h} rx="3"
          fill={c} fillOpacity={0.25+i*0.12} className="cb-bar"
          style={{animationDelay:`${i*0.07}s`}}/>
        <text x={b.x+12} y={60-b.h-4} fill="#F8FAFC" fillOpacity=".75"
          fontSize="8.5" fontFamily="Syne" fontWeight="700" textAnchor="middle">{b.v}</text>
        <text x={b.x+12} y={67} fill={c} fillOpacity=".45"
          fontSize="7" fontFamily="Syne" textAnchor="middle">{b.label}</text>
      </g>
    ))}
    {/* Trend line */}
    <polyline points="24,42 58,32 92,20 126,8 160,0 194,0"
      stroke={c} strokeWidth="1.5" strokeDasharray="3 3" opacity=".5" strokeLinecap="round"/>
  </svg>
);

const LineVisual = ({ c = "#34D399" }) => (
  <svg viewBox="0 0 220 70" fill="none" className="w-full" style={{ height: 70 }}>
    <style>{`
      @keyframes cb-ring { 0%{r:8;opacity:.7} 100%{r:42;opacity:0} }
      .cb-ring1 { animation: cb-ring 2.2s ease-out infinite; }
      .cb-ring2 { animation: cb-ring 2.2s ease-out .7s infinite; }
      .cb-ring3 { animation: cb-ring 2.2s ease-out 1.4s infinite; }
    `}</style>
    {/* Rings */}
    <circle cx="55" cy="36" r="8" fill={c} opacity="0" className="cb-ring1"/>
    <circle cx="55" cy="36" r="8" fill={c} opacity="0" className="cb-ring2"/>
    <circle cx="55" cy="36" r="8" fill={c} opacity="0" className="cb-ring3"/>
    <circle cx="55" cy="36" r="18" stroke={c} strokeOpacity=".12" strokeWidth=".8" fill="none"/>
    <circle cx="55" cy="36" r="30" stroke={c} strokeOpacity=".07" strokeWidth=".8" fill="none"/>
    {/* Center */}
    <circle cx="55" cy="36" r="9" fill={c} fillOpacity=".2" stroke={c} strokeOpacity=".6" strokeWidth="1"/>
    <text x="55" y="40" fill={c} fontSize="9" fontFamily="Syne" fontWeight="700" textAnchor="middle">LINE</text>
    {/* Stats on right */}
    {[
      {label:"友だち獲得",val:"+8,000",sub:"3ヶ月"},
      {label:"開封率",val:"68%",sub:"業界平均の2.1倍"},
      {label:"リピート率",val:"+34%",sub:"前月比"},
    ].map((s,i)=>(
      <g key={s.label}>
        <text x="100" y={14+i*20} fill={c} fillOpacity=".45" fontSize="7.5" fontFamily="Syne">{s.label}</text>
        <text x="100" y={24+i*20} fill={c} fillOpacity=".9" fontSize="12" fontFamily="Syne" fontWeight="700">{s.val}</text>
        <text x="145" y={24+i*20} fill="#F8FAFC" fillOpacity=".4" fontSize="8" fontFamily="Syne">{s.sub}</text>
      </g>
    ))}
  </svg>
);

// ── Typing indicator ─────────────────────────────────────
const TypingDots = () => (
  <div className="cb-typing-wrap">
    {[0,1,2].map(i=>(
      <span key={i} className="cb-dot" style={{ animationDelay: `${i*0.18}s` }} />
    ))}
  </div>
);

// ── Single chat message ──────────────────────────────────
const ChatMessage = ({ msg, index }) => {
  const isUser = msg.from === "user";
  const color = index <= 3 ? "#22D3EE" : index <= 6 ? "#818CF8" : "#34D399";

  return (
    <div
      className={`cb-message flex ${isUser ? "justify-end" : "justify-start"} mb-3`}
      style={{ opacity: 0 }}
      data-index={index}
    >
      {!isUser && (
        <div className="cb-avatar mr-2" style={{ borderColor: `${color}40`, background: `${color}15` }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M2 17L12 22L22 17" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M2 12L12 17L22 12" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </div>
      )}

      <div
        className={`cb-bubble ${isUser ? "cb-bubble-user" : "cb-bubble-bot"}`}
        style={isUser ? {
          background: `linear-gradient(135deg, ${color}25, ${color}12)`,
          borderColor: `${color}40`,
        } : {
          borderColor: `${color}25`,
          boxShadow: `0 0 20px ${color}08`,
        }}
      >
        {msg.text && (
          <p className="cb-text">{msg.text}</p>
        )}
        {msg.visual === "workflow" && <WorkflowVisual c="#22D3EE" />}
        {msg.visual === "roas"     && <RoasVisual c="#818CF8" />}
        {msg.visual === "line"     && <LineVisual c="#34D399" />}
      </div>
    </div>
  );
};

// ── CSS Keyframes ────────────────────────────────────────
const chatbotStyles = `
  @keyframes cb-msg-in { from{opacity:0;transform:translateY(24px) scale(.97);filter:blur(4px)} to{opacity:1;transform:none;filter:none} }
  @keyframes cb-dot-bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
  @keyframes cb-cursor-blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes cb-bg-float { 0%,100%{transform:translate(0,0)} 50%{transform:translate(4px,-10px)} }
  @keyframes cb-bg-flow { 0%{stroke-dashoffset:30;opacity:0} 30%{opacity:.5} 100%{stroke-dashoffset:0;opacity:.15} }
  @keyframes cb-glow-pulse { 0%,100%{opacity:.04} 50%{opacity:.1} }
  @keyframes cb-orbit { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes cb-scan { 0%{opacity:0;transform:translateY(0)} 15%{opacity:.12} 85%{opacity:.12} 100%{opacity:0;transform:translateY(600px)} }
  @keyframes cb-header-glow { 0%,100%{opacity:.6;box-shadow:0 0 8px #22D3EE50} 50%{opacity:1;box-shadow:0 0 18px #22D3EE90} }
  @keyframes cb-shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }

  .cb-bg-float { animation: cb-bg-float 8s ease-in-out infinite; }
  .cb-bg-flow  { stroke-dasharray:10 20; animation: cb-bg-flow 2.5s ease-in-out infinite; }
  .cb-glow     { animation: cb-glow-pulse 5s ease-in-out infinite; }
  .cb-orbit    { transform-origin:50% 50%; animation: cb-orbit 22s linear infinite; }
  .cb-scan     { animation: cb-scan 6s ease-in-out infinite; }

  .cb-typing-wrap { display:flex; align-items:center; gap:5px; padding:2px 0; }
  .cb-dot {
    width:7px; height:7px; border-radius:50%; background:#22D3EE; opacity:.7;
    animation: cb-dot-bounce .9s ease-in-out infinite;
  }

  .cb-avatar {
    width:30px; height:30px; border-radius:50%; border:1px solid;
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
    align-self:flex-end; margin-bottom:2px;
  }
  .cb-bubble {
    max-width:75%; border:1px solid; border-radius:16px;
    padding:10px 14px; position:relative; overflow:hidden;
  }
  .cb-bubble::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(135deg, rgba(255,255,255,.02), transparent);
    pointer-events:none;
  }
  .cb-bubble-user { border-radius:16px 4px 16px 16px; }
  .cb-bubble-bot  { border-radius:4px 16px 16px 16px; background:#0F1923; }
  .cb-text {
    font-family:"Noto Sans JP",sans-serif; font-size:13px; line-height:1.7;
    color:rgba(248,250,252,.85); white-space:pre-line; margin:0;
  }

  .cb-header-dot { animation: cb-header-glow 2.5s ease-in-out infinite; }

  .cb-window {
    border:1px solid rgba(34,211,238,.2);
    background:linear-gradient(180deg,#0A1018,#060A0E);
    border-radius:20px;
    box-shadow:0 0 60px rgba(34,211,238,.06), 0 0 120px rgba(129,140,248,.04);
    position:relative; overflow:hidden;
  }
  .cb-window::before {
    content:''; position:absolute; top:0; left:0; right:0; height:1px;
    background:linear-gradient(90deg,transparent,rgba(34,211,238,.4),transparent);
  }

  /* Shimmer on window */
  .cb-shimmer {
    position:absolute; inset:0; pointer-events:none;
    background:linear-gradient(105deg,transparent 40%,rgba(34,211,238,.04) 50%,transparent 60%);
    animation: cb-shimmer 4s linear infinite;
  }

  .cb-scroll-hint {
    animation: cb-dot-bounce 1.5s ease-in-out infinite;
    font-family:"Syne",sans-serif; font-size:11px; letter-spacing:.3em;
    color:rgba(34,211,238,.5); text-transform:uppercase;
  }
`;

// ── Main Component ───────────────────────────────────────
const ChatbotSection = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useGSAP(() => {
    const msgs = gsap.utils.toArray(".cb-message");
    const totalMessages = msgs.length;
    const scrollLength = isMobile ? totalMessages * 280 : totalMessages * 320;

    const pinTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".chatbot-section",
        start: "top top",
        end: `+=${scrollLength}`,
        scrub: 1.5,
        pin: true,
      },
    });

    // Animate each message in sequence
    msgs.forEach((el, i) => {
      pinTl.to(el, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.6,
        ease: "power2.out",
      }, i * 0.9);
    });

    // Scroll the chat window to follow messages
    const chatScroll = document.querySelector(".cb-messages-inner");
    if (chatScroll) {
      pinTl.to(chatScroll, {
        y: () => -(chatScroll.scrollHeight - chatScroll.parentElement.clientHeight + 40),
        ease: "none",
        duration: totalMessages * 0.9,
      }, 0);
    }

    // Left text parallax
    gsap.to(".cb-left-content", {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".chatbot-section",
        start: "top top",
        end: `+=${scrollLength}`,
        scrub: true,
      },
    });
  }, [isMobile]);

  return (
    <section id="chatbot" className="chatbot-section bg-bg-primary overflow-hidden relative">
      <style>{chatbotStyles}</style>

      {/* ── Deep background ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ambient glows */}
        <div className="absolute inset-0"
          style={{background:"linear-gradient(135deg,#060A0E 0%,#0A1220 40%,#06101E 70%,#060A0E 100%)"}}/>
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] rounded-full cb-glow"
          style={{background:"radial-gradient(ellipse,rgba(34,211,238,.07),transparent 70%)"}}/>
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vh] rounded-full cb-glow"
          style={{background:"radial-gradient(ellipse,rgba(129,140,248,.05),transparent 70%)",animationDelay:"2.5s"}}/>

        {/* Dot grid */}
        <div className="absolute inset-0"
          style={{backgroundImage:"radial-gradient(rgba(34,211,238,.06) 1px,transparent 1px)",backgroundSize:"36px 36px"}}/>

        {/* Animated scan line */}
        <div className="cb-scan absolute left-0 w-full h-px"
          style={{background:"linear-gradient(90deg,transparent,rgba(34,211,238,.18),transparent)"}}/>

        {/* Background SVG network */}
        <svg className="absolute left-0 top-0 w-2/5 h-full opacity-40" viewBox="0 0 400 600" fill="none"
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
              <circle cx={n.x} cy={n.y} r={n.r+6} fill={n.c} fillOpacity=".05"
                stroke={n.c} strokeOpacity=".12" strokeWidth=".5"/>
              <circle cx={n.x} cy={n.y} r={n.r} fill={n.c} opacity={n.glow?.9:.6}
                style={n.glow?{filter:`drop-shadow(0 0 5px ${n.c})`}:{}}/>
            </g>
          ))}
          {/* Orbiting ring */}
          <g className="cb-orbit" style={{transformOrigin:"160px 200px"}}>
            <ellipse cx="160" cy="200" rx="90" ry="50" stroke="#22D3EE"
              strokeOpacity=".08" strokeWidth=".5" strokeDasharray="4 8" fill="none"/>
            <circle cx="160" cy="150" r="3" fill="#22D3EE" opacity=".5"/>
          </g>
        </svg>

        {/* Corner brackets */}
        {[[20,20,1,1],[20,580,-1,1]].map(([x,y,sx,sy],i)=>(
          <svg key={i} className="absolute" style={{left:x-10,top:y-10,width:50,height:50}}
            viewBox="0 0 50 50" fill="none" opacity=".3">
            <line x1="10" y1="10" x2="30" y2="10" stroke="#22D3EE" strokeWidth="1.5"/>
            <line x1="10" y1="10" x2="10" y2="30" stroke="#22D3EE" strokeWidth="1.5"/>
          </svg>
        ))}
      </div>

      {/* ── Main layout ── */}
      <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-16 px-6 md:px-12 lg:px-20 py-16">

        {/* Left: Section title */}
        <div className="cb-left-content lg:w-2/5 flex-none">
          <p className="font-display text-gold/50 text-xs tracking-[0.5em] uppercase mb-4">
            AI Experience
          </p>
          <h2 className="font-display font-[800] text-white text-3xl md:text-4xl lg:text-5xl tracking-tighter leading-[1.1] mb-6">
            AIが、リアルタイムで<br />
            <span className="text-gradient-gold">課題を解決する</span>
          </h2>
          <p className="font-body text-white/45 text-sm md:text-base leading-[1.9] max-w-sm">
            スクロールしながら体験してください。<br />
            NEXORAのAIアシスタントが業務自動化・広告最適化・LINE構築を提案します。
          </p>

          {/* Scroll hint */}
          <div className="flex items-center gap-3 mt-10">
            <div className="flex flex-col items-center gap-1.5">
              <span className="cb-scroll-hint">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-gold/40 to-transparent"/>
            </div>
          </div>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {["ChatGPT連携","n8n自動化","Meta広告","LINE構築","Dify"].map(tag=>(
              <span key={tag}
                className="font-display text-[9px] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                style={{border:"1px solid rgba(34,211,238,.2)",background:"rgba(34,211,238,.05)",color:"rgba(34,211,238,.7)"}}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right: Chat window */}
        <div className="lg:w-3/5 w-full max-w-lg lg:max-w-none flex-none">
          <div className="cb-window w-full" style={{ height: isMobile ? "65vh" : "70vh", maxHeight: 600 }}>

            {/* Shimmer overlay */}
            <div className="cb-shimmer"/>

            {/* Header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b"
              style={{borderColor:"rgba(34,211,238,.12)"}}>
              <div className="cb-header-dot w-2.5 h-2.5 rounded-full"
                style={{background:"#22D3EE"}}/>
              <div>
                <p className="font-display font-[700] text-white text-sm tracking-tight">
                  NEXORA AI Assistant
                </p>
                <p className="font-body text-white/30 text-[10px]">オンライン・応答中</p>
              </div>
              <div className="ml-auto flex gap-1.5">
                {["#22D3EE","#818CF8","#34D399"].map((c,i)=>(
                  <div key={i} className="w-2 h-2 rounded-full"
                    style={{background:c,opacity:.5}}/>
                ))}
              </div>
            </div>

            {/* Messages area */}
            <div className="overflow-hidden" style={{ height: "calc(100% - 64px)" }}>
              <div className="cb-messages-inner px-4 pt-4 pb-6"
                style={{ willChange: "transform" }}>
                {MESSAGES.map((msg, i) => (
                  <ChatMessage key={i} msg={msg} index={i} />
                ))}
                {/* Typing indicator (last bot) */}
                <div className="cb-message flex justify-start mb-3" style={{ opacity: 0 }} data-index={MESSAGES.length}>
                  <div className="cb-avatar mr-2" style={{borderColor:"rgba(34,211,238,.3)",background:"rgba(34,211,238,.1)"}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#22D3EE" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="cb-bubble cb-bubble-bot" style={{borderColor:"rgba(34,211,238,.2)"}}>
                    <TypingDots />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="flex-1 h-px" style={{background:"rgba(34,211,238,.1)"}}>
              <div className="cb-progress-bar h-full"
                style={{background:"linear-gradient(90deg,#22D3EE,#818CF8)",width:"0%",transition:"width 0.3s"}}/>
            </div>
            <span className="font-display text-[9px] tracking-[0.3em] text-white/20 uppercase">
              AI Chat
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatbotSection;
