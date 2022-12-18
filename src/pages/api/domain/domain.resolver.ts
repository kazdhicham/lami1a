import {
  CreateDomainInput,
  UpdateDomainInput,
  AddMessageInput,
  AddViewerInput,
  DomainsType,
  DomainType,
} from './domain.types';
import mongoose from 'mongoose';

const domains = async (
  _: undefined,
  _arg: undefined,
  { DomainModel }: { DomainModel: unknown }
): Promise<DomainsType | undefined> => {
  try {
    const { domains }: DomainsType = await DomainModel.find({}).lean().exec();

    return { domains };
  } catch (error) {
    console.log({ error });
  }
};
const domain = async (
  _: undefined,
  { titleSlug }: { titleSlug: string },
  { DomainModel }: { DomainModel: unknown }
): Promise<DomainType | undefined> => {
  try {
    const { domain }: DomainType = await DomainModel.find({ titleSlug: titleSlug }).lean().exec();

    return { domain };
  } catch (error: unknown) {
    throw new Error(error);
  }
};

// Mutation
/**
 *  addDomain(input:DomainCreateInput):Domain
    updateDomain(input:UpdateDomainInput):Domain
    addViewer(input:AddViewerInput):Domain
    addMessage(input:AddMessageInput):Domain
    emoveDomain:Boolean
 * 
 */
const addDomain = async (
  _: undefined,
  args: CreateDomainInput,
  { DomainModel, currentProfile }: { DomainModel: unknown; currentProfile: unknown }
): Promise<DomainType | undefined> => {
  try {
    const id = currentProfile.id;
    const createdBy = new mongoose.Types.ObjectId(id);
    const modelDoc = new DomainModel({ ...args, prof: createdBy });
    const { domain } = await modelDoc.save();
    return { domain };
  } catch (error: unknown) {
    throw new Error(error);
  }
};

const updateDomain = async (
  _: undefined,
  { input }: { input: UpdateDomainInput },
  { DomainModel }: { DomainModel: unknown }
): Promise<DomainType | undefined> => {
  try {
    const titleSlug = input.titleSlug;

    //const id = currentProfile.id
    //const createdBy = mongoose.Types.ObjectId(id);
    const { domain } = new DomainModel.findOneAndUpdate({ titleSlug: titleSlug }, { ...input }, { new: true })
      .lean()
      .exec();
    await domain.save();
    return { domain };
  } catch (error: unknown) {
    throw new Error(error);
  }
};

const addViewerToDomain = async (
  _: undefined,
  args: AddViewerInput,
  { DomainModel, currentProfile, ViewerModel }: { DomainModel: unknown; currentProfile: unknown; ViewerModel: unknown }
): Promise<DomainType | undefined> => {
  try {
    const id = currentProfile.id;
    const createdBy = new mongoose.Types.ObjectId(id);
    const titleSlug = args.titleSlug;
    const login = args.login;
    const viewer = new ViewerModel({ login, prof: createdBy });
    await viewer.save();
    const domain = await DomainModel.findOne({ titleSlug: titleSlug });
    domain.vewers = [...domain.viewers, viewer];
    await domain.save();
    return { domain };
  } catch (error: unknown) {
    throw new Error(error);
  }
};

const addMessage = async (
  _: { _: unknown },
  args: AddMessageInput,
  { DomainModel, currentProfile, MessageModel }: { DomainModel: unknown; currentProfile: unknown; MessageModel: unknown }
): Promise<DomainType | undefined> => {
  try {
    const id = currentProfile.id;
    const createdBy = new mongoose.Types.ObjectId(id);
    const titleSlug = args.titleSlug;
    const input = args.input;
    const message = new MessageModel({ ...input, sender: createdBy });
    await message.save();

    const domain = await DomainModel.findOne({ titleSlug: titleSlug });
    domain.messages = [...domain.messages, message];
    await domain.save();
    return { domain };
  } catch (error: unknown) {
    throw new Error(error);
  }
};

const removeDomain = async (
  _: { _: unknown },
  titleSlug: string,
  { DomainModel, currentProfile }: { DomainModel: unknown; currentProfile: unknown }
): Promise<boolean> => {
  try {
    console.log({ currentProfile });
    await DomainModel.findOneAndDelete({ titleSlug: titleSlug });
    return true;
  } catch (error: unknown) {
    throw new Error(error);
  }
};
/* onst Domain = {
  cards: async (domain: DomainTypeData, _: undefined, { CardModel }: { CardModel: unknown }): Promise<CardsType> => {
    try {
      const cards: CardTypeData[] = [];
      domain.cards.forEach(async (crd) => {
        const card = await CardModel.find({ _id: new mongoose.Types.ObjectId(crd._id) });
        cards.push(card);
      });
      return { cards };
    } catch (error: unknown) {
      throw new Error(error);
    }
  },

  tablets: async (
    domain: DomainTypeData,
    _: undefined,
    { TabletModel }: { TabletModel: unknown }
  ): Promise<TabletsType> => {
    try {
      const tablets: TabletTypeData[] = [];
      domain.tablets.forEach(async (tblt) => {
        const tablet = await TabletModel.find({ _id: new mongoose.Types.ObjectId(tblt._id) });
        tablets.push(tablet);
      });
      return { tablets };
    } catch (error: unknown) {
      throw new Error(error);
    }
  },

  viewers: async (
    domain: DomainTypeData,
    _: undefined,
    { ViewerModel }: { ViewerModel: unknown }
  ): Promise<ViewersType> => {
    try {
      const viewers: ViewerTypeData[] = [];
      domain.viewers.forEach(async (vwer) => {
        const viewer = await ViewerModel.find({ _id: new mongoose.Types.ObjectId(vwer._id) });
        viewers.push(viewer);
      });
      return { viewers };
    } catch (error: unknown) {
      throw new Error(error);
    }
  },

  selections: async (
    domain: DomainTypeData,
    _: undefined,
    { dbSelections }: { dbSelections: unknown }
  ): Promise<SelectionsType> => {
    try {
      const selections: SelectionTypeData[] = [];
      domain.selections.forEach(async (slct) => {
        //as admin.firestore.DocumentSnapshot<Selection>;
        const snapshot = (await dbSelections.doc(slct.titleSlug).get())
        //dbSelections.doc(titleSlug).get().then(
        selections.push({ ...snapshot.data(), id: slct.titleSlug });
      });
      return { selections };
    } catch (error) {
      console.log({ error });
      throw error;
    }
  },


  messages: async (
    domain: DomainTypeData,
    _: undefined,
    { MessageModel }: { MessageModel: unknown }
  ): Promise<MessagesType> => {
    try {
      const messages: MessageTypeData[] = [];
      domain.messages.forEach(async (msg) => {
        const message = await MessageModel.find({ _id: new mongoose.Types.ObjectId(parseInt(msg._id)) });
        messages.push(message);
      });
      return { messages };
    } catch (error: unknown) {
      throw new Error(error);
    }
  },
}; */
module.exports = {

  Query: {
    domain,
    domains,
  },
  Mutation: {
    addDomain,
    updateDomain,
    addViewerToDomain,
    addMessage,
    removeDomain,
  },
};
