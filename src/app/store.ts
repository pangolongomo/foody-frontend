import { configureStore } from "@reduxjs/toolkit";
import orderNavigationReducer from "@/features/orderNavigation/orderNavigationSlice";

const store = configureStore({
  reducer: {
    orderNavigation: orderNavigationReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
