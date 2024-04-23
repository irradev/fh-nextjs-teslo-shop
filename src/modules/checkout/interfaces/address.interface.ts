export interface CheckoutAddress {
  id?: string;
  name: string;
  lastName: string;
  address: string;
  address_second?: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
  rememberAddress: boolean;
}
