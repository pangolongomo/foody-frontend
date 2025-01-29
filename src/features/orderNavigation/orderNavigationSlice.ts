import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { z } from "zod";
import {
  deliverTypeSchema,
  userInfoSchema,
  userProductSchema,
} from "./orderNavigationSchema";

type OrderNavigationState = {
  currentStep: number;
  userInfo?: z.infer<typeof userInfoSchema>;
  orders: z.infer<typeof userProductSchema>[];
  deliveryType: z.infer<typeof deliverTypeSchema>;
};

const initialState: OrderNavigationState = {
  currentStep: 0,
  orders: [],
  deliveryType: "express",
};

const orderNavigationSlice = createSlice({
  name: "orderNavigation",
  initialState,
  reducers: {
    nextStep(state) {
      state.currentStep += 1;
    },
    previousStep(state) {
      state.currentStep -= 1;
    },
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    setUserInfo(state, action: PayloadAction<z.infer<typeof userInfoSchema>>) {
      state.userInfo = action.payload;
    },
    addProduct(
      state,
      action: PayloadAction<z.infer<typeof userProductSchema>>
    ) {
      const existingProductIndex = state.orders.findIndex(
        (product) => product.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        state.orders = state.orders.map((product, index) =>
          index === existingProductIndex
            ? { ...product, quantity: (product.quantity || 1) + 1 }
            : product
        );
      } else {
        state.orders = [...state.orders, { ...action.payload, quantity: 1 }];
      }
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.orders = state.orders
        .map((product) =>
          product.id === action.payload
            ? product.quantity && product.quantity > 1
              ? { ...product, quantity: product.quantity - 1 }
              : null
            : product
        )
        .filter(Boolean) as z.infer<typeof userProductSchema>[];
    },
  },
});

export const {
  nextStep,
  previousStep,
  setStep,
  addProduct,
  removeProduct,
  setUserInfo,
} = orderNavigationSlice.actions;

export default orderNavigationSlice.reducer;
