import {
  userInfoSchema,
  userProductSchema,
} from "@/features/orderNavigation/orderNavigationSchema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const orderItemsText = (orders: z.infer<typeof userProductSchema>[]) =>
  orders
    .map(
      (item, index) =>
        `${index + 1}. ${item.name} - Qty: ${item.quantity} - Price: ${
          item.price
        }`
    )
    .join("\n");

export const generateMessage = ({
  orders,
  userInfo,
}: {
  orders: z.infer<typeof userProductSchema>[];
  userInfo: z.infer<typeof userInfoSchema>;
}) => {
  const message = `
Bonjour ${userInfo.firstname} ${userInfo.lastname},\n
Merci pour votre commande !\n
📞 Contact : ${userInfo.whatsapp}\n
🛍️ Détails de la commande :\n${orderItemsText(orders)}\n
`;
  return message;
};
