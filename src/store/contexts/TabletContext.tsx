/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useReducer } from 'react';
import {
  ADD_TABLET, REMOVE_TABLET, SET_WORDS, ADD_CARD_SLICES, REMOVE_WORDS, SET_SECTION, SET_TABLET_WORDS,
  VALID_TABLET, MOUNT_TABLETS, ACTIVATE, SET_SOURAS, SET_AYAHS, SET_SOURA, SET_SOURA_NMB, SET_SOURA_NAME, SET_TIWAL,
  SET_MIIN, SET_MATHANI, SET_MOFASAL, SET_TABLET, SET_CARDS, UPDATE_COLUMNS_ORDER, CLEAR_WORDS, CLEAR_TABLET_WORDS,
  SET_OPEN_COMMENT_WORDS_DIALOG, SET_OPEN_WORDS_DIALOG, SET_WORD_AND_COMMENT,
  UPDATE_COLUMN_ITEM_ORDER, DELETE_ITEM, SET_NMB_TABLET, SET_TAB, SET_CARDS_ACCORDION, ADD_AYAT_CARDS
} from './../constants';

import {
  TabletStatus,
  TabletTypeData, TabletColumn

} from '@/api/tablet/tablet.types';
import { AnyObject } from 'yup/lib/types';
const initialTablets = {
  _id: '',
  title: '',
  titleSlug: '',
  description: '',
  tablet: { soura: '', ayahs: [], description: '' },
  nmbTablet: 10,
  tab: 0,
  tags: [''],
  souraName: '',
  souraNmb: 1,
  soura: { souraName: '', souraArabName: '', ayahs: [], id: 0 },
  souras: [],
  ayahs: [],
  ayatCards: [],
  numbAyahSliced: [],
  cardsAccordion: { soura: '', ayahs: [] },
  cardSlices: [{ soura: null, numberInSurah: 0, slices: [] }],
  tiwal: [],
  miin: [],
  mathani: [],
  mofasal: [],
  section: '',
  words: [{ text: '', number: 0, numberInSurah: 0, souraName: '', souraNmb: 0 }],
  tabletWords: [{ text: "", number: 0 }],
  image: { url: '', public_id: '' },
  createdAt: '',
  cards: new Map(),
  tabletStatus: TabletStatus.SOBH,
  level: 1,
  liism: 0,
  bookings: [''],
  colls: [''],
  viewers: [''],
  columns: [{ id: '', itemIds: [''], title: '' }],
  columnsOrder: [''],
  comments: [],
  selectedCard: false,
  openWordsDialog: false,
  wordToComment: { text: '', number: 0, souraName: '' },
  wordAndComment: [{ text: '', number: 0, souraName: '', comment: '' }],
  userStory: '',
  items: [],
  selectedItem: false


}

const initialState = {
  state: initialTablets,

  addTablet: (args: any) => {
    args ? args : false
  },
  addAyatCards: (args: any) => {
    args ? args : false
  },
  setTablet: (args: any) => {
    args ? args : false
  },
  setCards: (args: any) => {
    args ? args : false
  },
  addCardSlices: (args: any) => {
    args ? args : false

  },
  setCardsAccordion: (args: any) => {
    args ? args : false
  },
  setSouras: (args: any) => {
    args ? args : false
  },
  setAyahs: (args: any) => {
    args ? args : false
  },
  setSoura: (args: any) => {
    args ? args : false
  },
  setSection: (section: string) => {
    section ? section : false
  },
  setSouraName: (args: any) => {
    args ? args : false
  },
  setTabletWords: (args: any) => {
    args ? args : false
  },
  setSouraNmb: (nmb: number) => {
    nmb ? nmb : false
  },
  setTiwal: (args: any) => {
    args ? args : false

  },
  setMiin: (args: any) => {
    args ? args : false

  },
  setMathani: (args: any) => {
    args ? args : false

  },
  setMofasal: (args: any) => {
    args ? args : false

  },
  validTablet: (args: any) => {
    args ? args : false
  },
  mountTablets: (args: any) => {
    args ? args : false
  },
  removeTablet: (args: any) => {
    args ? args : false
  },
  setWords: (words: any) => {
    words ? words : null
  },
  clearWords: () => { },
  clearTabletWords: () => { },
  removeWords: (words: any) => {
    words ? words : null
  },
  setOpenWordsDialog: (openWordsDialog: boolean) => {
    openWordsDialog ? openWordsDialog : false
  },
  setOpenCommentWordsDialog: (wordToComment: unknown) => {
    wordToComment ? wordToComment : false
  },
  setWordAndComment: (wordToComment: unknown) => {
    wordToComment ? wordToComment : false
  },
  setNmbTablet: (nmb: number) => {
    nmb ? nmb : false
  },
  setTab: (tab: number) => {
    tab ? tab : false
  },
  activate: (titleSlug: string) => {
    console.log(titleSlug);
  },
  updateColumnItemOrder: (columns: any) => {
    columns ? columns : false
  },
  updateColumnOrder: (columns: string[]) => {
    columns ? columns : false
  },
  deleteItem: (item: string) => {
    item ? item : false
  },
};

//const viewerInitialState = { login: '', level: '', biography: '' }
const tabletReducer = (state: any, action: any) => {
  switch (action.type) {
    case ADD_TABLET:
      return { ...state, title: action.payload.title, soura: action.payload.soura, description: action.payload.description, cardSlices: action.payload.cardSlices, words: action.payload.words };
    case ACTIVATE:
      return { ...state, isActive: [...state.isActive, action.payload] };
    case SET_TABLET:
      return { ...state, tablet: action.payload.tablet };
    case SET_SOURAS:
      return { ...state, souras: action.payload.souras };
    case SET_AYAHS:
      return { ...state, ayahs: action.payload.ayahs };
    case SET_SOURA:
      return { ...state, soura: action.payload.soura };
    case SET_SOURA_NAME:
      return { ...state, souraName: action.payload.souraName };
    case SET_SOURA_NMB:
      return { ...state, souraNmb: action.payload.souraNmb };
    case SET_CARDS:
      return { ...state, cards: action.payload.cards };
    case SET_SECTION:
      return { ...state, section: action.payload.section };
    case SET_CARDS_ACCORDION:
      return { ...state, cardsAccordion: action.payload.cardsAccordion };
    case ADD_CARD_SLICES: {
      if (state.cardSlices.length === 1 && state.cardSlices.soura === null) {
        return { ...state, cardSlices: [action.payload.cardSlices] };
      }
      return { ...state, cardSlices: [...state.cardSlices, action.payload.cardSlices] };
    }

    case REMOVE_TABLET: {
      const tabs = state.talets.filter((tablet: TabletTypeData) => tablet.titleSlug !== action.payload.titleSlug)
      return { ...state, tablets: tabs };
    }
    case SET_NMB_TABLET:
      return { ...state, nmbTablet: action.payload.nmbTablet };
    case SET_TAB:
      return { ...state, tab: action.payload.tab };
    case ADD_AYAT_CARDS:
      return { ...state, ayatCards: [...state.ayatCards, action.payload.ayatCards] };
    case SET_WORDS:
      return { ...state, words: action.payload.words };
    case SET_TABLET_WORDS:
      if (state.tabletWords[0].text === '' && state.tabletWords[0].number === 0) {
        console.log({ tabletWordsState: state.tabletWords, payload: action.payload.tabletWords })

        return { ...state, tabletWords: action.payload.tabletWords };
      } else {
        console.log({ tabletWordsState: state.tabletWords, payload: action.payload.tabletWords })
        return { ...state, tabletWords: [...state.tabletWords, ...action.payload.tabletWords] };
      }
    case SET_WORD_AND_COMMENT:
      if (state.wordAndComment[0].text === '' && state.wordAndComment[0].number === 0) {
        console.log({ WordAndCommentContext: state.wordAndComment, payload: action.payload.wordAndComment })
        return { ...state, wordAndComment: action.payload.wordAndComment };
      } else {
        console.log({ WordAndCommentContext: state.wordAndComment, payload: action.payload.wordAndComment })

        return { ...state, wordAndComment: [...state.wordAndComment, ...action.payload.wordAndComment] };
      }
    case REMOVE_WORDS: {
      const newWords = state.words.filter((word: string) => {
        for (const delWord of action.payload.words) {
          if (delWord === word) return true
          else return false
        }
      })
      return { ...state, words: [...newWords] };
    }
    case CLEAR_WORDS: {

      return { ...state, words: [{ text: '', number: 0, numberInSurah: 0, souraName: '', souraNmb: 0 }] };
    }
    case CLEAR_TABLET_WORDS: {

      return { ...state, tabletWords: [{ text: '', number: 0, numberInSurah: 0, souraName: '', souraNmb: 0 }] };
    }
    case SET_OPEN_COMMENT_WORDS_DIALOG: {

      return { ...state, wordToComment: action.payload.wordToComment };
    }
    case SET_OPEN_WORDS_DIALOG: {

      return { ...state, openWordsDialog: action.payload.openWordsDialog };
    }

    case SET_TIWAL:
      return { ...state, tiwal: action.payload.tiwal };
    case SET_MIIN:
      return { ...state, miin: action.payload.miin };
    case SET_MATHANI:
      return { ...state, mathani: action.payload.mathani };
    case SET_MOFASAL:
      return { ...state, mofasal: action.payload.mofasal };
    case UPDATE_COLUMNS_ORDER:
      return { ...state, columnsOrder: action.payload.columnsOrder };
    case UPDATE_COLUMN_ITEM_ORDER:
      return { ...state, columns: action.payload.columns };
    case DELETE_ITEM:
      return { ...state, items: state.items.filter((item: any) => item.id !== action.payload.id) };

    default:
      return state
  }
}
export const TabletContext = createContext(initialState);
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function TabletProvider({ children }: { children: React.ReactNode }) {

  const [state, dispatch] = useReducer(tabletReducer, initialTablets);
  //const router = useRouter();

  //const [loading, setLoading] = useState(false);
  function validTablet(titleSlug: string) {
    dispatch({
      type: VALID_TABLET,
      payload: { titleSlug }
    })
  }
  function removeTablet(titleSlug: string) {
    dispatch({
      type: REMOVE_TABLET,
      payload: { titleSlug }
    })
  }
  function setTablet(tablet: string) {
    console.log({ tablet })
    dispatch({
      type: SET_TABLET,
      payload: { tablet }
    })
  }
  function addCardSlices(cardSlices: string) {
    console.log({ cardSlices })
    dispatch({
      type: ADD_CARD_SLICES,
      payload: { cardSlices }
    })
  }
  function setNmbTablet(nmbTablet: number) {
    console.log({ nmbTablet })
    dispatch({
      type: SET_NMB_TABLET,
      payload: { nmbTablet }
    })
  }
  function setTab(tab: number) {
    console.log({ tab })
    dispatch({
      type: SET_TAB,
      payload: { tab }
    })
  }
  function setCards(cards: string) {
    dispatch({
      type: SET_CARDS,
      payload: { cards }
    })
  }
  function setWords(words: any) {
    console.log({ words })
    dispatch({
      type: SET_WORDS,
      payload: { words }
    })
  }
  function setTabletWords(tabletWords: any) {
    console.log({ stateStabletWords: state.tabletWords })
    console.log({ tabletWords })
    dispatch({
      type: SET_TABLET_WORDS,
      payload: { tabletWords }
    })
  }
  function removeWords(words: [string]) {
    dispatch({
      type: REMOVE_WORDS,
      payload: { words }
    })
  }
  function setWordAndComment(wordAndComment: any) {
    console.log({ wordAndComment })
    dispatch({
      type: SET_WORD_AND_COMMENT,
      payload: { wordAndComment }
    })
  }
  function clearWords() {
    dispatch({
      type: CLEAR_WORDS,
      payload: {}
    })
  }
  function clearTabletWords() {
    dispatch({
      type: CLEAR_TABLET_WORDS,
      payload: {}
    })
  }
  function addAyatCards(ayatCards: string) {
    dispatch({
      type: ADD_AYAT_CARDS,
      payload: { ayatCards }
    })
  }
  function setCardsAccordion(cardsAccordion: string) {
    dispatch({
      type: SET_CARDS_ACCORDION,
      payload: { cardsAccordion }
    })
  }
  function setSouras(souras: any) {
    console.log({ souras })
    dispatch({
      type: SET_SOURAS,
      payload: { souras }
    })
  }
  function setSection(section: string) {
    dispatch({
      type: SET_SECTION,
      payload: { section }
    })
  }
  function setSoura(soura: AnyObject) {
    dispatch({
      type: SET_SOURA,
      payload: { soura }
    })
  }

  function setSouraName(souraName: string) {
    dispatch({
      type: SET_SOURA_NAME,
      payload: { souraName }
    })
  }
  function setSouraNmb(souraNmb: number) {
    dispatch({
      type: SET_SOURA_NMB,
      payload: { souraNmb }
    })
  }
  function setTiwal(tiwal: any) {
    dispatch({
      type: SET_TIWAL,
      payload: { tiwal }
    })
  }
  function setMiin(miin: any) {
    dispatch({
      type: SET_MIIN,
      payload: { miin }
    })
  }
  function setMathani(matahni: any) {
    dispatch({
      type: SET_MATHANI,
      payload: { matahni }
    })
  }
  function setMofasal(mofasal: any) {
    console.log({ mofasal })
    dispatch({
      type: SET_MOFASAL,
      payload: { mofasal }
    })
  }
  function setAyahs(ayahs: any) {
    dispatch({
      type: SET_AYAHS,
      payload: { ayahs }
    })
  }


  function setOpenWordsDialog(openWordsDialog: boolean) {
    console.log({ openWordsDialog })
    dispatch({
      type: SET_OPEN_WORDS_DIALOG,
      payload: { openWordsDialog }
    })
  }
  function setOpenCommentWordsDialog(wordToComment: unknown) {
    console.log({ wordToComment })
    dispatch({
      type: SET_OPEN_COMMENT_WORDS_DIALOG,
      payload: { wordToComment }
    })
  }
  function addTablet({ title, description, soura }: { title: string, description: string, soura: string }) {
    dispatch({
      type: ADD_TABLET,
      payload: { title, description, soura }
    })
  }
  function mountTablets(tablets: TabletTypeData[]) {
    dispatch({
      type: MOUNT_TABLETS,
      payload: { tablets }
    })
  }

  function activate(titleSlug: string) {
    dispatch({
      type: ACTIVATE,
      payload: { titleSlug }
    })
  }
  function updateColumnOrder(columnsOrder: string[]) {
    dispatch({
      type: UPDATE_COLUMNS_ORDER,
      payload: { columnsOrder }
    })
  }
  function updateColumnItemOrder(columns: TabletColumn[]) {
    dispatch({
      type: UPDATE_COLUMN_ITEM_ORDER,
      payload: { columns }
    })
  } function deleteItem(id: string) {
    dispatch({
      type: DELETE_ITEM,
      payload: { id }
    })
  }

  return <TabletContext.Provider value={{
    state, activate, mountTablets, updateColumnItemOrder, deleteItem, setSoura, setSouraName,
    setNmbTablet, setTab, setWords, clearWords, addAyatCards, addCardSlices, removeWords, setSection, setSouraNmb,
    setTablet, setCards, setCardsAccordion, removeTablet, updateColumnOrder, clearTabletWords, setWordAndComment,
    validTablet, addTablet, setSouras, setTabletWords, setOpenWordsDialog, setOpenCommentWordsDialog, setAyahs, setTiwal, setMiin, setMathani, setMofasal
  }}>{children}</TabletContext.Provider>;
}
