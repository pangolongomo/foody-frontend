import { useAppDispatch, useAppSelector } from "@/app/hook";
import { Button } from "@/components/ui/button";
import {
  addProduct,
  removeProduct,
} from "@/features/orderNavigation/orderNavigationSlice";
import { fastFoodMenu } from "@/lib/utils";
import { useNavigate } from "react-router";

function Home() {
  const { orders } = useAppSelector((state) => state.orderNavigation);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <section className="space-y-10 py-16">
      <h3 className="text-center text-5xl font-semibold text-[#ed1b24]">
        Menu
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {fastFoodMenu.map((food) => {
          const isOnCard = orders.find((item) => item.id === food.id);
          return (
            <div
              key={food.id}
              className="shadow-lg rounded-3xl p-5 bg-slate-600 text-white space-y-3"
            >
              <img
                src={food.image}
                alt={food.name}
                className="object-cover w-full h-[10rem] rounded-3xl"
              />
              <h4>{food.name}</h4>
              <p>{food.price}$</p>
              {isOnCard ? (
                <div className="flex gap-2 items-center">
                  <Button
                    className="rounded-xl text-lg"
                    onClick={() => dispatch(removeProduct(isOnCard.id))}
                  >
                    -
                  </Button>

                  {isOnCard.quantity}
                  <Button
                    className="rounded-xl text-lg"
                    onClick={() => dispatch(addProduct(isOnCard))}
                  >
                    +
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    className="rounded-xl text-lg"
                    onClick={() =>
                      dispatch(addProduct({ ...food, quantity: 1 }))
                    }
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <Button
          className="px-8 py-6 text-lg bg-red-500 hover:bg-[#ed1b24]"
          onClick={() => navigate("/order")}
        >
          Commander
        </Button>
      </div>
    </section>
  );
}

export default Home;
