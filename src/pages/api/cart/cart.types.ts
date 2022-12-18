//import { ImageType } from '@/api/selection/selection.types'


type KeyedObject = {
  [key: string]: string | number | KeyedObject | unknown;
};


export interface CartProductsInput {
  title: string;
  description: string;
  image: string;
  price: number;
  promo: number;
  shipping: number;
  discount: number;
  quantity: number;
  stock: number;
}


export interface CartTypeData {
  id: string;
  step: number;
  cartProducts: [CartProductsInput];
  subtotal: number;
  total: number;
  discount: number;
  shipping: number;
  address: Address | null;
  payment: string;
  viewer: string;
  delivery: {
    startDate: string,
    endDate: string
  }
  valid: boolean;
}

export type Address = {
  id?: string | number | undefined;
  name?: string;
  destination?: string;
  building?: string;
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string | number;
  contact?: string | number;
  isdefault?: boolean;
};

export interface CartPayment {
  type: string;
  method: string;
  card: string;
}
export interface CartInput {
  step: string;
  products: [string];
  subtotal: number;
  total: number;
  discount: number;
  shipping: number;
  address: {
    name: string;
    destination: string;
    building: string;
    street: string;
    city: string;
    state: string;
    country: string;
    contact: string;
    zip: string;
    isdefault: boolean
  }
  payment: string;
  viewerLogin: string;
  viewerEmail: string;
}
export interface CheckoutInput {
  cartProducts: [CartProductsInput];
  total: number;
  quantity: number;
  discount: number;
  shipping: number;
  author_stripe_account_id?: string;
  profileId: string;
  delivery: {
    startDate: Date;
    endDate: Date
  };
  login: string;
  email: string;
  address: {
    name: string;
    destination: string;
    building: string;
    street: string;
    city: string;
    state: string;
    country: string;
    contact: string;
    zip: string;
    isdefault: boolean;
  }

}
export interface CheckoutOutput {

  sessionId: string;
  url: string;
}
export interface ProductCardProps extends KeyedObject {
  id?: string | number;
  color?: string;
  title: string;
  titleSlug?: string;
  image: string;
  description?: string;
  offerPrice?: number;
  price?: number;
  promo?: number;
  rate?: number;
}

export type ProductCartProps = {
  _id?: string;
  title: string;
  titleSlug: string;
  description?: string;
  price: number;
  createdAt?: string;
  image: string;
  promo?: number;
  stock: number
  rate?: number;
  favorite?: number;
  quantity: number;
};

export interface CartProductStateProps {
  step: number;
  products: ProductCartProps[];
  subtotal: number;
  total: number;
  discount: number;
  shipping: number;
  billing: Address | null;
  payment: CartPaymentStateProps;
}


export interface CartPaymentStateProps {
  type: string;
  method: string;
  card: string;
}

export type PaymentOptionsProps = {
  id: number;
  value: string;
  title: string;
  caption: string;
  image: string;
  size: {
    width: number;
    height: number;
  };
};
