import { z } from "zod";

export const userInfoSchema = z.object({
  firstname: z.string().min(1, { message: "Le prénom est requis." }),
  lastname: z.string().min(1, { message: "Le nom est requis." }),
  phone: z.string().min(10, {
    message: "Le numéro de téléphone est requis et doit être valide.",
  }),
  whatsapp: z
    .string()
    .min(10, { message: "Le numéro WhatsApp est requis et doit être valide." }),
  address: z
    .string()
    .min(5, { message: "L'adresse est requise et doit être valide." }),
  city: z.string().min(1, { message: "La ville est requise." }),
  district: z.string().min(1, { message: "Le district est requis." }),
  moreInfo: z.string().optional(),
});

export const userProductSchema = z.object({
  id: z.string().uuid({ message: "L'ID du produit est invalide." }),
  name: z.string().min(1, { message: "Le nom du produit est requis." }),
  image: z.string().url(),
  quantity: z
    .number()
    .min(1, { message: "La quantité doit être au minimum de 1." }),
  price: z.number().min(0.01, { message: "Le prix doit être supérieur à 0." }),
});

export const deliverTypeSchema = z.enum(["standard", "express", "pickup"]);
