import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrderContext } from "@/pages/Home";
import { Button } from "../ui/button";
import { actionList } from "@/constants";
import { orderSchema } from "@/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { PhoneInput } from "../common/phone-input";
import { Textarea } from "../ui/textarea";

const informationSchema = orderSchema.omit({
  order: true,
  orderType: true,
  currentPage: true,
});
type InfoType = z.infer<typeof informationSchema>;

function Information() {
  const { dispatch, state } = useOrderContext();

  const form = useForm<InfoType>({
    // resolver: zodResolver(informationSchema),
  });

  const onSubmit = (data: InfoType) => {
    console.log(data);

    dispatch({ type: actionList.NEXT_PAGE });
  };

  return (
    <div>
      <h3>Etape {state.currentPage} : Vos informations</h3>

      <Form {...form}>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro</FormLabel>
              <FormControl>
                <PhoneInput
                  international
                  defaultCountry="CD"
                  {...field}
                  className="p-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Whatsapp</FormLabel>
              <FormControl>
                <PhoneInput
                  international
                  defaultCountry="CD"
                  className="w-full rounded-md focus:outline-none focus:ring-2"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ville</FormLabel>
                <FormControl>
                  <Input placeholder="Entrez votre ville" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="district"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Commune</FormLabel>
                <FormControl>
                  <Input placeholder="Entrez votre commune" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="moreInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="button"
          onClick={form.handleSubmit(onSubmit)}
          className="bg-orange-500 hover:bg-orange-600  py-5 px-10 border-2 border-orange-500 hover:border-orange-600"
        >
          Continuer
        </Button>
      </Form>
    </div>
  );
}

export default Information;
