import CTAButton from "../ui/CTAButton";
import chinedu from "../assets/react.svg";

const HeroSection = () => {
  return (
    <section className="relative h-[70vh] bg-neutral-100 flex items-center justify-center overflow-hidden">

      <div className="absolute inset-0 z-0 flex justify-center">
        <div className="w-full max-w-[1500px]">
          <img
            src={chinedu}
            alt="Elegant jewelry collection"
            loading="lazy"
            className="w-full h-full object-cover object-center opacity-90"
          />
        </div>
      </div>

      <div className="w-full px-4 relative z-10">
        <div className="max-w-[1500px] mx-auto">
          <div className="max-w-lg bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-lg">
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">
              Timeless Elegance, Modern Design
            </h1>
            <p className="text-base md:text-lg mb-6">
              Discover our handcrafted jewelry collection, where tradition meets contemporary style.
            </p>

            <div className="flex flex-wrap gap-4">
              <CTAButton
                className="bg-amber-600 hover:bg-amber-700 px-4 py-2 rounded-md text-white md:text-[16px] text-[14px]"
                asChild
                text="Shop New Arrivals"
              />
              <CTAButton
                variant="outline"
                className="border-amber-600 text-amber-600 rounded-md border hover:text-black hover:bg-amber-50 px-4 md:text-[16px] text-[14px]"
                text="Explore Collections"
                asChild
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
