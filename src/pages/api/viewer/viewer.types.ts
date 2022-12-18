
import { ProductTypeData } from '@/api/product/product.types';
import { ImageType } from '@/api/selection/selection.types'
import { MessageTypeData, FeedTypeData } from '@/api/profile/profile.types'

export type ViewerTypeData = {
  _id?: string;
  login: string;
  loginSlug: string;
  email: string;
  password?: string;
  stripe_account_id?: string;
  phone?: string;
  bio?: string;
  avatar: ImageType;
  flagAvatar: string,
  organisation: string
  role?: string[];
  website: string;
  liisCategories: string[];
  orders: [OrderType];
  messages: [MessageTypeData];
  events: [EventType];
  conversationFeed: [FeedTypeData]
  isAdmin: boolean;
  instagram: string;
  liism?: number;
  walletId?: string;
  token?: string;
  productsPromoted?: string[];
  refreshTokenExpiration?: string;
  selections?: string[];
  products?: ProductTypeData[];
  discountProducts?: DiscountProductType[];
  sales?: number;
  liispass?: LiisPassType[];
  enrollmentAll: EnrollmentType[];
  collaboratorpass?: LiisPassType[];
  hundreddiscountspass?: LiisPassType[];
  bookings?: BookingType[];
  coords: { long: number, lat: number };
  addressGeo: string;
  updatedAt?: string;
  createdAt?: string;
};
export type ConnexionProfileType = {
  token: string;
  profileEmail: string;
  profileId: string;
  flag: string;
}
export type DiscountProductType = {
  title: string;
  stock: number;
}
export type LiisPassType = {
  pass: string;
  flag: string

}
export type EnrollmentInput = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: ImageType;
  enrollmentStatus: string[];
  max: number;
  startDate: string;
  endDate: string;


}
export type EnrollmentType = {
  title: string;
  description: string;
  price: string;
  image: ImageType;
  max: number;
  startDate: string;
  endDate: string;
}
export type EventType = {
  id: string;
  title: string;
  content: string;
  allDay: boolean;
  start: string;
  end: string;
  status: string;
  contact: string;
}
export type RegisterEventInput = {
  email: string;
  events: [EventType];
}

export type RemoveEnrollmentInput = {
  id: string;
  title: string[];
}

export type CardBackInput = {
  id: string;
  card: number;
}
export type GetDiscountInput = {
  affiliator: string;
  discountToken: string;
}
export type BookingType = {
  bookingStartDate: string;
  bookingEndDate: string;
}
export type OrderType = {
  products: string[];
  quantity: number;
  profile: string;
  total: number;
};

export type BookingTypeData = {
  bookingStartDate: string;
  bookingEndDate: string;
};

export type AddViewerInput = {
  login: string;
  email: string;
  phone?: string;
  uid?: string;
  role?: [string];
  name: string;
  destination: string;
  building: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zip: string;
  contact: string;
  isdefault: boolean;
};

export type AddViewerOutput = {
  _id: string;
  login: string;
  username?: string;
  email: string;
  role: string;
  token: string;
  address: Address
};
export type SigninViewerInput = {
  email: string
  password: string
}
export type UpdateViewerInput = {

  login: string;
  email: string;
  bio: string;
  phone?: string;
  role?: [string];
  organisation?: string;
  website?: string;
  instagram?: string;
  avatar: { pulic_id: string, url: string }

};

export type RemoveViewerInput = {
  email: string;
};
export type Address = {
  name: string;
  destination: string;
  building: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  contact: string | number;
  isdefault: boolean;
};
export type AddressInput = {
  id: string;
  name: string;
  destination: string;
  building: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  contact: string | number;
  isdefault: boolean;
};

export type UpdateViewerAddressInput = {
  email: string;
  coords: { long: number, lat: number };
  addressGeo: string;

};
export type ConnectPayoutInput = {
  email: string;
  id: string;
}
export type StudsType = {
  flag: string;
  pass: string;
}
export enum TypeRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  COLL = 'COLL',
  LIIS = 'LIIS',
  ORGA = 'ORGA',
}
export enum ViewerTypeLevel {
  SOBH,
  DOHR,
  ASR,
  MAGH,
  ICHA
}
