export const cartDefs = `
type Cart {
    _id: ID!
    delivery:DeliveryType
    discount:Int
    totalQuantity:Int
    products:[Product]
    subtotal:Int
    total:Int
    shipping:Int
    payment:String
    complete: Boolean
    address:CartAddress
     login:String
     email:String
     valid:Boolean
     checkoutId: String
}
 
type DeliveryType {
        startDate: String
        endDate: String
    }

input DeliveryDateInput {
        startDate: String
        endDate: String
    }
type CartAddress {
    name: String
    destination: String
    building: String
    street: String
    city: String
    state: String
    country: String
    contact:String
    zip: String
    isdefault: Boolean
   
}
input CartAddressInput {
    name: String
    destination: String
    building: String
    street: String
    city: String
    state: String
    country: String
    contact:String
    zip: String
    isdefault:Boolean
  
    
}

input CartInput {
    products:[String]
    subtotal:Int
    total:Int
    discount:Int
    shipping:Int
    address:CartAddressInput
    payment:String
    totalQuantity:String
    delivery:DeliveryDateInput
    viewerLogin:String
    viewerEmail:String
    checkoutId: String
}
input CartProductsInput {
    title: String
     titleSlug:String 
      description:String
      image:String
      promo:Int
      price:Int 
      quantity:Int 
      stock:Int 
      
      
}
input CheckoutInput {
    cartProducts:[CartProductsInput]
    total:Int
    quantity: Int
    discount:Int
    shipping:Int
    author_stripe_account_id: String
    profileId:String
    delivery:DeliveryDateInput
    login:String
    email:String
    address:CartAddressInput
    
  }
  input CheckoutOrganisatorInput {
    cartProducts:[CartProductsInput]
    total:Int
    subtotal:Int
    totalQuantity: Int
    discount:Int
    shipping:Int
    address:CartAddressInput
    payment:String
    delivery:DeliveryDateInput
    login:String
    email:String
    profileId:String
    checkoutId: String
    author_stripe_account_id: String
  }

type CheckoutOutput {
    url: String
    sessionId:String
}
type Query {
    cartsViewer(viewer:String): [Cart]
    carts(input:String): [Cart]
    cart(id: String):Cart!
}

type Mutation {
    addCart(input: CartInput):Cart
    validateCart(id: String):Cart
    removeCart(id: String):Cart
    checkoutSession(input: CheckoutInput): CheckoutOutput
    checkoutSessionOrganisator(input: CheckoutInput): CheckoutOutput
}
`
