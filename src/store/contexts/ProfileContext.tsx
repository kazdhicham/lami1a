//import viewers from '@/pages/domain/viewers';
import React, { createContext, useReducer } from 'react';
import {
  SET_PROFILE, SET_ROLE, SET_PROFILE_AUTH, SET_PROFILE_NULL, REMOVE_ENROLLMENT_FROM_CART,
  SET_PROFILE_ADDRESS, SET_ACCESS_RECAPTCHA, SET_TOKEN,
  ADD_ENROLLMENT_TO_CART, SET_AFFILIATOR, ADD_FRIEND_REQUEST, FILTER_FRIEND_REQUESTS
} from '@/store/constants'
import { ProfileTypeData, Address } from '@/api/profile/profile.types';
const initialProfile = {
  _id: null,
  login: '',
  email: 'kazdhicham@gmail.com',
  isLoggedIn: false,
  role: ['USER'],
  phone: '',
  isAdmin: false,
  friendRequests: [{ token: '', profileEmail: '', profileId: '', flag: '' }],
  friendFound: { token: '', profileEmail: '', profileId: '', flag: '' },
  affiliate: {
    token: '',
    affiliator: ''
  },
  profiles: [{ login: '', token: '' }],
  accessRecaptcha: false,
  cartEnrollments: [{
    title: '', titleSlug: '',
    description: '', price: 0,
    viewer: '', promo: 0,
    startDate: new Date(),
    endDate: new Date(),
  }],
  token: '',
  productsPromoted: [''],
  products: [],
  address: {
    name: '',
    destination: '',
    building: '',
    street: '',
    state: '',
    contact: '',
    isdefault: false,
    city: '',
    country: '',
    zip: '',
  },
  messages: [{ sender: 'qq1', content: 'aide achat' }],

}
const initialState = {
  state: initialProfile,
  setProfileAuth: (arg: any) => { arg ? arg : null },
  setProfile: (arg: any) => { arg ? arg : null },
  setToken: (arg: any) => { arg ? arg : null },
  setAffiliator: (arg: any) => { arg ? arg : null },
  setProfileAddress: (arg: any) => { arg ? arg : null },
  setAccessRecaptcha: (arg: any) => { arg ? arg : null },
  setRole: (arg: any) => { arg ? arg : null },
  addEnrollmentToCart: (arg: any) => {
    arg ? arg : false
  },
  addFriendRequest: (arg: any) => {
    arg ? arg : false
  },
  filterFriendRequests: (arg: any) => {
    arg ? arg : false
  },
  removeEnrollmentFromCart: (arg: any) => {
    arg ? arg : false
  },
  signOut: () => { true },
};

const profileReducer = (state = initialProfile, action: any) => {
  switch (action.type) {

    case SET_PROFILE_AUTH: {
      return { ...state, ...action.payload.profile }
    }
    case SET_PROFILE:
      return { ...state, ...action.payload.profile }
    case SET_PROFILE_ADDRESS:
      return { ...state, address: action.payload.address }
    case SET_ROLE: {
      return { ...state, role: [...action.payload.role] }
    }
    case REMOVE_ENROLLMENT_FROM_CART: return { ...state, cartEnrollments: state?.cartEnrollments?.filter((item: any) => item.titleSlug !== action.payload.titleSlug) };
    case ADD_ENROLLMENT_TO_CART: {
      if (state?.cartEnrollments.length === 1 && state?.cartEnrollments[0]["title"] === '') {
        state?.cartEnrollments.shift()
      }
      const itemFound = state?.cartEnrollments.find((item: any) => item?.titleSlug === action.payload?.product?.titleSlug)
      if (itemFound) {
        return state
      }
      return { ...state, cartEnrollments: [...state?.cartEnrollments, action.payload.enrollment] }
    }
    case SET_AFFILIATOR: {
      return { ...state, affiliate: { ...state.affiliate, affiliator: action.payload.affiliator } }
    }
    case ADD_FRIEND_REQUEST: {
      return { ...state, friendRequests: [...state.friendRequests, action.payload.request] }
    }
    case FILTER_FRIEND_REQUESTS: {
      const friendFound = state.friendRequests.filter(req => req.profileId === action.payload.profile)
      if (friendFound && friendFound.length > 0) {

        return { ...state, friendFound: friendFound }
      }
    }
    case SET_TOKEN: {

      return { ...state, affiliate: { ...state.affiliate, token: action.payload.token } }
    }
    case SET_ACCESS_RECAPTCHA: {
      return { ...state, accessRecaptcha: action.payload.accessRecaptcha }
    }
    case SET_PROFILE_NULL:
      return { ...initialProfile }
    default: {
      return state
    }
  }
}

export const profileContext = createContext(initialState);
export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(profileReducer, initialProfile)
  // const [profile, _setProfile] = useState<ProfileTypeData | any>(initialProfile);

  const setProfileAuth = ({ id, email, token }: { id: string, email: string, token: string }) => {

    dispatch({ type: SET_PROFILE_AUTH, payload: { profile: { _id: id, email, token } } })
  }
  const setProfile = (profile: ProfileTypeData) => {
    dispatch({
      type: SET_PROFILE, payload: { profile }
    })
  }
  const setAccessRecaptcha = (accessRecaptcha: boolean) => {
    dispatch({
      type: SET_ACCESS_RECAPTCHA, payload: { accessRecaptcha }
    })
  }
  const setProfileAddress = (address: Address) => {
    console.log({ address })
    dispatch({
      type: SET_PROFILE_ADDRESS, payload: { address }
    })
  }
  const setRole = (role: [string]) => {
    dispatch({
      type: SET_ROLE, payload: { role }
    })
  }
  const setToken = (token: string) => {
    console.log({ token })
    dispatch({
      type: SET_TOKEN, payload: { token }
    })
  }
  const setAffiliator = (affiliator: string) => {
    console.log({ affiliator })
    dispatch({
      type: SET_AFFILIATOR, payload: { affiliator }
    })
  }

  const addEnrollmentToCart = (enrollment: any) => {
    console.log(enrollment)
    dispatch({ type: ADD_ENROLLMENT_TO_CART, payload: { enrollment } })
  }
  const addFriendRequest = (request: any) => {
    console.log(request)
    dispatch({ type: ADD_FRIEND_REQUEST, payload: { request } })
  }
  const filterFriendRequests = (profile: any) => {
    console.log(profile)
    dispatch({ type: FILTER_FRIEND_REQUESTS, payload: { profile } })
  }
  const removeEnrollmentFromCart = (titleSlug: any) => {
    dispatch({ type: REMOVE_ENROLLMENT_FROM_CART, payload: { titleSlug } })
  }
  function signOut() {
    dispatch({ type: SET_PROFILE_NULL });
  }

  return <profileContext.Provider value={{
    state, setProfile, setRole, setProfileAddress, setAffiliator, setToken, addFriendRequest, filterFriendRequests,
    setAccessRecaptcha, setProfileAuth, removeEnrollmentFromCart, addEnrollmentToCart, signOut
  }}>{children}</profileContext.Provider>;
}

