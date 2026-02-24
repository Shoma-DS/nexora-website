import { useGSAP } from "@gsap/react";
import ClipPathTitle from "../components/ClipPathTitle";
import gsap from "gsap";
import VisualPinSection from "../components/VisualPinSection";

const BenefitSection = () => {
  useGSAP(() => {
    const revealTl = gsap.timeline({
      delay: 1,
      scrollTrigger: {
        trigger: ".benefit-section",
        start: "top 60%",
        end: "top top",
        scrub: 1.5,
      },
    });

    revealTl
      .to(".benefit-section .first-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .second-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .third-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fourth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      })
      .to(".benefit-section .fifth-title", {
        duration: 1,
        opacity: 1,
        clipPath: "polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)",
        ease: "circ.out",
      });
  });

  return (
    <section className="benefit-section">
      <div className="container mx-auto pt-20">
        <div className="col-center">
          <p className="leading-[2]">NEXORAが選ばれる理由</p>

          <div className="mt-16 col-center">
            <ClipPathTitle
              title={"生成AI × マーケ特化"}
              color={"#060A0E"}
              bg={"#22D3EE"}
              className={"first-title"}
              borderColor={"#060A0E"}
            />
            <ClipPathTitle
              title={"ChatGPT・n8n・Dify導入実績"}
              color={"#F8FAFC"}
              bg={"#0F1923"}
              className={"second-title"}
              borderColor={"#22D3EE30"}
            />
            <ClipPathTitle
              title={"広告 × SNS × LINE一貫支援"}
              color={"#060A0E"}
              bg={"#A5F3FC"}
              className={"third-title"}
              borderColor={"#060A0E"}
            />
            <ClipPathTitle
              title={"ファネル設計から成約まで"}
              color={"#F8FAFC"}
              bg={"#818CF8"}
              className={"fourth-title"}
              borderColor={"#060A0E"}
            />
            <ClipPathTitle
              title={"成果コミット型"}
              color={"#060A0E"}
              bg={"#34D399"}
              className={"fifth-title"}
              borderColor={"#060A0E"}
            />
          </div>

          <div className="md:mt-0 mt-10">
            <p>AIからプロモーションまで、ひとつのパートナーから。</p>
          </div>
        </div>
      </div>

      <div className="relative overlay-box">
        <VisualPinSection />
      </div>
    </section>
  );
};

export default BenefitSection;
