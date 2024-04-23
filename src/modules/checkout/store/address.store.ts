import { type StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { CheckoutAddress } from '../interfaces';

interface State {
  address: CheckoutAddress | null;

  setAddress: (address: CheckoutAddress) => void;
}

const addressStore: StateCreator<State> = (set) => ({
  address: null,

  setAddress: (address) => set({ address }),
});

export const useAddressStore = create<State>()(
  devtools(
    persist(addressStore, {
      name: 'address-storage',
    })
  )
);
