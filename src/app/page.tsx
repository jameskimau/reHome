import CategoryShowcase from "@/components/home/CategoryShowcase";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import LatestArrivals from "@/components/home/LatestArrivals";
import WhyUs from "@/components/home/WhyUs";

// COMPONNET
const Home = () => {
  // BUILD UI
  return (
    <>
      <Hero />
      <CategoryShowcase />
      <LatestArrivals />
      <HowItWorks />
      <WhyUs />
    </>
  );
};

export default Home;
