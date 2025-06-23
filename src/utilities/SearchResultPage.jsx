import React, { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CTAButton from "../ui/CTAButton";
import Header from "../static/Header";
import { useGetAllProductsQuery } from "../service/ProductApi";

const SearchResultsPage = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetAllProductsQuery();

  const filteredProducts = useMemo(() => {
    if (!data?.allProduct || !keyword) return [];
    const term = decodeURIComponent(keyword.toLowerCase().trim());
    return data.allProduct.filter((prod) =>
      prod?.name?.toLowerCase().includes(term)
    );
  }, [data, keyword]);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="p-6 text-center">Searching products…</div>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <Header />
        <div className="p-6 text-center text-red-500">
          Failed to fetch products.
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <section className="py-16 bg-neutral-100">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12">
          <h2 className="text-[30px] font-bold text-black text-center capitalize">
            Search Results for “{decodeURIComponent(keyword)}”
          </h2>
          <p className="text-[16px] text-gray-600 text-center mt-1 mb-10">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-lg:gap-6 max-md:gap-4">
            {filteredProducts.map((product) => {
              const productImage = Array.isArray(product.image)
                ? product.image[0]
                : typeof product.image === "string"
                ? product.image.split(",")[0]
                : "/placeholder.png";

              return (
                <div
                  key={product._id}
                  className="relative bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => navigate(`/productdetails/${product._id}`)}
                  >
                    <img
                      src={productImage}
                      alt={product.name}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <h2 className="text-lg font-semibold text-gray-800">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 mt-auto">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-bold text-black">
                        ₦{product.price}
                      </span>
                      <CTAButton
                        className="bg-black text-white px-4 py-1 rounded-full text-sm"
                        text="View Details"
                        onClick={() => navigate(`/product/${product._id}`)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredProducts.length === 0 && (
              <div className="col-span-full text-center text-gray-500">
                No products found.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
