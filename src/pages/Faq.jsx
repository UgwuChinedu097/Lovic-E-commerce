import React from "react";
import Header from "../static/Header";
import Footer from "../static/Footer";

const FAQ = () => {
    return (
        <>
            <Header />
            <section className="py-16 px-6 max-w-[1000px] mx-auto">
                <h1 className="text-3xl font-bold text-black mb-6">Frequently Asked Questions</h1>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-xl font-semibold text-black mb-2">
                            Do you offer international shipping?
                        </h2>
                        <p className="text-gray-700">
                            Currently, we sell locally and do not ship internationally. We are
                            working toward expanding soon.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-semibold text-black mb-2">Are your products real gold/silver?</h2>
                        <p className="text-gray-700">
                            All products are clearly labeled with material type. We sell a
                            variety of pieces including plated and genuine materials.
                        </p>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default FAQ;