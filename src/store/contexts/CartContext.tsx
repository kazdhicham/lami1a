/* eslint-disable @typescript-eslint/no-empty-function */

import React, { createContext, useReducer } from 'react'

import {
    ADD_TO_CART, UPDATE_CART, REMOVE_FROM_CART,
    RESET_CART, CHECKOUT, SET_DISCOUNT,
    HAS_ERROR, REMOVE_PRODUCT, UPDATE_PRODUCT, SET_STEP, SET_CART_PRODUCTS,
    SET_BACK_STEP, SET_BILLING_ADDRESS, RESET_BILLING_ADDRESS, SET_SHIPPING_CHARGE,
    SET_PAYMENT_CART,
    SET_PAYMENT_METHODE, SET_OPEN_MENU, SET_TITLE_QUANTITY,
    SET_DELIVERY, SET_COMPLETE, SET_SUBTOTAL,
    SET_TOTAL, SET_TOTAL_QUANTITY, SET_OPEN,
    SET_EDIT, SET_DELIVERY_DATE,

} from '@/store/constants/'

const initialState = {
    error: false,
    delivery: 'free',
    discount: 0,
    openmenu: false,
    totalQuantity: 0,
    cartProducts: [{
        title: '', titleSlug: '', price: 0, promo: 0, image: '', productStatus: ['FRO'],
        quantity: 0, stock: 0
    }],
    titleQuantity: [{
        title: '', quantity: 0
    }],
    subtotal: 0,
    total: 0,
    step: 0,
    status: 'FRO',
    shipping: 0,
    payment: 'cart',
    open: false,
    edit: false,
    deliveryDate: new Date(),
    complete: false,
    address: {
        name: '', destination: '', building: '', street: '',
        city: '', state: '', contact: '',
        country: '', zip: '', isdefault: true,
    },


    valid: false,
    checkoutId: 0,
}
const initialContext = {
    state: initialState,
    addToCart: (arg: unknown) => {
        console.log(arg)
    },
    removeFromCart: (arg: unknown) => {
        console.log(arg)
    },
    updateCart: (arg: unknown) => {
        console.log(arg)
    },
    resetCart: () => { },
    //SET Products
    setCartProducts(cartProducts: any) {
        cartProducts ? cartProducts : null
    },
    setSubTotal: (subTotal: number) => {
        subTotal ? subTotal : null
    },
    setTotal: (total: number) => {
        total ? total : null
    },

    setTitleQuantity: (arg: any) => {
        arg ? arg : null
    },


    setTotalQuantity: (totalQuantity: number) => {
        totalQuantity ? totalQuantity : null
    },

    checkout: (arg: any) => {
        console.log(arg)
    },

    setDiscount: ({ discount }: { discount: number }) => {
        discount ? discount : 0;
    },
    // HAS ERROR
    hasError(error: any) {
        error ? error : false
    },
    setOpenMenu(bool: boolean) {
        bool ? bool : false
    },

    updateProduct({ titleSlug, quantity }: { titleSlug: any, quantity: number }) {
        titleSlug ? titleSlug : false
        quantity ? quantity : false
    },

    // SET STEP
    setStep(step: number) {
        step ? step : 0
    },
    setOpen(open: boolean) {
        open ? open : 0
    },
    setEdit(edit: boolean) {
        edit ? edit : 0
    },
    setDeliveryDate(date: any) {
        date ? date : 0
    },


    // SET BILLING ADDRESS
    setBillingAddress(billingAddress: any) {
        billingAddress ? billingAddress : false
        //state.checkout.billing = action.payload.billing;
    },
    resetBillingAddress() {

        //state.checkout.billing = action.payload.billing;
    },
    setComplete(complete: boolean) {
        complete ? complete : false
        //state.checkout.billing = action.payload.billing;
    },

    // SET SHIPPING CHARGE
    setShippingCharge(charge: number) {
        charge ? charge : 0
    },
    setDelivery(del: string) {
        del ? del : 0
    },
    // SET PAYMENT METHOD
    setPaymentMethod(method: string) {
        method ? method : false

    },


    setPaymentCart(cart: any) {
        cart ? cart : false
    },

}
const mapItem = (item: any, payload: any) => {
    if (item.titleSlug === payload.product.titleSlug) { return { ...item, quantity: item.quantity + 1 } }
    return item
}
const updateMapItem = (item: any, payload: any) => {
    if (item.id === payload.id) { return { ...item, quantity: payload.quantity } }
    return item
}
/* const filterItem = (item: any, product: any) => item.titleSlug !== product.titleSlug
 */
const cartReducer = (state: any = initialState, { type, payload }: { type: string, payload: any }) => {
    switch (type) {
        case ADD_TO_CART: {
            if (state?.cartProducts?.length === 1 && state?.cartProducts[0]["quantity"] === 0) {
                state?.cartProducts.shift()

            }
            const itemFound = state.cartProducts && state.cartProducts > 0 ? state?.cartProducts.find((item: any) => item.titleSlug === payload?.product.titleSlug) : false

            if (itemFound) {
                return { ...state, cartProducts: state?.cartProducts?.map((item: any) => mapItem(item, payload)) }
            } else {

                const newCartProducts = [...state.cartProducts]
                return { ...state, cartProducts: [...newCartProducts, { ...payload.product, quantity: 1 }] }
            }
        }

        case REMOVE_FROM_CART: return { ...state, cartProducts: state?.cartProducts?.filter((item: any) => item.titleSlug !== payload.titleSlug) };
        case UPDATE_CART: return {
            ...state,
            items: state?.items?.map((item: any) => updateMapItem(item, payload))
        };

        case RESET_CART: return { ...initialState };
        case RESET_BILLING_ADDRESS: return {
            ...state,
            address: initialState.address

        };
        case SET_CART_PRODUCTS: return {
            ...state,
            cartProducts: payload.cartProducts
        };
        case SET_DELIVERY: return { ...state, delivery: payload.delivery }


        case SET_DISCOUNT:
            return { ...state, discount: payload.discount, total: state.total * (1 - payload.discount / 100) }

        case SET_OPEN:
            return { ...state, open: payload.open }

        case SET_EDIT:
            return { ...state, edit: payload.edit }

        case SET_DELIVERY_DATE:
            return { ...state, deliveryDate: payload.date }

        case SET_SUBTOTAL: {

            return {
                ...state,
                subtotal: payload.subtotal
            }
        }
        case SET_TOTAL_QUANTITY: {
            return {
                ...state,
                totalQuantity: payload.totalQuantity
            }
        }
        case SET_TITLE_QUANTITY: {
            return {
                ...state,
                titleQuantity: payload.titleQuantity
            }
        }
        case SET_TOTAL: return { ...state, total: payload.total }

        case CHECKOUT: return { delivery: 'standard', items: [] }

        case HAS_ERROR: return {
            ...state,
        }
        case REMOVE_PRODUCT: return {
            ...state,
        }
        case SET_COMPLETE: return {
            ...state,
            complete: payload.complete
        }
        case UPDATE_PRODUCT: {
            const newProducts = state.cartProducts.map((prod: any) => {
                if (prod.titleSlug === payload.titleSlug) {
                    prod.quantity = payload.quantity
                }
                return prod
            })

            return {
                ...state,
                cartProducts: [...newProducts]
            }
        }
        case SET_STEP: return {
            ...state,
            step: payload.step
        }

        case SET_BACK_STEP: return {
            ...state,
            step: state.step - 1
        }
        case SET_BILLING_ADDRESS: return {
            ...state,

            address: payload.address

        }
        case SET_SHIPPING_CHARGE: return {
            ...state, shipping: payload.charge


        }
        case SET_PAYMENT_METHODE: return {
            ...state,
            payment: payload.method
        }


        case SET_PAYMENT_CART: return {
            ...state, cart: payload.cart
        }
        case RESET_CART: return {
            ...state, cart: payload.cart
        }

        case SET_OPEN_MENU:
            return {
                ...state
            }
        default: return state;
    }
}

export const CartContext = createContext(initialContext)

export function CartProvider({ children }:
    { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    const addToCart = (product: any) => {
        dispatch({ type: ADD_TO_CART, payload: { product } })
    }
    const removeFromCart = (titleSlug: any) => {
        dispatch({ type: REMOVE_FROM_CART, payload: { titleSlug } })
    }
    const updateCart = (product: any) => {
        dispatch({ type: UPDATE_CART, payload: { product } })
    }
    const setDiscount = ({ discount }: { discount: number }) => {

        dispatch({ type: SET_DISCOUNT, payload: { discount } })
    }

    const setOpen = (open: boolean) => {
        dispatch({ type: SET_OPEN, payload: { open } })

    }

    const setEdit = (edit: boolean) => {
        dispatch({ type: SET_EDIT, payload: { edit } })
    }
    const setDeliveryDate = (date: any) => {
        dispatch({ type: SET_DELIVERY_DATE, payload: { date } })
    }

    const setSubTotal = (subtotal: number) => {

        dispatch({ type: SET_SUBTOTAL, payload: { subtotal } })
    }
    const setTotal = (total: number) => {
        dispatch({ type: SET_TOTAL, payload: { total } })
    }
    const setTitleQuantity = (titleQuantity: number) => {
        dispatch({ type: SET_TITLE_QUANTITY, payload: { titleQuantity } })
    }
    const setTotalQuantity = (totalQuantity: number) => {
        dispatch({ type: SET_TOTAL_QUANTITY, payload: { totalQuantity } })
    }

    const checkout = () => {
        dispatch({ type: CHECKOUT, payload: null })
    }
    const hasError = (error: any) => {
        dispatch({ type: HAS_ERROR, payload: { error } })
    }
    const setCartProducts = (cartProducts: any) => {
        dispatch({ type: SET_CART_PRODUCTS, payload: { cartProducts } })
    }

    const updateProduct = ({ titleSlug, quantity }: any) => {
        console.log({ titleSlug, quantity })
        //const { titleSlug, quantity } 
        dispatch({ type: UPDATE_PRODUCT, payload: { titleSlug, quantity } })
    }
    const setStep = (step: number) => {
        dispatch({ type: SET_STEP, payload: { step } })
    }

    const setBillingAddress = (address: any) => {

        dispatch({ type: SET_BILLING_ADDRESS, payload: { address } })
    }
    const resetBillingAddress = () => {

        dispatch({ type: RESET_BILLING_ADDRESS, payload: {} })
    }

    const setDelivery = (delivery: string) => {
        dispatch({ type: SET_DELIVERY, payload: { delivery } })
    }
    const setShippingCharge = (charge: number) => {
        dispatch({ type: SET_SHIPPING_CHARGE, payload: { charge } })
    }
    const setPaymentMethod = (method: string) => {
        dispatch({ type: SET_PAYMENT_METHODE, payload: { method } })
    }

    const setPaymentCart = (cart: any) => {

        console.log({ cart })
        dispatch({ type: SET_PAYMENT_CART, payload: { cart } })
    }
    const setComplete = (complete: boolean) => {
        dispatch({ type: SET_COMPLETE, payload: { complete } })
    }
    const resetCart = () => {
        dispatch({ type: RESET_CART, payload: null })
    }
    const setOpenMenu = (bool: boolean) => {
        dispatch({ type: SET_OPEN_MENU, payload: bool })
    }

    /* useEffect(() => {
        console.log({ state: state })
    }, [state])
 */
    return <CartContext.Provider value={{
        state, addToCart, removeFromCart, resetCart, updateCart, setCartProducts,
        setDiscount, setSubTotal, setTotal, checkout, hasError, setDelivery,
        setTitleQuantity,
        updateProduct, setStep, setBillingAddress, resetBillingAddress, setTotalQuantity,
        setShippingCharge, setPaymentMethod, setPaymentCart, setOpen, setEdit,
        setComplete, setOpenMenu, setDeliveryDate

    }}>{children}</CartContext.Provider>;
}
