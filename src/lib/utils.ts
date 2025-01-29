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

export const fastFoodMenu = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Burger Classique",
    price: 5.99,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    name: "Cheeseburger",
    price: 6.49,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    name: "Double Burger",
    price: 7.99,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    name: "Frites Moyennes",
    price: 2.99,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    name: "Frites Grandes",
    price: 3.99,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    name: "Nuggets (6 pièces)",
    price: 4.99,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Soda Moyen",
    price: 1.99,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440007",
    name: "Soda Grand",
    price: 2.49,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440008",
    name: "Milkshake Vanille",
    price: 3.99,
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440009",
    name: "Tacos Poulet",
    price: 6.99,
  },
];
