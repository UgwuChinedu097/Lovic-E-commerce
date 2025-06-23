import Header from '../static/Header'
import HeroSection from './Hero'
import CategorySection from './Category'
import Footer from '../static/Footer'
import ProductHighlightSection   from './ProductHighLightSection'
import ProductCard from './FeaturedProduct'

const Home = () => {
    return (
        <>
            <Header />
            <HeroSection />
            <CategorySection />
            <ProductCard />
            <ProductHighlightSection /> 
            <Footer />
        </>
    )
}

export default Home