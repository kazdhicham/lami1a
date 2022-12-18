import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cartSchema = Schema(
  {
    
    discount: Number,
    totalQuantity: Number,
    products:[ String],
    subtotal: Number,
    total:  Number,
    shipping: Number,
    payment:  String,
    complete:Boolean,
   address:{
      name: String,
      destination: String,
      building: String,
      street: String,
      city: String,
      state: String,
      country: String,
      contact:String,
     isdefault:Boolean,
   },
   author_stripe_account_id:String,
   delivery:{
    startDate: String,
    endDate: String
   },
     login:String,
     email:String,
     valid:Boolean,
     checkoutId:String ,
  },
   {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    timestamps: true,
  }
);

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);
