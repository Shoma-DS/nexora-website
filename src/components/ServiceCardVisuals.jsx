// Service-specific data visualizations — each card has a unique SVG animation style

const animStyles = `
  @keyframes draw-line {
    from { stroke-dashoffset: 600; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes draw-short {
    from { stroke-dashoffset: 200; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes draw-circle {
    from { stroke-dashoffset: 160; }
    to   { stroke-dashoffset: 0; }
  }
  @keyframes fade-up {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes pulse-dot {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.5); }
  }
  @keyframes pulse-ring {
    0%   { opacity: 0.6; transform: scale(1); }
    100% { opacity: 0;   transform: scale(2.2); }
  }
  @keyframes bar-grow-x {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes bar-grow-y {
    from { transform: scaleY(0); }
    to   { transform: scaleY(1); }
  }
  @keyframes expand-ring {
    0%   { r: 4; opacity: 0.8; }
    100% { r: 22; opacity: 0; }
  }
  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes scan {
    0%   { opacity: 0; transform: translateY(0); }
    20%  { opacity: 1; }
    80%  { opacity: 1; }
    100% { opacity: 0; transform: translateY(60px); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
  @keyframes node-appear {
    from { opacity: 0; transform: scale(0.5); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes data-flow {
    0%   { stroke-dashoffset: 40; opacity: 0; }
    20%  { opacity: 1; }
    100% { stroke-dashoffset: 0; opacity: 0.6; }
  }
  @keyframes funnel-fill {
    from { transform: scaleY(0); transform-origin: bottom; }
    to   { transform: scaleY(1); transform-origin: bottom; }
  }
  @keyframes count-in {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes wave-expand {
    0%   { opacity: 0.9; r: 6; }
    100% { opacity: 0;   r: 40; }
  }

  .anim-draw         { stroke-dasharray: 600; animation: draw-line   1.8s ease-out forwards; }
  .anim-draw-short   { stroke-dasharray: 200; animation: draw-short  1.2s ease-out forwards; }
  .anim-draw-circle  { stroke-dasharray: 160; animation: draw-circle 1.6s ease-out 0.2s both; }
  .anim-fade         { animation: fade-up 0.6s ease-out both; }
  .anim-fade-in      { animation: fade-in 0.8s ease-out both; }
  .anim-pulse        { animation: pulse-dot  2s ease-in-out infinite; }
  .anim-pulse-ring   { animation: pulse-ring 1.8s ease-out infinite; }
  .anim-bar-x        { transform-origin: left;   animation: bar-grow-x 1.1s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-bar-y        { transform-origin: bottom; animation: bar-grow-y 1.0s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-node         { animation: node-appear 0.4s ease-out both; }
  .anim-flow         { stroke-dasharray: 40 20; animation: data-flow 2s ease-in-out infinite; }
  .anim-scan         { animation: scan 3s ease-in-out infinite; }
  .anim-count        { animation: count-in 0.8s ease-out 0.5s both; }
  .anim-wave         { animation: wave-expand 2s ease-out infinite; }
  .anim-rotate       { transform-origin: center; animation: rotate-slow 8s linear infinite; }
  .anim-blink        { animation: blink 1.1s step-end infinite; }
`;

// ─────────────────────────────────────────
// 1. 生成AI導入支援 — Workflow graph + terminal
// ─────────────────────────────────────────
export const GenAICardVisual = ({ color }) => (
  <div className="w-full mt-5 mb-2">
    <style>{animStyles}</style>

    <div className="flex items-center justify-between mb-3">
      <span className="font-display text-xs tracking-[0.2em] uppercase font-[600]" style={{ color: `${color}70` }}>
        AI Workflow Demo
      </span>
      <span className="font-display text-sm font-[700] anim-count" style={{ color }}>応答 0.4s</span>
    </div>

    {/* Workflow node graph */}
    <div className="mb-3 rounded-xl overflow-hidden" style={{ background: `${color}06`, border: `1px solid ${color}12` }}>
      <svg viewBox="0 0 280 90" fill="none" className="w-full">
        {/* Connector lines first (behind nodes) */}
        <line x1="55" y1="45" x2="95" y2="45" stroke={color} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 3" className="anim-flow" style={{ animationDelay: "0.2s" }} />
        <line x1="155" y1="45" x2="195" y2="45" stroke={color} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 3" className="anim-flow" style={{ animationDelay: "0.6s" }} />
        <line x1="115" y1="45" x2="155" y2="45" stroke={color} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 3" className="anim-flow" style={{ animationDelay: "0.4s" }} />
        <line x1="215" y1="45" x2="255" y2="45" stroke={color} strokeOpacity="0.25" strokeWidth="1" strokeDasharray="4 3" className="anim-flow" style={{ animationDelay: "0.8s" }} />

        {/* Nodes */}
        {[
          { x: 35, label: "Input", sub: "User", delay: "0s" },
          { x: 115, label: "Claude", sub: "LLM", delay: "0.2s" },
          { x: 175, label: "n8n", sub: "Flow", delay: "0.4s" },
          { x: 235, label: "Slack", sub: "Out", delay: "0.6s" },
        ].map(({ x, label, sub, delay }) => (
          <g key={label} className="anim-node" style={{ animationDelay: delay }}>
            <rect x={x - 19} y="28" width="38" height="34" rx="7"
              fill={label === "Claude" ? `${color}20` : `${color}0C`}
              stroke={color} strokeOpacity={label === "Claude" ? 0.5 : 0.18} strokeWidth="1" />
            <text x={x} y="43" fill={color} fillOpacity={label === "Claude" ? 0.9 : 0.55}
              fontSize="12" fontFamily="Syne" fontWeight="700" textAnchor="middle">{label}</text>
            <text x={x} y="55" fill={color} fillOpacity="0.4"
              fontSize="10" fontFamily="Syne" textAnchor="middle">{sub}</text>
          </g>
        ))}

        {/* Scanning line over the graph */}
        <line x1="0" y1="0" x2="280" y2="0" stroke={color} strokeOpacity="0.3" strokeWidth="1" className="anim-scan" />
      </svg>
    </div>

    {/* Terminal output */}
    <div className="rounded-xl p-3 mb-3" style={{ background: "#050A0D", border: `1px solid ${color}18` }}>
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-2 h-2 rounded-full" style={{ background: "#FF5F56" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "#FFBD2E" }} />
        <div className="w-2 h-2 rounded-full" style={{ background: "#27C93F" }} />
        <span className="font-display text-xs ml-2 font-[600]" style={{ color: `${color}35` }}>ai-agent.log</span>
      </div>
      {[
        { t: "$ Trigger: 新規問い合わせ", d: "0s", h: false },
        { t: "> Claude: 意図分類中…", d: "0.15s", h: false },
        { t: "> 分類: FAQ / 在庫確認", d: "0.3s", h: true },
        { t: "> Notion DB 照会 ✓", d: "0.45s", h: false },
        { t: "> Slack 送信完了 ✓", d: "0.6s", h: false },
      ].map(({ t, d, h }) => (
        <div key={t} className="flex items-center gap-1.5 mb-0.5 anim-fade" style={{ animationDelay: d }}>
          <span className="font-display text-xs leading-relaxed"
            style={{ color: h ? color : `${color}50`, fontWeight: h ? 700 : 400 }}>{t}</span>
        </div>
      ))}
      <span className="font-display text-[9px]" style={{ color }}> █ <span className="anim-blink" style={{ display: "inline" }}>|</span></span>
    </div>

    {/* KPI strip */}
    <div className="flex gap-2">
      {[{ label: "業務削減", v: "42%" }, { label: "対応速度", v: "24/7" }, { label: "精度", v: "97%" }].map(m => (
        <div key={m.label} className="flex-1 text-center py-2 rounded-xl"
          style={{ background: `${color}0A`, border: `1px solid ${color}15` }}>
          <p className="font-display text-xl font-[800]" style={{ color }}>{m.v}</p>
          <p className="font-display text-xs mt-0.5 font-[500]" style={{ color: `${color}50` }}>{m.label}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────
// 2. AI企業研修 — Radar/Spider chart
// ─────────────────────────────────────────
const radarPoints = (values, cx, cy, r) => {
  const n = values.length;
  return values.map((v, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2;
    return [cx + r * v * Math.cos(angle), cy + r * v * Math.sin(angle)];
  }).map(([x, y]) => `${x},${y}`).join(" ");
};

export const TrainingCardVisual = ({ color }) => {
  const cx = 70, cy = 52, r = 42;
  const axes = ["ChatGPT", "プロンプト", "自動化", "倫理", "Claude"];
  const before = [0.22, 0.18, 0.15, 0.30, 0.20];
  const after  = [0.91, 0.87, 0.83, 0.94, 0.89];

  return (
    <div className="w-full mt-5 mb-2">
      <style>{animStyles}</style>
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-xs tracking-[0.2em] uppercase font-[600]" style={{ color: `${color}70` }}>
          Skill Radar
        </span>
        <span className="font-display text-sm font-[700] anim-count" style={{ color }}>平均スコア 89pt</span>
      </div>

      <div className="flex gap-3 mb-3">
        {/* Radar chart */}
        <svg viewBox="0 0 140 104" fill="none" className="w-36 flex-none">
          {/* Grid rings */}
          {[0.25, 0.5, 0.75, 1.0].map(pct => (
            <polygon key={pct}
              points={radarPoints(axes.map(() => pct), cx, cy, r)}
              stroke={color} strokeOpacity="0.1" strokeWidth="0.5" fill="none" />
          ))}
          {/* Axes */}
          {axes.map((_, i) => {
            const angle = (i / axes.length) * 2 * Math.PI - Math.PI / 2;
            return (
              <line key={i}
                x1={cx} y1={cy}
                x2={cx + r * Math.cos(angle)} y2={cy + r * Math.sin(angle)}
                stroke={color} strokeOpacity="0.12" strokeWidth="0.5" />
            );
          })}
          {/* Before polygon */}
          <polygon points={radarPoints(before, cx, cy, r)}
            fill={`${color}10`} stroke={color} strokeOpacity="0.25" strokeWidth="0.8" />
          {/* After polygon — animated */}
          <polygon points={radarPoints(after, cx, cy, r)}
            fill={`${color}28`} stroke={color} strokeOpacity="0.85" strokeWidth="1.5"
            className="anim-fade-in" style={{ animationDelay: "0.3s" }} />
          {/* Axis labels */}
          {axes.map((label, i) => {
            const angle = (i / axes.length) * 2 * Math.PI - Math.PI / 2;
            const lx = cx + (r + 10) * Math.cos(angle);
            const ly = cy + (r + 10) * Math.sin(angle);
            return (
              <text key={label} x={lx} y={ly + 3} fill={color} fillOpacity="0.45"
                fontSize="9" fontFamily="Syne" textAnchor="middle">{label}</text>
            );
          })}
          {/* Dot vertices after */}
          {after.map((v, i) => {
            const angle = (i / axes.length) * 2 * Math.PI - Math.PI / 2;
            return (
              <circle key={i}
                cx={cx + r * v * Math.cos(angle)} cy={cy + r * v * Math.sin(angle)}
                r="2.5" fill={color} opacity="0.85" className="anim-node" style={{ animationDelay: `${0.4 + i * 0.1}s` }} />
            );
          })}
        </svg>

        {/* Score bars */}
        <div className="flex-1 space-y-2.5">
          {[
            { skill: "ChatGPT", before: 22, after: 91 },
            { skill: "プロンプト", before: 18, after: 87 },
            { skill: "自動化", before: 15, after: 83 },
            { skill: "倫理", before: 30, after: 94 },
          ].map((s, i) => (
            <div key={s.skill}>
              <div className="flex justify-between mb-1">
                <span className="font-display text-xs font-[500]" style={{ color: `${color}60` }}>{s.skill}</span>
                <span className="font-display text-xs font-[700]" style={{ color }}>{s.after}pt</span>
              </div>
              <div className="relative h-[5px] rounded-full" style={{ background: `${color}10` }}>
                <div className="absolute top-0 left-0 h-[5px] rounded-full"
                  style={{ width: `${s.before}%`, background: `${color}25` }} />
                <div className="absolute top-0 left-0 h-[5px] rounded-full anim-bar-x"
                  style={{ width: `${s.after}%`, background: color, opacity: 0.78, animationDelay: `${0.1 * i}s` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tags row */}
      <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: `${color}08`, border: `1px solid ${color}14` }}>
        <div className="flex-1">
          <p className="font-display text-sm font-[800] mb-1" style={{ color }}>研修完了率 92%</p>
          <p className="font-display text-xs" style={{ color: `${color}50` }}>全受講者 70pt+ 達成</p>
        </div>
        <div className="flex flex-wrap gap-1 justify-end">
          {["ChatGPT", "Claude", "n8n", "Dify"].map(tag => (
            <span key={tag} className="font-display text-[9px] px-2 py-0.5 rounded-full"
              style={{ background: `${color}12`, border: `1px solid ${color}22`, color: `${color}75` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// 3. SNS・広告支援 — Animated ROAS trend + vertical bars
// ─────────────────────────────────────────
export const SocialAdsCardVisual = ({ color }) => (
  <div className="w-full mt-5 mb-2">
    <style>{animStyles}</style>
    <div className="flex items-center justify-between mb-3">
      <span className="font-display text-xs tracking-[0.2em] uppercase font-[600]" style={{ color: `${color}70` }}>
        Ad Performance
      </span>
      <span className="font-display text-sm font-[700] anim-count" style={{ color }}>ROAS 8.4×</span>
    </div>

    {/* ROAS trend line with animated draw */}
    <div className="rounded-xl overflow-hidden mb-3" style={{ background: `${color}06`, border: `1px solid ${color}12` }}>
      <svg viewBox="0 0 280 72" fill="none" className="w-full">
        {/* Grid */}
        {[18, 36, 54].map(y => (
          <line key={y} x1="0" y1={y} x2="280" y2={y} stroke={color} strokeOpacity="0.05" strokeWidth="0.5" />
        ))}
        {/* Month labels */}
        {["1月", "2月", "3月", "4月", "5月", "6月"].map((m, i) => (
          <text key={m} x={20 + i * 48} y="70" fill={color} fillOpacity="0.35" fontSize="10" fontFamily="Syne" textAnchor="middle">{m}</text>
        ))}
        {/* Fill area */}
        <path d="M0,64 C28,60 56,50 84,40 C112,30 140,20 168,14 C196,8 224,5 280,3 L280,68 L0,68Z"
          fill={`${color}0C`} />
        {/* Line */}
        <path d="M0,64 C28,60 56,50 84,40 C112,30 140,20 168,14 C196,8 224,5 280,3"
          stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" className="anim-draw" />
        {/* Data points */}
        {[[0,64],[84,40],[168,14],[280,3]].map(([x, y], i) => (
          <g key={i} className="anim-node" style={{ animationDelay: `${0.4 + i * 0.15}s` }}>
            <circle cx={x} cy={y} r="9" fill={color} opacity="0" className="anim-pulse-ring" style={{ animationDelay: `${i * 0.4}s` }} />
            <circle cx={x} cy={y} r="3" fill={color} opacity="0.85" />
          </g>
        ))}
        {/* Label at end */}
        <text x="232" y="16" fill={color} fillOpacity="0.9" fontSize="16" fontFamily="Syne" fontWeight="700">×8.4 ROAS</text>
      </svg>
    </div>

    {/* Vertical bar chart — platform breakdown */}
    <div className="flex items-end gap-2 mb-3 h-16 px-1">
      {[
        { platform: "Meta", roas: "9.2×", h: 88 },
        { platform: "TikTok", roas: "7.8×", h: 74 },
        { platform: "YouTube", roas: "6.4×", h: 61 },
        { platform: "Google", roas: "5.9×", h: 56 },
      ].map((p, i) => (
        <div key={p.platform} className="flex-1 flex flex-col items-center gap-1">
          <span className="font-display text-xs font-[700]" style={{ color }}>{p.roas}</span>
          <div className="w-full rounded-t-lg anim-bar-y"
            style={{ height: `${p.h}%`, background: `${color}${i === 0 ? "80" : i === 1 ? "5C" : i === 2 ? "42" : "30"}`, animationDelay: `${i * 0.08}s` }} />
          <span className="font-display text-xs" style={{ color: `${color}50` }}>{p.platform}</span>
        </div>
      ))}
    </div>

    {/* KPI strip */}
    <div className="flex gap-2">
      {[{ label: "CPC削減", v: "−43%" }, { label: "CTR", v: "4.2%" }, { label: "CVR", v: "×2.8" }].map(m => (
        <div key={m.label} className="flex-1 text-center py-2 rounded-xl"
          style={{ background: `${color}0A`, border: `1px solid ${color}15` }}>
          <p className="font-display text-xl font-[800]" style={{ color }}>{m.v}</p>
          <p className="font-display text-xs mt-0.5 font-[500]" style={{ color: `${color}50` }}>{m.label}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────
// 4. LINE・ファネル構築 — Trapezoid funnel
// ─────────────────────────────────────────
export const LineFunnelCardVisual = ({ color }) => {
  const stages = [
    { stage: "広告クリック",    count: "12,400", cvr: null,  w: 100 },
    { stage: "LP閲覧",          count: "9,800",  cvr: "79%", w: 79  },
    { stage: "LINE登録",        count: "4,200",  cvr: "43%", w: 54  },
    { stage: "商談申込",        count: "980",    cvr: "23%", w: 34  },
    { stage: "成約",            count: "312",    cvr: "32%", w: 18  },
  ];

  return (
    <div className="w-full mt-5 mb-2">
      <style>{animStyles}</style>
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-xs tracking-[0.2em] uppercase font-[600]" style={{ color: `${color}70` }}>
          Funnel Visualization
        </span>
        <span className="font-display text-sm font-[700] anim-count" style={{ color }}>CVR ×3.2</span>
      </div>

      {/* SVG trapezoid funnel */}
      <div className="mb-3">
        <svg viewBox="0 0 280 110" fill="none" className="w-full">
          {stages.map((s, i) => {
            const topW = (s.w / 100) * 260;
            const nextW = i < stages.length - 1 ? (stages[i + 1].w / 100) * 260 : topW * 0.6;
            const segH = 18;
            const y = i * (segH + 2) + 4;
            const topX = (280 - topW) / 2;
            const botX = (280 - nextW) / 2;
            const opacity = 0.18 + i * 0.15;
            return (
              <g key={s.stage} className="anim-fade" style={{ animationDelay: `${i * 0.1}s` }}>
                <polygon
                  points={`${topX},${y} ${topX + topW},${y} ${botX + nextW},${y + segH} ${botX},${y + segH}`}
                  fill={color} opacity={opacity}
                  stroke={color} strokeOpacity={0.15} strokeWidth="0.5"
                />
                <text x="60" y={y + segH / 2 + 3.5} fill={color} fillOpacity="0.55"
                  fontSize="10" fontFamily="Syne">{s.stage}</text>
                <text x="220" y={y + segH / 2 + 3.5} fill={color} fillOpacity="0.75"
                  fontSize="10" fontFamily="Syne" textAnchor="end">{s.count}</text>
                {s.cvr && (
                  <text x="246" y={y + segH / 2 + 3.5} fill={color} fillOpacity="0.95"
                    fontSize="11" fontFamily="Syne" fontWeight="700">{s.cvr}</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* LINE metrics */}
      <div className="flex gap-2">
        {[{ label: "友だち数", v: "+8,000" }, { label: "開封率", v: "64%" }, { label: "リピート率", v: "78%" }].map(m => (
          <div key={m.label} className="flex-1 text-center py-2 rounded-xl"
            style={{ background: `${color}0A`, border: `1px solid ${color}15` }}>
            <p className="font-display text-sm font-[700]" style={{ color }}>{m.v}</p>
            <p className="font-display text-[9px] mt-0.5 font-[500]" style={{ color: `${color}50` }}>{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// 5. プロモーション設計 — Expanding reach rings
// ─────────────────────────────────────────
export const PromotionCardVisual = ({ color }) => (
  <div className="w-full mt-5 mb-2">
    <style>{animStyles}</style>
    <div className="flex items-center justify-between mb-3">
      <span className="font-display text-xs tracking-[0.2em] uppercase font-[600]" style={{ color: `${color}70` }}>
        Campaign Reach
      </span>
      <span className="font-display text-sm font-[700] anim-count" style={{ color }}>獲得 ×3.8</span>
    </div>

    {/* Reach rings + channel bars side by side */}
    <div className="flex gap-3 mb-3">
      {/* Broadcast rings SVG */}
      <div className="rounded-xl flex-none flex items-center justify-center"
        style={{ width: 100, height: 100, background: `${color}06`, border: `1px solid ${color}12` }}>
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Expanding wave rings */}
          <circle cx="50" cy="50" r="6" fill={color} opacity="0" className="anim-wave" style={{ animationDelay: "0s" }} />
          <circle cx="50" cy="50" r="6" fill={color} opacity="0" className="anim-wave" style={{ animationDelay: "0.7s" }} />
          <circle cx="50" cy="50" r="6" fill={color} opacity="0" className="anim-wave" style={{ animationDelay: "1.4s" }} />
          {/* Static rings */}
          <circle cx="50" cy="50" r="20" stroke={color} strokeOpacity="0.10" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="33" stroke={color} strokeOpacity="0.07" strokeWidth="1" fill="none" />
          <circle cx="50" cy="50" r="44" stroke={color} strokeOpacity="0.04" strokeWidth="1" fill="none" />
          {/* Center dot */}
          <circle cx="50" cy="50" r="6" fill={color} opacity="0.85" />
          <circle cx="50" cy="50" r="3" fill="#060A0E" />
          {/* Reach labels */}
          <text x="50" y="24" fill={color} fillOpacity="0.55" fontSize="10" fontFamily="Syne" fontWeight="700" textAnchor="middle">4.9M</text>
          <text x="50" y="38" fill={color} fillOpacity="0.38" fontSize="9" fontFamily="Syne" textAnchor="middle">1.8M</text>
          <text x="50" y="57" fill={color} fillOpacity="0.25" fontSize="8" fontFamily="Syne" textAnchor="middle">680K</text>
          {/* Orbit dots */}
          {[0, 72, 144, 216, 288].map((deg, i) => {
            const rad = (deg - 90) * Math.PI / 180;
            return (
              <circle key={i}
                cx={50 + 33 * Math.cos(rad)} cy={50 + 33 * Math.sin(rad)}
                r="2.5" fill={color} opacity="0.5" className="anim-node" style={{ animationDelay: `${0.2 + i * 0.1}s` }} />
            );
          })}
        </svg>
      </div>

      {/* Channel bars */}
      <div className="flex-1 space-y-2">
        {[
          { ch: "インフルエンサー", reach: "2.4M", bar: 0.86 },
          { ch: "SNS広告",         reach: "1.8M", bar: 0.65 },
          { ch: "オーガニック",    reach: "680K", bar: 0.38 },
          { ch: "LP経由",          reach: "124K", bar: 0.18 },
        ].map((c, i) => (
          <div key={c.ch}>
            <div className="flex justify-between mb-0.5">
              <span className="font-display text-xs font-[500]" style={{ color: `${color}55` }}>{c.ch}</span>
              <span className="font-display text-xs font-[700]" style={{ color }}>{c.reach}</span>
            </div>
            <div className="h-[5px] rounded-full" style={{ background: `${color}10` }}>
              <div className="h-[5px] rounded-full anim-bar-x"
                style={{ width: `${c.bar * 100}%`, background: color, opacity: 0.65, animationDelay: `${i * 0.1}s` }} />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* KPI strip */}
    <div className="flex gap-2">
      {[{ label: "総リーチ", v: "4.9M" }, { label: "エンゲージ率", v: "5.8%" }, { label: "LP CVR", v: "8.4%" }].map(m => (
        <div key={m.label} className="flex-1 text-center py-2 rounded-xl"
          style={{ background: `${color}0A`, border: `1px solid ${color}15` }}>
          <p className="font-display text-xl font-[800]" style={{ color }}>{m.v}</p>
          <p className="font-display text-xs mt-0.5 font-[500]" style={{ color: `${color}50` }}>{m.label}</p>
        </div>
      ))}
    </div>
  </div>
);

const visualMap = {
  "Generative AI": GenAICardVisual,
  "AI Training":   TrainingCardVisual,
  "Social & Ads":  SocialAdsCardVisual,
  "LINE & Funnel": LineFunnelCardVisual,
  "Promotion":     PromotionCardVisual,
};

export const getServiceCardVisual = (nameEn) => visualMap[nameEn] || GenAICardVisual;
