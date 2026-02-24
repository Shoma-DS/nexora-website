const FooterSection = () => {
  return (
    <section id="contact" className="footer-section">
      {/* Top divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="2xl:h-[110dvh] relative md:pt-[15vh] pt-[8vh]">
        <div className="overflow-hidden z-10">
          <h1 className="section-title text-center text-white py-5 font-display">
            <span className="text-gradient-gold">Contact</span> Us
          </h1>
        </div>

        {/* Background glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #22D3EE, transparent 70%)" }}
        />

        {/* Social buttons */}
        <div className="flex-center gap-5 relative z-10 md:mt-16 mt-8">
          {/* X / Twitter */}
          <a className="social-btn" href="#" aria-label="X">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#F8FAFC" opacity="0.6">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a className="social-btn" href="#" aria-label="LinkedIn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#F8FAFC" opacity="0.6">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          {/* GitHub */}
          <a className="social-btn" href="#" aria-label="GitHub">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#F8FAFC" opacity="0.6">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>

        {/* Footer content */}
        <div className="mt-24 md:px-10 px-5 flex gap-10 md:flex-row flex-col justify-between text-white font-body md:text-sm font-[400]">
          <div className="flex items-start md:gap-16 gap-8">
            <div className="space-y-3">
              <p className="text-gold font-display font-[600] mb-4 tracking-wide text-xs uppercase">Services</p>
              <p className="text-white/40">生成AI導入支援</p>
              <p className="text-white/40">AI企業研修</p>
              <p className="text-white/40">SNS・広告支援</p>
            </div>
            <div className="space-y-3">
              <p className="text-gold font-display font-[600] mb-4 tracking-wide text-xs uppercase">Solutions</p>
              <p className="text-white/40">LINE・ファネル構築</p>
              <p className="text-white/40">プロモーション設計</p>
              <p className="text-white/40">LP制作</p>
            </div>
            <div className="space-y-3">
              <p className="text-gold font-display font-[600] mb-4 tracking-wide text-xs uppercase">Company</p>
              <p className="text-white/40">会社概要</p>
              <p className="text-white/40">採用情報</p>
              <p className="text-white/40">ブログ</p>
            </div>
          </div>

          <div className="md:max-w-md">
            <p className="text-white/40 mb-4 leading-[1.9]">
              まずはお気軽にご相談ください。<br />
              無料戦略相談で貴社のDX課題を整理します。
            </p>
            <div className="flex justify-between items-center border-b border-gold/20 py-5 md:mt-6">
              <input
                type="email"
                placeholder="your@company.com"
                className="w-full placeholder:font-body placeholder:text-[#3A4A5A]"
              />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 ml-4">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* CTA box */}
            <div className="mt-8 p-6 rounded-2xl border border-gold/20 bg-gold/5 relative overflow-hidden">
              {/* Subtle circuit pattern */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: "linear-gradient(rgba(34,211,238,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />
              <div className="relative z-10 flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="font-display font-[700] text-white text-sm tracking-tight">無料戦略相談を申し込む</span>
              </div>
              <p className="relative z-10 font-body text-white/35 text-xs leading-[1.8]">
                AIとデータのプロフェッショナルが課題を診断。初回相談は完全無料です。
              </p>
            </div>
          </div>
        </div>

        <div className="copyright-box">
          <p>Copyright &copy; 2026 NEXORA株式会社 — All Rights Reserved</p>
          <div className="flex items-center gap-7">
            <p>プライバシーポリシー</p>
            <p>利用規約</p>
            <p>情報セキュリティ方針</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
