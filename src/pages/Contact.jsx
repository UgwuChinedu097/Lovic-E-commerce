import Footer from "../static/Footer";
import Header from "../static/Header";

const Contact = () => {
    return (
        <>
            <Header />
            <section className="py-16 px-6 max-w-[1000px] mx-auto">
                <h1 className="text-3xl font-bold text-black mb-6">Contact Us</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Have questions, feedback, or need help? We’re here for you.
                </p>
                <ul className="space-y-4 text-md text-gray-600">
                    <li>
                        <strong>Email:</strong> support@luminajewels.com
                    </li>
                    <li>
                        <strong>Phone:</strong> +234 800 123 4567
                    </li>
                    <li>
                        <strong>Instagram:</strong> @luminajewels
                    </li>
                </ul>
            </section>
            <Footer />
        </>
    );
};

export default Contact;