export type ProfileTypeData = {
  _id?: string;
  email: string;
  login?: string;
  token?: string;
  phone?: string;
  isAdmin?: boolean;
  address?: Address;
  role: [string];
  productsPromoted: [string];
  messages?: [MessageTypeData];
  conversationFeed: [FeedTypeData]
  orders: [
    {
      rec: string,
      product: string,
      sender: string,
      content: string,
      date: string,
    },
  ],
  enrollments?: [EnrollmentType],
  affiliate?: {
    discountToken: string,
    discounter: string
  }

  updatedAt?: string;
  createdAt?: string;
};

export type MessageTypeData = {
  date: string;
  sender: string;
  product: string;
  rec: string;
  content: string;
  token: string;

}
export type FeedTypeData = {
  sender: string;
  product: string;
  messages: [{
    date: string;
    rec: string;
    content: string;
  }
  ]
}
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

export type AddProfileOutput = {
  addProfile: {
    _id: string;
    email: string;
  }
};
export type AddProfileInput = {
  id: string;
  email: string;

};

export type EnrollmentType = {
  title: string;
  viewer: string;
  price: number;
  dateStart: string;
  dateEnd: string;
}
export type StudsEnrollmentInput = {
  email: string;
  login: string;
  id: string;
  title: string;
  description: string;
  viewer: string;
  price: number;
}
export type PromoteInputType = {
  id: string;
  login: string;
  titleSlug: string;
  selectionSlug: string;
}

export type UpdateProfileInput = {
  id: string;
  login: string;
  phone: string;
  role: [string];
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

export type AddDiscountTokenInput = {
  email: string,
  id: string;
  affiliator: string;
  token: string
  role: [string]
}
export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  ORGA = 'ORGA',
  COLL = 'COLL',
  LIIS = 'LIIS'
}

export interface ViewerCardProps {
  /* 
    follow: number;
    location: string; */
  username: string;
}

export type SendMessageInput = {
  id: string;// profile.email
  sender: string;// profile.email
  product: string;// titleSlug / subject
  rec: string;// product author === email
  content: string;// message
  date: string;
  token: string;
}
export type AddConversationFeedInput = {
  email: string;
  sender: string;// profile.email
  product: string;// titleSlug / subject
  rec: string;// product author === email
  content: string;// message
  date: string;
}
export type DeleteConversationFeedInput = {
  sender: string;// profile.email
  product: string;// titleSlug / subject
  rec: string;// product author === email


}