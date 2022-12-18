import { ViewerTypeData } from '@/api/viewer/viewer.types'

export enum CardStatus {
  SOBH,
  DOHR,
  ASR,
  MAGH,
  ICHA
}
export interface CardTypeData {
  _id: string;
  title: string;
  titleSlug: string;
  description: string;
  tags: string[];
  soura: number;
  words: string[];
  viewers: ViewerTypeData[];
  cardStatus: CardStatus;
  rate: number;
}

export interface CardType {
  card: CardTypeData
}

export interface CardsType {
  cards: CardTypeData[]
}
export type CardInput = {
  title: string;
  tags: string[];
  soura: number;
  words: string[];
};
export type CardData = {
  total: number,
  results?: CardType[]
}
export type CardFilter = {
  page: number,
  limit: number
}