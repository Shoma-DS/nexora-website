import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { useEffect } from "react";
import MessageSection from "./sections/MessageSection";
import ServicesSection from "./sections/ServicesSection";
import { useGSAP } from "@gsap/react";
import StatsSection from "./sections/StatsSection";
import BenefitSection from "./sections/BenefitSection";
import CasesSection from "./sections/CasesSection";
import ChatbotSection from "./sections/ChatbotSection";
import FooterSection from "./sections/FooterSection";
import CustomCursor from "./components/CustomCursor";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  useEffect(() => {
    if (typeof document === "undefined") return;

    if (!document.querySelector('script[data-icon-lib="lordicon"]')) {
      const script = document.createElement("script");
      script.src = "https://cdn.lordicon.com/lordicon.js";
      script.async = true;
      script.dataset.iconLib = "lordicon";
      document.body.appendChild(script);
    }

    if (!document.querySelector('script[data-icon-lib="lottie-player"]')) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js";
      script.async = true;
      script.dataset.iconLib = "lottie-player";
      document.body.appendChild(script);
    }
  }, []);

  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  });

  return (
    <main>
      <CustomCursor />
      <NavBar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <MessageSection />
          <ServicesSection />
          <StatsSection />
          <ChatbotSection />

          <div>
            <BenefitSection />
            <CasesSection />
          </div>

          <FooterSection />
        </div>
      </div>
    </main>
  );
};

export default App;
