// abonnement : free/ org
import { ProductTypeData } from '@/api/product/product.types';

export enum SelectionStatus {
  ORG = 'ORG',
  FAM = 'FAM',
  FRO = 'FRO',
  LII = 'LII',
}
export interface SelectionTypeData {
  _id?: string;
  title: string;
  titleSlug: string;
  description?: string;
  image: ImageType;
  promote: string[];
  author?: string;
  products: string[];
  status: string[];
  createdAt: string;
}

export type RemoveSelectionType = {
  slug: string;
  image_id: string;
}
export type RemoveSelectionsInput = RemoveSelectionType[];
export type ImageType = {
  public_id: string;
  url: string;
};
export type SelectionInput = {
  title: string;
  description: string;
  image?: ImageType;
  author: string;
  status?: string[];
  // products?: ProductTypeData[];
};

export type UpdateSelectionInput = {
  titleSlug: string;
  title: string;
  description: string;
  image: string;
  author: string;
  selectionStatus: SelectionStatus;
  products?: ProductTypeData[];
  promote: [string]
};

export type ValidateSelectionInput = {
  titleSlug: string;
};
