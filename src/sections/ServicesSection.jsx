import ServicesTitle from "../components/ServicesTitle";
import ServicesSlider from "../components/ServicesSlider";

const ServicesSection = () => {
  return (
    <section id="services" className="services-section">
      <div className="h-full flex lg:flex-row flex-col items-center relative">
        <div className="lg:w-[57%] flex-none h-80 lg:h-full md:mt-20 xl:mt-0">
          <ServicesTitle />
        </div>
        <div className="h-full">
          <ServicesSlider />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
