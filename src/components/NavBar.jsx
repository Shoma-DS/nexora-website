import { useState } from "react";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center md:px-10 px-5 py-5">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9">
          <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
            <rect x="1" y="1" width="34" height="34" rx="8" stroke="#22D3EE" strokeWidth="1.5" />
            <path d="M9 27 L9 9 L27 27 L27 9" stroke="#22D3EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="font-display font-[700] text-white text-lg tracking-[-0.02em]">NEXORA</span>
      </div>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-10 font-body text-sm text-white/60">
        <a href="#services" className="hover:text-gold transition-colors duration-300 tracking-wide">Services</a>
        <a href="#about" className="hover:text-gold transition-colors duration-300 tracking-wide">About</a>
        <a href="#cases" className="hover:text-gold transition-colors duration-300 tracking-wide">Cases</a>
        <a
          href="#contact"
          className="transition-all duration-300 bg-gold/10 border border-gold/30 rounded-full px-6 py-2 text-gold hover:bg-gold/20 hover:border-gold/50 tracking-wide"
        >
          Contact
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.5px]" : ""}`} />
        <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`w-6 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.5px]" : ""}`} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-bg-primary/95 backdrop-blur-xl border-t border-white/5 py-8 px-5 flex flex-col gap-6 font-body text-lg text-white/70">
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#cases" onClick={() => setMenuOpen(false)}>Cases</a>
          <a href="#contact" onClick={() => setMenuOpen(false)} className="text-gold">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
