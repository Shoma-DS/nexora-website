// Professional SVG icons for each service

// 生成AI導入支援 — Robot/Chat icon
export const GenAIIcon = ({ color = "currentColor", size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Chat bubble */}
    <rect x="6" y="8" width="30" height="22" rx="5" stroke={color} strokeWidth="1.5" />
    {/* Tail */}
    <path d="M14 30 L10 38 L22 30" fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    {/* Circuit dots inside */}
    <circle cx="15" cy="19" r="2" fill={color} opacity="0.8" />
    <circle cx="21" cy="19" r="2" fill={color} opacity="0.8" />
    <circle cx="27" cy="19" r="2" fill={color} opacity="0.8" />
    {/* Blink line above dots */}
    <line x1="15" y1="14" x2="27" y2="14" stroke={color} strokeWidth="1" strokeLinecap="round" strokeOpacity="0.5" />
    {/* Robot ear antennas */}
    <line x1="36" y1="12" x2="40" y2="8" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="41" cy="7" r="2" fill={color} opacity="0.7" />
    {/* n8n/workflow indicator bottom right */}
    <rect x="32" y="32" width="12" height="10" rx="2" fill={color} fillOpacity="0.15" stroke={color} strokeOpacity="0.4" strokeWidth="1" />
    <text x="38" y="40" fill={color} fontSize="5" fontFamily="Syne" fontWeight="700" textAnchor="middle" opacity="0.8">AI</text>
  </svg>
);

// AI企業研修 — Graduation/Brain icon
export const TrainingIcon = ({ color = "currentColor", size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Open book */}
    <path d="M6 34 L6 12 C6 12 14 10 24 14 C34 10 42 12 42 12 L42 34 C42 34 34 32 24 36 C14 32 6 34 6 34Z"
      stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="24" y1="14" x2="24" y2="36" stroke={color} strokeWidth="1" strokeDasharray="2 2" opacity="0.5" />
    {/* Graduation cap on top */}
    <path d="M14 10 L24 6 L34 10 L24 14Z" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    {/* Tassel */}
    <line x1="34" y1="10" x2="36" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="36" cy="17" r="2" fill={color} opacity="0.7" />
    {/* Knowledge lines on left page */}
    <line x1="10" y1="20" x2="20" y2="20" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="10" y1="24" x2="18" y2="24" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="10" y1="28" x2="20" y2="28" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    {/* Knowledge lines on right page */}
    <line x1="28" y1="20" x2="38" y2="20" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <line x1="28" y1="24" x2="36" y2="24" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.4" />
    <line x1="28" y1="28" x2="38" y2="28" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
  </svg>
);

// SNS・広告支援 — Graph + Megaphone icon
export const SocialAdsIcon = ({ color = "currentColor", size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Bar chart */}
    <rect x="6" y="28" width="7" height="14" rx="2" fill={color} fillOpacity="0.25" stroke={color} strokeOpacity="0.5" strokeWidth="1" />
    <rect x="16" y="20" width="7" height="22" rx="2" fill={color} fillOpacity="0.35" stroke={color} strokeOpacity="0.5" strokeWidth="1" />
    <rect x="26" y="12" width="7" height="30" rx="2" fill={color} fillOpacity="0.6" stroke={color} strokeOpacity="0.7" strokeWidth="1" />
    {/* Trend arrow up */}
    <polyline points="6,26 19,18 29,10" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <polygon points="29,10 36,8 34,15" fill={color} opacity="0.7" />
    {/* Megaphone */}
    <path d="M38 16 L42 13 L42 29 L38 26 L30 26 L30 16Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <line x1="30" y1="26" x2="28" y2="32" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    {/* Sound waves */}
    <path d="M43 17 C45 18.5 45 24.5 43 26" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
    <path d="M45 15 C48 17 48 26 45 28" stroke={color} strokeWidth="1" strokeLinecap="round" opacity="0.3" />
  </svg>
);

// LINE・ファネル構築 — Funnel + Phone icon
export const LineFunnelIcon = ({ color = "currentColor", size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Funnel shape */}
    <path d="M6 8 L42 8 L30 22 L30 38 L18 44 L18 22Z"
      fill={color} fillOpacity="0.12" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    {/* Funnel level lines */}
    <line x1="10" y1="14" x2="38" y2="14" stroke={color} strokeWidth="0.75" strokeOpacity="0.4" strokeDasharray="3 2" />
    <line x1="14" y1="20" x2="34" y2="20" stroke={color} strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="3 2" />
    {/* Smartphone right side */}
    <rect x="34" y="26" width="10" height="16" rx="2" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.1" />
    {/* Screen */}
    <rect x="35.5" y="28" width="7" height="10" rx="1" fill={color} fillOpacity="0.2" />
    {/* Home button */}
    <circle cx="39" cy="40" r="1" fill={color} opacity="0.5" />
    {/* Chat bubble on screen */}
    <rect x="36.5" y="29.5" width="5" height="3" rx="1" fill={color} fillOpacity="0.6" />
    <rect x="36.5" y="34" width="4" height="2.5" rx="1" fill={color} fillOpacity="0.4" />
  </svg>
);

// プロモーション設計 — Rocket + Star icon
export const PromotionIcon = ({ color = "currentColor", size = 48 }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    {/* Rocket body */}
    <path d="M24 6 C24 6 36 10 36 24 L30 30 L18 30 L12 24 C12 10 24 6 24 6Z"
      fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.5" />
    {/* Rocket window */}
    <circle cx="24" cy="20" r="5" stroke={color} strokeWidth="1.5" />
    <circle cx="24" cy="20" r="2" fill={color} opacity="0.5" />
    {/* Rocket fins */}
    <path d="M18 28 L12 36 L18 34" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M30 28 L36 36 L30 34" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
    {/* Exhaust */}
    <path d="M20 30 C20 34 22 38 24 40 C26 38 28 34 28 30" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1" />
    {/* Stars */}
    <circle cx="8" cy="12" r="1.5" fill={color} opacity="0.6" />
    <circle cx="40" cy="10" r="1" fill={color} opacity="0.5" />
    <circle cx="42" cy="18" r="1.5" fill={color} opacity="0.4" />
    <circle cx="6" cy="22" r="1" fill={color} opacity="0.4" />
  </svg>
);

const iconMap = {
  "Generative AI": GenAIIcon,
  "AI Training": TrainingIcon,
  "Social & Ads": SocialAdsIcon,
  "LINE & Funnel": LineFunnelIcon,
  "Promotion": PromotionIcon,
};

export const getServiceIcon = (nameEn) => iconMap[nameEn] || GenAIIcon;
