import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrderContext } from "@/pages/Home";
import { orderSchema } from "@/schema";
import { Button } from "../ui/button";
import { actionList } from "@/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const deliverySchema = orderSchema.pick({
  order: true,
  orderType: true,
});
type DeleveryType = z.infer<typeof deliverySchema>;

function Order() {
  const { dispatch, state } = useOrderContext();

  const form = useForm<DeleveryType>({
    resolver: zodResolver(deliverySchema),
  });

  const onSubmit = (data: DeleveryType) => {
    console.log(state);
  };

  return (
    <div>
      <h3>Etape {state.currentPage} : Votre commande</h3>
      <Form {...form}>
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commande</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tapez votre commande ici"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Commande</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tapez votre commande ici"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="orderType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
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
            onClick={() => dispatch({ type: actionList.PREV_PAGE })}
            className="border-2 border-orange-600 bottom-2 bg-transparent text-orange-600 hover:text-white hover:bg-orange-600 hover:border-orange-600 py-5 px-10"
          >
            Precedent
          </Button>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600  py-5 px-10 border-2 border-orange-500 hover:border-orange-600"
          >
            Envoyez à KINTACOS
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default Order;

const deliveryTypeList: { type: DeleveryType["orderType"]; name: string }[] = [
  { type: "delivery", name: "Livraison" },
  { type: "pickup", name: "A emporter" },
];
