import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import ServicesPreview from "../components/ServicesPreview";
import WorkGallery from "../components/WorkGallery";
import PortfolioCatalog from "../components/PortfolioCatalog";
import ReviewsSlider from "../components/ReviewsSlider";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <ServicesPreview />
      <WorkGallery />
      <PortfolioCatalog />
      <ReviewsSlider />
    </>
  );
}
