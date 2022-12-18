import { ImageType } from '@/api/selection/selection.types'
import { CardTypeData } from '../card/card.types';
export enum ProgressStatus {
  SOBH,
  DOHR,
  ASR,
  MAGH,
  ICHA
}
export enum TabletStatus {
  SOBH,
  DOHR,
  ASR,
  MAGH,
  ICHA
}
export type TabletTypeData = {
  _id: string;
  title: string;
  titleSlug: string;
  description: string;
  tags?: string[];
  soura: number[];
  words?: string[];
  cards?: CardTypeData[];
  tabletStatus: TabletStatus;
  level: number;
  liism: number;
  viewers?: string[];
  createdAt?: string;
  updatedAt?: string;
};

export type TabletType = {
  tablet: TabletTypeData;
};
export type TabletsType = {
  tablets: TabletTypeData[];
};
export type TabletInput = {
  title: string;
  description: string;
  tags: string[];
  souras: number[];
  words: string[];
  cards?: CardTypeData[];
  tabletstatus: TabletStatus
  level: number
  liism: number
};

export type UpdateTabletInput = {
  id: string;
  title: string;
  description: string;
  tags: [string];
  soura: [number];
  words: [string];
  image: ImageType;
  cards?: CardTypeData[];
  coll: CollaboratorTypeData[];
  viewers?: string[];
  tabletstatus: TabletStatus
  level: number
  liism: number
}
export type TabletFilter = {
  limit: number;
  page: number
}
export type TabletData = {
  total: number;
  results?: TabletTypeData[]
}
export interface TabletStateProps {
  columns: TabletColumn[];
  columnsOrder: string[];
  comments: TabletComment[];
  items: TabletItem[];
  viewers: string[];
  selectedItem: string | false;
  userStory: TabletUserStory[];
  userStoryOrder: string[];
  error: object | string | null;
}

export type TabletColumn = {
  id: string;
  title: string;
  itemIds: string[];
};

export type TabletComment = {
  id: string;
  comment: string;
  profileId: string;
};

export type TabletItem = {
  assign?: string;
  attachments: [];
  commentIds?: string[];
  description: string;
  dueDate: Date;
  id: string;
  image: string | false;
  priority: 'low' | 'medium' | 'high';
  title: string;
};

export type TabletProfile = {
  id: string;
  name: string;
  avatar: string;
  time: string;
};

export type TabletUserStory = {
  acceptance: string;
  assign?: string;
  columnId: string;
  commentIds?: string[];
  description: string;
  dueDate: Date;
  id: string;
  itemIds: string[];
  title: string;
  priority: string;
};
