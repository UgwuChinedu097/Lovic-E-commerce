import { Link } from "react-router-dom";
import NecklaceImg from "../assets/react.svg";
import RingImg from "../assets/react.svg";
import EarringsImg from "../assets/react.svg";
import BraceletImg from "../assets/react.svg";
import BangleImg from "../assets/react.svg";
import SetsImg from "../assets/react.svg";
import WatchesImg from "../assets/react.svg";

const categories = [
  {
    name: "Necklaces",
    image: NecklaceImg,
    link: "/category/necklace",
    description: "Statement pieces that frame your face",
  },
  {
    name: "Rings",
    image: RingImg,
    link: "/category/ring",
    description: "Symbols of commitment and style",
  },
  {
    name: "Earrings",
    image: EarringsImg,
    link: "/category/bracelet",
    description: "From subtle studs to bold statements",
  },
  {
    name: "Bracelets",
    image: BraceletImg,
    link: "/category/bracelet",
    description: "Elegant accents for your wrists",
  },
  {
    name: "Bangles",
    image: BangleImg,
    link: "/category/bangle",
    description: "Elegant accents for your wrists",
  },
  {
    name: "Sets",
    image: SetsImg,
    link: "/category/sets",
    description: "Complete matching pieces for a cohesive look",
  },
  {
    name: "Watches",
    image: WatchesImg,
    link: "/category/watches",
    description: "Timeless timepieces to elevate every outfit",
  },
];

export default function CategorySection() {
  return (
    <section className="py-16 bg-white">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[30px] font-bold text-center text-black">
          Shop by Category
        </h2>
        <p className="text-[16px] text-gray-600 text-center mt-1 mb-10">
          Browse our carefully curated collections to find your perfect piece.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-lg:gap-4">
          {categories.map((category) => (
            <Link
              to={category.link}
              key={category.name}
              className="group block overflow-hidden"
            >
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-serif font-medium mb-1">
                    {category.name}
                  </h3>
                  <p className="text-white/80 mb-4">
                    {category.description}
                  </p>
                  <span className="inline-block border-b border-amber-400 pb-1 text-amber-400 font-medium group-hover:border-white group-hover:text-white transition-colors">
                    Shop Collection
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
