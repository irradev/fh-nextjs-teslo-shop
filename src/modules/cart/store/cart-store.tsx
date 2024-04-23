import { CartProduct, Size } from '@/modules/products/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SummaryInformation {
  subTotal: number;
  tax: number;
  total: number;
  itemsInCart: number;
}

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => SummaryInformation;
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (
    productId: string,
    quantity: number,
    size: Size
  ) => void;
  removeProductFromCart: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      getSummaryInformation: () => {
        const { cart, getTotalItems } = get();

        const subTotal = cart.reduce((subTotal, product) => {
          return product.quantity * product.price + subTotal;
        }, 0);

        const tax = subTotal * 0.15;
        const total = subTotal + tax;
        const itemsInCart = getTotalItems();

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        //1. Verificar si el producto con la talla seleccionada existe en el carrito
        const isProductInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!isProductInCart) {
          set((state) => ({
            cart: [...state.cart, product],
          }));

          return;
        }

        // 2. Si el producto ya existe en el carrito, actualizar la cantidad
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (
        productId: string,
        quantity: number,
        size: Size
      ) => {
        const { cart } = get();

        const updatedCartProducts = cart.map((item) => {
          if (item.id === productId && item.size === size) {
            return {
              ...item,
              quantity,
            };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();

        const filteredCartProducts = cart.filter((item) => {
          return item.id !== product.id || item.size !== product.size;
        });

        set({ cart: filteredCartProducts });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: 'shpoing-cart-storage',
    }
  )
);
