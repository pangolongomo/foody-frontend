import { useAppSelector } from "@/app/hook";
import Information from "@/components/home/information";
import Order from "@/components/home/order";

function OrderManagement() {
  const { currentStep } = useAppSelector((state) => state.orderNavigation);

  return (
    <section className="space-y-10 py-16">
      <div>
        <h2 className="text-2xl font-bold">Passe ta commande !</h2>
        <p className="font-light"> Nous vous livrons à domicile</p>
      </div>
      <div>
        {currentStep === 0 && <Information />}
        {currentStep === 1 && <Order />}
      </div>
    </section>
  );
}

export default OrderManagement;
