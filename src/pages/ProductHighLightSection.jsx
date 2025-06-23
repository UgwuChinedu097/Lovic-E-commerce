import jewelryImg from "../assets/react.svg"; 

export default function ProductHighlightSection() {
  return (
    <section className="py-20 bg-white">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div>
            <img
              src={jewelryImg}
              alt="Jewelry Showcase"
              className="w-full h-[500px] object-cover rounded-2xl shadow-md"
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold font-serif text-black mb-4">
              Curated Jewelry for Every Style
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              At Lumina Jewel, we handpick high-quality jewelry from trusted
              suppliers to bring you the best of elegance and trend. Whether
              you’re searching for bold statements or everyday essentials,
              we’ve got something for everyone.
            </p>

            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-amber-600"></span>
                <span>
                  <strong className="text-black">Sourced from Trusted Partners:</strong> Only the most reputable vendors.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-amber-600"></span>
                <span>
                  <strong className="text-black">Wide Variety:</strong> From rings and bangles to watches and matching sets.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 mt-2 rounded-full bg-amber-600"></span>
                <span>
                  <strong className="text-black">Affordable Luxury:</strong> Get premium-looking pieces without breaking the bank.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
