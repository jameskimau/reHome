import HowItWorks from "@/components/home/HowItWorks";
import ShopSection from "@/components/home/ShopSection";
import WhyUs from "@/components/home/WhyUs";

// COMPONNET
const Home = ({ searchParams }: PageProps<"/">) => {
  // BUILD UI
  return (
    <>
      <ShopSection searchParams={searchParams} />
      <HowItWorks />
      <WhyUs />
    </>
  );
};

export default Home;
