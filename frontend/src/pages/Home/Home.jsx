import Hero from "../../components/sections/Hero/Hero";
import TopRatedProducts from "../../components/sections/TopRatedProducts/TopRatedProducts";
import FeaturedProducts from "../../components/sections/FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../../components/sections/TrendingProducts/TrendingProducts";
import BrandLogos from "../../components/sections/BrandLogos/BrandLogos";
import PromoBanners from "../../components/sections/PromoBanners/PromoBanners";
import RecentlyAdded from "../../components/sections/RecentlyAdded/RecentlyAdded";
import GamersStorePopup from "../../components/Layout/GamersStorePopUp/GamersStorePopUp";

const Home = () => {
  return (
    <>
      <GamersStorePopup />
      <Hero />
      <TopRatedProducts />
      <FeaturedProducts />
      <TrendingProducts />
      <BrandLogos />
      <PromoBanners />
      <RecentlyAdded />
    </>
  );
};

export default Home;
