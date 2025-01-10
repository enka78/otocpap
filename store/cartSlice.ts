import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

// CPAP, BiPAP ve Oksijen Konsantratörü kategorileri için miktar kontrolü
const isSinglePurchaseCategory = (category: string) => {
  return ["cpap", "bipap", "oksijen-konsantratoru"].includes(
    category.toLowerCase()
  );
};

// Maske ve Aksesuar kategorileri için miktar kontrolü
const isMultiPurchaseCategory = (category: string) => {
  return ["masks", "accessories"].includes(category.toLowerCase());
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        price: number;
        image: string;
        category: string;
      }>
    ) => {
      const { id, category } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        // Sadece maske ve aksesuar için miktar artırılabilir
        if (isMultiPurchaseCategory(category)) {
          existingItem.quantity += 1;
        }
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        // Sadece maske ve aksesuar için miktar güncellenebilir
        if (isMultiPurchaseCategory(item.category)) {
          item.quantity = Math.max(1, quantity);
        } else {
          item.quantity = 1;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
