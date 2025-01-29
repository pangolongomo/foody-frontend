import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { userInfoSchema } from "@/features/orderNavigation/orderNavigationSchema";
import { useAppDispatch, useAppSelector } from "@/app/hook";
import {
  nextStep,
  setUserInfo,
} from "@/features/orderNavigation/orderNavigationSlice";

import { Button } from "../ui/button";
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

type InfoType = z.infer<typeof userInfoSchema>;

function Information() {
  const dispatch = useAppDispatch();
  const { currentStep, userInfo } = useAppSelector(
    (state) => state.orderNavigation
  );

  const form = useForm<InfoType>({
    resolver: zodResolver(userInfoSchema),
    defaultValues: userInfo,
  });

  const onSubmit = (data: InfoType) => {
    dispatch(setUserInfo(data));
    dispatch(nextStep());
  };

  return (
    <div>
      <h3 className="mb-3">Etape {currentStep + 1} : Vos informations</h3>

      <Form {...form}>
        <form className="space-y-6">
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
                    placeholder="Parlez-nous un peu de vous"
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
        </form>
      </Form>
    </div>
  );
}

export default Information;
