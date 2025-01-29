import { z } from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  deliverTypeSchema,
  userProductSchema,
} from "@/features/orderNavigation/orderNavigationSchema";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { generateMessage } from "@/lib/utils";
import {
  previousStep,
  setDeliveryType,
  addProduct,
  removeProduct,
} from "@/features/orderNavigation/orderNavigationSlice";

type DeleveryType = {
  deliveryType: z.infer<typeof deliverTypeSchema>;
  orders: z.infer<typeof userProductSchema>[];
};

function Order() {
  const dispatch = useAppDispatch();
  const { currentStep, deliveryType, userInfo, orders } = useAppSelector(
    (state) => state.orderNavigation
  );

  const senderPhoneId = import.meta.env.VITE_META_PHONE_NUMBER_ID;
  const WHATSAPP_API_URL = `https://graph.facebook.com/v21.0/${senderPhoneId}/messages`;

  const form = useForm<DeleveryType>({
    defaultValues: {
      deliveryType,
      orders,
    },
  });

  const onSubmit = async () => {
    if (!userInfo) return;
    const message = generateMessage({ userInfo, orders });
    try {
      const response = await axios.post(
        WHATSAPP_API_URL,
        {
          messaging_product: "whatsapp",
          to: userInfo?.whatsapp,
          type: "text",
          text: { body: message },
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_META_FACEBOOK_TOKEN}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h3 className="text-2xl font-semibold text-center mb-4">
        Étape {currentStep + 1} : Votre commande
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="deliveryType"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    dispatch(
                      setDeliveryType(value as DeleveryType["deliveryType"])
                    );
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Faites votre choix" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {deliveryTypeList.map((item) => (
                      <SelectItem key={item.type} value={item.type}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="border p-4 shadow-sm">
                <CardHeader>
                  <CardTitle>{order.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Quantité: {order.quantity}</p>
                  <p>Prix: {order.price} USD</p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      className="rounded-xl text-lg"
                      onClick={() => dispatch(removeProduct(order.id))}
                    >
                      -
                    </Button>
                    <Button
                      className="rounded-xl text-lg"
                      onClick={() => dispatch(addProduct(order))}
                    >
                      +
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-between py-4">
            <Button
              type="button"
              onClick={() => dispatch(previousStep())}
              className="border-2 border-orange-600 bg-transparent text-orange-600 hover:text-white hover:bg-orange-600 py-3 px-6"
            >
              Précédent
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 py-3 px-6 border-2 border-orange-500 hover:border-orange-600"
            >
              Envoyer à KINFOODIES
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Order;

const deliveryTypeList: { type: DeleveryType["deliveryType"]; name: string }[] =
  [
    { type: "standard", name: "Standard" },
    { type: "express", name: "Express" },
    { type: "pickup", name: "À emporter" },
  ];
