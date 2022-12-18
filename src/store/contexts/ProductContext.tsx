import React, { createContext, useReducer } from 'react'
import { ProductStatus, ProductTypeData } from '@/api/product/product.types'
import {
  SET_PAGE_INDEX,

  SET_SELF_PRODUCTS, SET_PRODUCTS,
  SET_PRODUCT, SET_SELECTED,
  ADD_SELF_PRODUCT, SET_OPEN_MENU,
  SET_ALL_PRODUCTS, SET_PROMOTE, SET_PRODUCT_STATUS,

} from "@/store/constants";


const initialState = {
  titleSlug: '',
  pageIndex: 0,
  products: [],
  page: 1,
  productStatus: [''],
  selected: [''],
  allProducts: [],
  selfProducts: [{
    title: '', titleSlug: '',
    description: '', price: 0,
    offerPrice: 0,
    author: '', image: { url: '', public_id: '' },
    productStatus: ProductStatus.FRO,
    selection: '',
    stock: 100,
    promo: 0,
    rate: 5,
    quantity: 0,
    createdAt: ''
  }
  ],

  rate: 0,
  promote: ['']
};
const initialContext = {
  state: initialState,

  setAllProducts: (products: any) => { products ? products : null },
  setProducts: (products: any) => { products ? products : null },
  setPageIndex: (index: any) => { index ? index : null },
  setSelfProducts: (products: any) => { products ? products : null },
  setSelected: (products: any) => { products ? products : null },
  setProductStatus: (productStatus: any) => { productStatus ? productStatus : null },

  addSelfProduct: (product: any) => { product ? product : null },

  setPromote: (values: any) => { values ? values : null },
  setOpenMenu: (bool: boolean) => { bool ? bool : false },
}
const productsReducer = (state = initialState, { type, payload }:
  { type: string, payload: any }) => {
  switch (type) {

    case SET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: payload.products,
      };

    case SET_PRODUCTS:
      return {
        ...state,
        products: payload.products,
      };

    case SET_SELECTED:
      return {
        ...state,
        selected: payload.products,
      };
    case SET_PRODUCT_STATUS:
      return {
        ...state,
        productStatus: payload.productStatus,
      };

    case SET_PROMOTE:
      return {
        ...state,
        promote: [...state.promote, payload.login],
      };

    case SET_PRODUCT:
      return {
        ...state,

        titleSlug: payload.titleSlug,
      };
    case SET_SELF_PRODUCTS:
      return {
        ...state,
        selfProducts: payload.products,
      };
    case ADD_SELF_PRODUCT: {
      console.log(state.selfProducts)
      console.log(payload.product)
      return {
        ...state,
        selfProducts: [...state.selfProducts, payload.product],
      };
    }
    case SET_PAGE_INDEX:
      return {
        ...state,
        pageIndex: payload.index,
      };

    case SET_OPEN_MENU:
      return {
        ...state,
        openMenu: payload.openMenu,
      };

    default:
      return state;
  }
};


export const ProductContext = createContext(initialContext);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(productsReducer, initialState)

  const setAllProducts = (products: ProductTypeData[]) => {
    console.log({ products })
    dispatch({ type: SET_ALL_PRODUCTS, payload: { products } })
  }

  const setProducts = (products: ProductTypeData[]) => {
    console.log({ products })
    dispatch({ type: SET_PRODUCTS, payload: { products } })
  }
  const setProductStatus = (productStatus: ProductStatus[]) => {
    console.log({ productStatus })
    dispatch({ type: SET_PRODUCT_STATUS, payload: { productStatus } })

  }
  const setSelected = (selected: [string]) => {
    console.log({ selected })
    dispatch({ type: SET_SELECTED, payload: { selected } })
  }


  const setPageIndex = (index: any) => {
    dispatch({ type: SET_PAGE_INDEX, payload: { index } })
  }

  const setSelfProducts = (products: Array<ProductTypeData>) => {
    console.log({ setSelfProducts: products })
    dispatch({ type: SET_SELF_PRODUCTS, payload: { products } })
  }
  const addSelfProduct = (product: string) => {
    console.log({ addSelfProducts: product })
    dispatch({ type: ADD_SELF_PRODUCT, payload: { product } })
  }

  const setOpenMenu = (bool: boolean) => {
    console.log({ setOpenMenu: bool })
    dispatch({ type: SET_OPEN_MENU, payload: { bool } })
  }

  const setPromote = ({ login }: { login: string }) => {
    console.log({ login })
    dispatch({ type: SET_PROMOTE, payload: { login } })
  }

  return (
    <ProductContext.Provider value={{

      state, setProducts, setSelected, setProductStatus,
      setAllProducts, addSelfProduct, setOpenMenu, setPromote,
      setPageIndex, setSelfProducts

    }}> {children}</ProductContext.Provider>
  )

}
