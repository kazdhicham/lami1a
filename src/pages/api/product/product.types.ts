import { ImageType } from '@/api/selection/selection.types'

export enum ProductStatus {
  ORG = "ORG",
  FAM = "FAM",
  FRO = "FRO",
  LII = "LII",
}
export type ProductTypeData = {
  _id?: string;
  title: string;
  titleSlug: string;
  description?: string;
  price: number;
  offerPrice?: number;
  author?: string;
  image: ImageType;
  productStatus: string[];
  promotedBy?: string[];
  valid?: boolean;
  selection?: string;
  stock: number;
  promo?: number;
  rate?: number;
  quantity?: number;
  reviews?: string[];
  createdAt?: string;
};

export type ProductCartTypeData = {
  _id?: string;
  title: string;
  titleSlug: string;
  description?: string;
  price: number;
  offerPrice?: number;
  author?: string;
  image: string;
  promote?: string[];
  selection?: string;
  reviews?: string[];
  valid?: boolean;
  productStatus: string[];
  stock: number;
  promo?: number;
  rate?: number;
  quantity?: number;
  createdAt?: string;
};

export interface ProductsFilterArgs {
  filter: ProductsFilterType;
  page: number;
  limit: number;
}

export enum ProductsFilterType {
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW'
}

export type ProductInput = {
  title: string;
  description: string;
  price: string;
  image: ImageType;
  productStatus: string[];
  author: string;
  stock: number;
  promo: boolean;
  selection: string;

};
export type UpdateProductInput = {
  titleSlug: string;
  title: string;
  description: string;
  price: number;
  image: ImageType;
  productStatus: string[];
  stock: number;
  promo: number;
  author: string
  selection: string
}
export type SortOptionsProps = {
  value: string;
  label: string;
};

export type RemoveProductType = {
  slug: string;
  image_id: string;
  selection: string;
}
export type RemoveProductsInput = RemoveProductType[];
// product shop filter
export type ProductsFilter = {
  length?: number;
  search: string;
  sort: string;
  gender: string[];
  categories: string[];
  colors: string[];
  price: string;
  rating: number;
};

// product shop filter - sort options
