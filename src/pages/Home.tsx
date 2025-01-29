import { useAppSelector } from "@/app/hook";
import Information from "@/components/home/information";
import Order from "@/components/home/order";

function Home() {
  const { currentStep } = useAppSelector((state) => state.orderNavigation);

  return (
    <section className="container px-8">
      <div className="py-20 px-12 space-y-10">
        <div>
          <h2 className="text-2xl font-bold">Passe ta commande !</h2>
          <p className="font-light"> Nous vous livrons à domicile</p>
        </div>
        <div>
          {currentStep === 0 && <Information />}
          {currentStep === 1 && <Order />}
        </div>
      </div>
    </section>
  );
}

export default Home;
