

import React, { createContext, ReactElement, useReducer } from 'react';
import {
  SET_COORDS, SET_ADDRESS_GEO, SET_VIEWER_NULL, SEARCH_PROFILE,
  SET_SELECTED_EVENT, SET_SELECTED_DATE, SET_ENROLLMENT_STATUS,
  SET_VIEWER, SET_ROLE, SET_FLAG_AVATAR, ADD_COLLABORATORS, ADD_ORGANISATORS, ADD_STUDS, SET_ORGANISATORS, SET_COLLABORATORS, ADD_DISCOUNTS, SET_MESSAGES,
  ADD_LIIS, ADD_EVENT, SET_ENROLLMENT_ALL, UPDATE_EVENT, REMOVE_EVENT,
  SET_EVENTS, SET_CARD_BACK, SET_CONVERSATION, ADD_TO_CONVERSATION, DELETE_CONVERSATION
} from '@/store/constants'


export const initialViewer = {
  _id: null,
  login: '',
  email: '',
  organisation: '',
  password: null,
  enrollmentAll: [{
    title: '',
    description: '',
    price: null,
    image: { public_id: '', url: '' },
    max: 10,
    promo: 0,
    enrollmentStatus: ['FRO'],
    startDate: '',
    endDate: '',

  }],
  stripe_account_id: '',
  phone: '',
  bio: '',
  avatar: { public_id: '', url: '' },
  flagAvatar: '',
  cardBack: 1,
  role: ['USER'],
  website: '',
  instagram: '',
  collaborators: [{
    login: '',
    email: '',
    phone: '',
    instagram: '',
    website: '',
    avatar: {
      url: ''
    },
    coords: {
      lat: '',
      long: '',
    },
    addressGeo: '',
    bio: '',
  }],
  organisators: [{
    login: '',
    email: '',
    phone: '',
    instagram: '',
    website: '',
    avatar: {
      url: ''
    },
    coords: {
      lat: '',
      long: '',
    },
    addressGeo: '',
    bio: '',
  }],
  liisCategories: [{
    title: '',
    description: '',
    price: 0
  }],
  orders: [{
    products: [''],
    quantity: 0,
    profileId: '',
    total: 0,
  }
  ],
  cards: [''],
  events: [{
    id: null,
    title: '',
    content: '',
    allDay: false,
    start: '',
    end: '',
    status: '',
    contact: '',
  }],
  selectedEvent: {
    id: null,
    title: '',
    content: '',
    start: '',
    end: '',
    status: '',
    contact: '',
  },
  selectedDate: null,
  enrollmentStatus: ['FRO'],
  isAdmin: false,
  cha3bi: 0,
  walletId: '',
  token: null,
  discountProducts: [{ title: '', stock: 0, price: 0 }],
  discountProfiles: [{ token: '', profileEmail: '', profileId: '', flag: '' }],
  collaboratorProfiles: [{ token: '', profileEmail: '', profileId: '', flag: '' }],
  liismanagerProfiles: [{ token: '', profileEmail: '', profileId: '', flag: '' }],
  organisatorProfiles: [{ token: '', profileEmail: '', profileId: '', flag: '' }],
  profilesFound: [{ token: '', profileEmail: '', profileId: '', flag: '' }],
  productsPromoted: [''],
  bookings: [{
    bookingStartDate: '',
    bookingEndDate: '',
  }],
  selections: [''],
  products: [''],
  messages: [{
    token: '',
    rec: '',
    product: '',
    sender: '',
    content: '',
    date: ''
  }],
  conversationFeed: [{
    product: '',
    rep: '',
    sender: '',
    messages: [{
      content: '',
      date: '',
      rec: '',
    }]
  }],
  conversation: {
    product: '',
    sender: '',
    messages: [{
      content: '',
      date: '',
      rec: '',
    }]
  },
  sales: 0,
  collaboratorpass: [{ pass: '', flag: '' }],
  liispass: [{ pass: '', flag: '' }],
  discountspass: [{ pass: '', flag: '' }],
  studspass: [{ pass: '', flag: '' }],
  hundreddiscountspass: [{ pass: '', flag: '' }],
  coords: { long: 0, lat: 0 },
  addressGeo: '',
  continent: '',
  rewards: ['String'],
}
const initialState = {
  state: initialViewer,
  setViewer: (arg: any) => { arg ? arg : null },
  addDiscounts: (arg: any) => { arg ? arg : null },
  addLiis: (arg: any) => { arg ? arg : null },
  addCollaborators: (arg: any) => { arg ? arg : null },
  addStuds: (arg: any) => { arg ? arg : null },
  addOrganisators: (arg: any) => { arg ? arg : null },
  setCollaborators: (arg: any) => { arg ? arg : null },
  setOrganisators: (arg: any) => { arg ? arg : null },
  setRole: (arg: any) => { arg ? arg : null },
  setCardBack: (arg: any) => { arg ? arg : null },
  setFlagAvatar: (arg: any) => { arg ? arg : null },
  addEvent: (arg: any) => { arg ? arg : null },
  setEnrollmentAll: (arg: any) => { arg ? arg : null },
  setMessages: (messages: any) => { messages ? messages : null },
  setConversation: (conversation: any) => { conversation ? conversation : null },
  addToConversation: (conversation: any) => { conversation ? conversation : null },
  deleteConversation: (conversation: any) => { conversation ? conversation : null },
  setEvents: (arg: any) => { arg ? arg : null },
  setSelectedEvent: (arg: any) => { arg ? arg : null },
  setSelectedDate: (arg: any) => { arg ? arg : null },
  searchProfile: (arg: any) => { arg ? arg : null },
  updateEvent: (arg: any) => { arg ? arg : null },
  removeEvent: (arg: any) => { arg ? arg : null },
  setCoords: (coords: any) => { coords ? coords : null },
  setAddressGeo: (address: any) => { address ? address : null },
  setEnrollmentStatus(enrollmentStatus: any) {
    enrollmentStatus ? enrollmentStatus : null
  },
  signOutViewer: () => { },

};

const viewerReducer = (state = initialViewer, action: any) => {
  switch (action.type) {

    case SET_VIEWER:
      return { ...state, ...action.payload.viewer }

    case SET_FLAG_AVATAR: {
      return { ...state, flagAvatar: action.payload.flagAvatar }
    }
    case ADD_COLLABORATORS: {
      return { ...state, collaboratorpass: action.payload.collaboratorpass }
    }
    case ADD_STUDS: {
      return { ...state, studspass: action.payload.studspass }
    }
    case ADD_ORGANISATORS: {
      return { ...state, organisatorspass: action.payload.organisatospass }
    }
    case SET_COLLABORATORS: {
      return { ...state, collaborators: action.payload.collaborators }
    }
    case SET_ORGANISATORS: {
      return { ...state, organisators: action.payload.organisators }
    }
    case SET_ENROLLMENT_STATUS: return {
      ...state,
      enrollmentStatus: action.payload.enrollmentStatus
    };
    case ADD_LIIS: {
      return { ...state, liispass: action.payload.liispass }
    }
    case SET_MESSAGES: {
      return { ...state, messages: action.payload.messages }
    }
    case SET_CONVERSATION: {
      return { ...state, conversation: action.payload.conversation }
    }
    case SEARCH_PROFILE: {
      const profileFound = []
      if (state.discountProfiles.length > 0 && state.discountProfiles[0]['token'] !== '') {
        const discountFound = state.discountProfiles.filter(disc => disc['token'] === action.payload.token)
        profileFound.push(discountFound[0])
      } if (state.collaboratorProfiles.length > 0 && state.collaboratorProfiles[0]['token'] !== '') {
        const collaboratorFound = state.collaboratorProfiles.filter(disc => disc['token'] === action.payload.token)
        profileFound.push(collaboratorFound[0])
      } if (state.liismanagerProfiles.length > 0 && state.liismanagerProfiles[0]['token'] !== '') {
        const liisFound = state.liismanagerProfiles.filter(disc => disc['token'] === action.payload.token)
        profileFound.push(liisFound[0])
      } if (state.organisatorProfiles.length > 0 && state.organisatorProfiles[0]['token'] !== '') {
        const organisatorFound = state.liismanagerProfiles.filter(disc => disc['token'] === action.payload.token)
        profileFound.push(organisatorFound[0])
      } return { ...state, profilesFound: [...profileFound] }
    }
    case ADD_TO_CONVERSATION: {
      console.log(state.conversationFeed)
      console.log(action.payload.conversation)
      if (state.conversationFeed.length === 1
        && state.conversationFeed[0]['sender'] === '') {
        return {
          ...state, conversationFeed: [{
            sender:
              action.payload.conversation['sender'],
            product: action.payload.conversation['product'],
            messages: action.payload.conversation['messages']
          }]
        }
      } else {

        const product_sender_same = state.conversationFeed.filter(conv => {
          return conv.product === action.payload.conversation['product'] &&
            conv.sender === action.payload.conversation['sender']
        })
        const product_sender_different = state.conversationFeed.filter(conv => {
          return conv.product !== action.payload.conversation['product'] && conv.sender !== action.payload.conversation['sender']
        })

        console.log({ product_sender_different })
        console.log({ product_sender_same })
        if (product_sender_same.length > 0 && product_sender_different.length > 0) {
          return {
            ...state, conversationFeed: [...product_sender_different, {
              sender: action.payload.conversation['sender'],
              product: action.payload.conversation['product'],
              rep: action.payload.conversation['rep'],
              messages: [...product_sender_same[0]['messages'],
              ...action.payload.conversation['messages']]
            }]
          }
        } else {
          console.log({
            sender: action.payload.conversation['sender'],
            product: action.payload.conversation['product'],
            rep: action.payload.conversation['rep'],
            messages: [...product_sender_same[0]['messages'],
            ...action.payload.conversation['messages']]
          })
          return {
            ...state, conversationFeed: [{
              sender: action.payload.conversation['sender'],
              product: action.payload.conversation['product'],
              rep: action.payload.conversation['rep'],
              messages: [...product_sender_same[0]['messages'],
              ...action.payload.conversation['messages']]
            }]
          }
        }

      }
    }

    case DELETE_CONVERSATION: {
      console.log(state.conversationFeed)
      if (state.conversationFeed.length === 1 && state.conversationFeed[0]['sender'] === '') {
        return state
      } else if (Array.isArray(state.conversationFeed) &&
        state.conversationFeed[0]['sender']
        !== '' && state.conversationFeed[0]['product'] !== '') {

        const newConversationFeeed = state.conversationFeed.filter(conv => {
          return conv.product !== action.payload.conversation['product']
            && conv.sender !== action.payload.conversation['sender']
        })
        return {
          ...state, conversationFeed: [...newConversationFeeed]
        }
      } else { return state }
    }

    case SET_CARD_BACK: {
      return { ...state, cardBack: action.payload.cardBack }
    }
    case ADD_DISCOUNTS: {
      if (state.discountspass[0].pass === null) {

        return { ...state, discountspass: [action.payload.discountspass] }
      } else return { ...state, discountspass: [...state.discountspass, action.payload.discountspass] }
    }
    case ADD_EVENT: {
      console.log(action.payload.event)
      console.log(state.events)
      if (state.events && state.events.length > 0 && state?.events[0].id === null) {
        return { ...state, events: [action.payload.event] }
      } else {
        const allEvents = state.events ? [...state.events, action.payload.event] : [action.payload.event]
        return { ...state, events: allEvents }
      }
    }
    case SET_ENROLLMENT_ALL: {
      if (state?.enrollmentAll[0]['price'] === null) {
        return { ...state, enrollmentAll: [action.payload.enrollmentAll] }
      } else return { ...state, enrollmentAll: [...state.enrollmentAll, action.payload.enrollmentAll] }
    }
    case REMOVE_EVENT: {
      return {
        ...state, events: state.events.filter(ev => ev.id !==
          action.payload.id)
      }
    }
    case UPDATE_EVENT: {
      const differentEvent = state.events.filter(ev => {
        return (ev.id !== null && ev.id !== action.payload?.event?.id)
      })
      console.log({ differentEvent })
      if (differentEvent.length > 0) {
        return { ...state, events: [...differentEvent, action.payload.event] }
      } else {
        return { ...state, events: [action.payload.event] }
      }
    }

    case SET_EVENTS: {
      return { ...state, events: action.payload.events }
    }
    case SET_SELECTED_EVENT: {
      return { ...state, selectedEvent: action.payload.selectedEvent }
    }
    case SET_SELECTED_DATE: {
      return { ...state, selectedDate: action.payload.selectedDate }
    }
    case SET_ROLE: {
      return { ...state, role: action.payload.role }
    }
    case SET_VIEWER_NULL:
      return { ...state, ...initialViewer }
    case SET_COORDS:
      return { ...state, coords: action.payload.coords }
    case SET_ADDRESS_GEO:
      return { ...state, addressGeo: action.payload.addressGeo }

    default: {
      return state
    }
  }
}

export const viewerContext = createContext(initialState);

export function ViewerProvider({ children }: { children: React.ReactNode }): ReactElement {
  const [state, dispatch] = useReducer(viewerReducer, initialViewer)


  const setViewer = (viewer: any) => {
    dispatch({
      type: SET_VIEWER, payload: { viewer }
    })
  }
  const setCardBack = (cardBack: any) => {
    dispatch({
      type: SET_CARD_BACK, payload: { cardBack }
    })
  }

  const addDiscounts = (discountspass: any) => {
    dispatch({
      type: ADD_DISCOUNTS, payload: { discountspass }
    })
  }

  const addCollaborators = (collaboratorpass: any) => {
    dispatch({
      type: ADD_COLLABORATORS, payload: { collaboratorpass }
    })
  }
  const setCollaborators = (collaborators: any) => {
    dispatch({
      type: SET_COLLABORATORS, payload: { collaborators }
    })
  }
  const addOrganisators = (organisatorpass: any) => {
    dispatch({
      type: ADD_ORGANISATORS, payload: { organisatorpass }
    })
  }
  const setOrganisators = (collaborators: any) => {
    dispatch({
      type: SET_ORGANISATORS, payload: { collaborators }
    })
  }

  const addLiis = (liispass: any) => {
    console.log({ liispass })
    dispatch({
      type: ADD_LIIS, payload: { liispass }
    })
  }
  const addStuds = (studpass: any) => {
    dispatch({
      type: ADD_STUDS, payload: { studpass }
    })
  }
  const addEvent = (event: any) => {
    dispatch({
      type: ADD_EVENT, payload: { event }
    })
  }
  const setEnrollmentAll = (enrollmentAll: any) => {
    console.log({ enrollmentAll })
    dispatch({
      type: SET_ENROLLMENT_ALL, payload: { enrollmentAll }
    })
  }
  const setSelectedEvent = (selectedEvent: any) => {
    console.log({
      selectedEvent
    })
    dispatch({
      type: SET_SELECTED_EVENT, payload: { selectedEvent }
    })
  }
  const setSelectedDate = (selectedDate: any) => {
    console.log({
      selectedDate
    })
    dispatch({
      type: SET_SELECTED_DATE, payload: { selectedDate }
    })
  }
  const updateEvent = (event: any) => {
    dispatch({ type: UPDATE_EVENT, payload: { event } })
  }
  const removeEvent = (id: { id: string }) => {
    console.log({ id })
    dispatch({
      type: REMOVE_EVENT, payload: { id }
    })
  }
  const setEvents = (events: any) => {
    console.log({ events })
    dispatch({
      type: SET_EVENTS, payload: { events }
    })
  }
  const setEnrollmentStatus = (enrollmentStatus: { enrollmentStatus: [string] }) => {
    console.log({ enrollmentStatus })
    dispatch({ type: SET_ENROLLMENT_STATUS, payload: { enrollmentStatus } })
  }

  const setFlagAvatar = (flagAvatar: any) => {
    dispatch({
      type: SET_FLAG_AVATAR, payload: { flagAvatar }
    })
  }
  const setConversation = (conversation: any) => {
    dispatch({
      type: SET_CONVERSATION, payload: { conversation }
    })
  }
  const addToConversation = (conversation: any) => {

    dispatch({
      type: ADD_TO_CONVERSATION, payload: { conversation }
    })
  }
  const deleteConversation = (conversation: any) => {
    console.log({ conversation })
    dispatch({
      type: DELETE_CONVERSATION, payload: { conversation }
    })
  }
  const setRole = (role: [string]) => {
    console.log({ role })
    dispatch({
      type: SET_ROLE, payload: { role }
    })
  }

  function signOutViewer() {
    dispatch({ type: SET_VIEWER_NULL });
  }
  function setMessages(messages: any) {
    dispatch({ type: SET_MESSAGES, payload: { messages } });
  }
  function setCoords(coords: any) {
    dispatch({ type: SET_COORDS, payload: { coords } })
  }
  function setAddressGeo(addressGeo: any) {
    dispatch({ type: SET_ADDRESS_GEO, payload: { addressGeo } })
  }



  return <viewerContext.Provider value={{

    state, setViewer, addCollaborators, setCollaborators, addLiis, addDiscounts,
    addOrganisators, addStuds, setOrganisators,
    setFlagAvatar, setEvents, addEvent, setEnrollmentAll,
    setCardBack, addToConversation, deleteConversation,
    setMessages, setConversation, setSelectedEvent, setSelectedDate, updateEvent, setEnrollmentStatus,
    removeEvent, setRole, setAddressGeo, setCoords,
    signOutViewer,

  }}>{children}</viewerContext.Provider>;
}

