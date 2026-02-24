import NavBar from "./components/NavBar";
import HeroSection from "./sections/HeroSection";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import MessageSection from "./sections/MessageSection";
import ServicesSection from "./sections/ServicesSection";
import { useGSAP } from "@gsap/react";
import StatsSection from "./sections/StatsSection";
import BenefitSection from "./sections/BenefitSection";
import CasesSection from "./sections/CasesSection";
import FooterSection from "./sections/FooterSection";
import CustomCursor from "./components/CustomCursor";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
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
