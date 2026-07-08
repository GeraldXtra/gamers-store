import Hero from "../../components/sections/Hero/Hero";
import TopRatedProducts from "../../components/sections/TopRatedProducts/TopRatedProducts";
import FeaturedProducts from "../../components/sections/FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../../components/sections/TrendingProducts/TrendingProducts";
import BrandLogos from "../../components/sections/BrandLogos/BrandLogos";
import PromoBanners from "../../components/sections/PromoBanners/PromoBanners";

const Home = () => {
  return (
    <>
      <Hero />
      <TopRatedProducts />
      <FeaturedProducts />
      <TrendingProducts />
      <BrandLogos />
      <PromoBanners />
    </>
  );
};

export default Home;
