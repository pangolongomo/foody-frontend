import { useAppSelector } from "@/app/hook";

function Home() {
  const { currentStep } = useAppSelector((state) => state.orderNavigation);

  return <section className="space-y-10 py-16"></section>;
}

export default Home;
