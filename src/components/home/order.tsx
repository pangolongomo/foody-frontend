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
import {
  deliverTypeSchema,
  userProductSchema,
} from "@/features/orderNavigation/orderNavigationSchema";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import { generateMessage } from "@/lib/utils";
import {
  previousStep,
  setDeliveryType,
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

  console.log(WHATSAPP_API_URL);

  const form = useForm<DeleveryType>({
    defaultValues: {
      deliveryType,
      orders,
    },
  });

  const onSubmit = async () => {
    console.log(import.meta.env.VITE_META_FACEBOOK_TOKEN);
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
    <div>
      <h3>Etape {currentStep + 1} : Votre commande</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                      <SelectValue placeholder="Fais ton choix" />
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
          <div className="flex gap-6 py-4">
            <Button
              type="button"
              onClick={() => dispatch(previousStep())}
              className="border-2 border-orange-600 bottom-2 bg-transparent text-orange-600 hover:text-white hover:bg-orange-600 hover:border-orange-600 py-5 px-10"
            >
              Precedent
            </Button>
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600  py-5 px-10 border-2 border-orange-500 hover:border-orange-600"
            >
              Envoyez à KINFOODIES
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
    { type: "pickup", name: "A emporter" },
  ];
