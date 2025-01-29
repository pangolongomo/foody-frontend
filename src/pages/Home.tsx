import { z } from "zod";
import Information from "@/components/home/information";
import Order from "@/components/home/order";
import { createContext, Dispatch, useContext, useReducer } from "react";
import { actionList } from "@/constants";
import { informationSchema, orderSchema } from "@/schema";

type Action =
  | { type: typeof actionList.NEXT_PAGE; payload?: never }
  | { type: typeof actionList.PREV_PAGE; payload?: never }
  | {
      type: typeof actionList.SET_USER_INFO;
      payload: z.infer<typeof informationSchema>;
    };

type OrderContextType = {
  state: InitalState;
  dispatch: Dispatch<Action>;
};

type InitalState = z.infer<typeof orderSchema>;

const initalState: InitalState = {
  firstname: "",
  lastname: "",
  phone: "",
  whatsapp: "",
  address: "",
  city: "",
  district: "",
  moreInfo: "",
  currentPage: 1,
  order: "",
  orderType: "delivery",
};

function reducer(state: InitalState, action: Action): InitalState {
  switch (action.type) {
    case actionList.PREV_PAGE:
      return { ...state, currentPage: Math.max(state.currentPage - 1, 1) };
    case actionList.NEXT_PAGE:
      return { ...state, currentPage: state.currentPage + 1 };
    case actionList.SET_USER_INFO:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

function Home() {
  const [state, dispatch] = useReducer(reducer, initalState);

  return (
    <section>
      <div>
        <h2>Passe ta commande !</h2>
        <p> Nous vous livrons à domicile</p>
      </div>
      <div>
        <OrderContext.Provider value={{ state, dispatch }}>
          {state.currentPage === 1 && <Information />}
          {state.currentPage === 2 && <Order />}
        </OrderContext.Provider>
      </div>
    </section>
  );
}

export default Home;

export const useOrderContext = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within a OrderProvider");
  }
  return context;
};
