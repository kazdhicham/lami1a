import React, { createContext, useReducer } from 'react'

import { ViewerTypeData } from '@/api/viewer/viewer.types'
import {
  SET_PAGE_INDEX,
  SET_SELECTION_STATUS,
  SET_SELECTIONS,
  SET_COLLABORATORS,
  SET_SELF_SELECTIONS,
  ADD_SELF_SELECTION,
  SET_SELECTION,
  PROMOTE_SELECTION,
  SET_SELECTED,
  SET_ENROLLMENTS

} from "@/store/constants";
import { SelectionTypeData } from '@/api/selection/selection.types';

const initialState = {
  title: '',
  titleSlug: '',
  description: '',
  image: { url: '', public_id: '' },
  author: '',
  products: [''],
  status: ['FRO'],
  promote: [''],
  collaborators: [{
    login: '',
    loginSlug: '',
    email: '',
    phone: '',
    instagram: '',
    website: '',
    organisation: '',
    avatar: {
      url: ''
    },
    events: [{
      id: '',
      title: '',
      content: '',
      allDay: false,
      start: '',
      end: '',
      status: '',
      contact: '',
    }],
    messages: [{
      date: '',
      sender: '',
      product: '',
      rec: '',
      content: '',
      token: '',
    }],
    coords: {
      lat: 0,
      long: 0,
    },
    addressGeo: '',
    bio: '',
  }],
  pageIndex: 0,
  selected: [''],
  selections: [{
    title: '',
    titleSlug: '',
    promote: [''],
    status: [''],
    products: [''],
    description: '',
    image: { url: '', public_id: '' },
    createdAt: ''
  }],
  selfSelections: [{
    title: '',
    titleSlug: '',
    promote: [''],
    status: [''],
    products: [''],
    description: '',
    image: { url: '', public_id: '' },
    createdAt: ''
  }],
  viewersPromote: [{
    login: '',
    titleSlug: ''
  }],
  conversationFeed: [{
    sender: '',
    product: '',
    messages: [{
      date: '',
      rec: '',
      content: '',
    }
    ]
  }],
  orders: [{
    products: [''],
    quantity: 0,
    profile: '',
    total: 0,
  }],
  liisCategories: [''],


};
const initialContext = {
  state: initialState,
  setSelections: (selections: any) => (selections ? selections : null),
  setCollaborators: (collaborators: any) => (collaborators ? collaborators : null),
  setEnrollments: (enrollments: any) => (enrollments ? enrollments : null),
  setSelection: (selection: any) => (selection ? selection : null),
  setSelected: (titles: any) => (titles ? titles : null),
  setSelfSelections: (selections: any) => (selections ? selections : null),
  setSelectionStatus: (status: any) => (status ? status : null),
  addSelfSelection: (selection: any) => (selection ? selection : null),
  setPageIndex: (index: any) => (index ? index : null),
  setPromoteSelection: (login: any) => (login ? login : null)
}
const selectionsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SELECTION_STATUS:
      return {
        ...state,
        selectionStatus: action.payload.selectionStatus,
      };
    case SET_SELECTIONS:
      return {
        ...state,
        selections: action.payload.selections,
      };
    case SET_COLLABORATORS:
      return {
        ...state,
        collaborators: action.payload.collaborators,
      };
    case SET_ENROLLMENTS:
      return {
        ...state,
        enrollments: action.payload.enrollments,
      };
    case SET_SELECTION:
      return {
        ...state,
        titleSlug: action.payload.titleSlug
      };
    case SET_SELECTED:
      return {
        ...state,
        selected: action.payload.selected
      };

    case SET_SELF_SELECTIONS:
      return {
        ...state,
        selfSelections: action.payload.selections,
      };
    case PROMOTE_SELECTION:
      return {
        ...state,
        viewersPromote: [...state.viewersPromote, { login: action.payload.login, titleSlug: action.payload.titleSlug }],

      };
    case ADD_SELF_SELECTION:
      return {
        ...state,
        selfSelections: [...state.selfSelections, action.payload.selection],

      };

    case SET_PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.payload.index,
      };
    default:
      return state;
  }
};


export const SelectionContext = createContext(initialContext);

export const SelectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(selectionsReducer, initialState)

  const setSelections = (selections: [SelectionTypeData]) => {
    console.log({ selections })
    dispatch({ type: SET_SELECTIONS, payload: { selections } })
  }
  const setCollaborators = (collaborators: [ViewerTypeData]) => {
    console.log({ collaborators })
    dispatch({ type: SET_COLLABORATORS, payload: { collaborators } })
  }
  const setEnrollments = (enrollments: [any]) => {
    console.log({ enrollments })
    dispatch({ type: SET_ENROLLMENTS, payload: { enrollments } })
  }
  const setSelfSelections = (selections: [SelectionTypeData]) => {

    dispatch({ type: SET_SELF_SELECTIONS, payload: { selections } })
  }
  const addSelfSelection = (selection: SelectionTypeData) => {

    dispatch({ type: ADD_SELF_SELECTION, payload: { selection } })
  }

  const setSelection = (titleSlug: any) => {
    dispatch({ type: SET_SELECTION, payload: { titleSlug } })
  }

  const setSelected = (selected: [string]) => {
    dispatch({ type: SET_SELECTED, payload: { selected } })
  }
  const setSelectionStatus = (selectionStatus: any) => {
    dispatch({
      type: SET_SELECTION_STATUS,
      payload: { selectionStatus }
    })
  }

  const setPageIndex = (index: any) => {
    dispatch({ type: SET_PAGE_INDEX, payload: { index } })
  }

  const setPromoteSelection = ({ login, titleSlug }: { login: string, titleSlug: string }) => {
    dispatch({ type: PROMOTE_SELECTION, payload: { login, titleSlug } })
  }


  return (
    <SelectionContext.Provider value={{
      state, setSelections, setCollaborators, setEnrollments,
      setSelfSelections, setSelection, setSelected, setSelectionStatus,
      addSelfSelection, setPageIndex, setPromoteSelection
    }}> {children}</SelectionContext.Provider>
  )

}
