import ShopSection from "@/components/home/ShopSection";

// COMPONNET
const Home = ({ searchParams }: PageProps<"/">) => {
  // BUILD UI
  return <ShopSection searchParams={searchParams} />;
};

export default Home;
