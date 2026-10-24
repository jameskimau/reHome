import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import ShopSection from "@/components/home/ShopSection";
import WhyUs from "@/components/home/WhyUs";

// COMPONNET
const Home = ({ searchParams }: PageProps<"/">) => {
  // BUILD UI
  return (
    <>
      <Hero />
      <ShopSection searchParams={searchParams} />
      <HowItWorks />
      <WhyUs />
    </>
  );
};

export default Home;
