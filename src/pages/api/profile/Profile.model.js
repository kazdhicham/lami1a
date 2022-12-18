import mongoose from 'mongoose';

const Schema = mongoose.Schema;
//const geocoder = require('@/lib/nodeGeoCoder')

const profileSchema = Schema(
  {
    login: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
    },

    address: {
      name: String,
      destination: String,
      building: String,
      street: String,
      city: String,
      state: String,
      country: String,
      contact: String,
      zip: String,
      isdefault: Boolean,
    },
    role: [String],
    productsPromoted: [String],

    messages: [
      {
        date: String,
        token: String,
        sender: String,
        product: String,
        rec: String,
        content: String,
      },
    ],
    conversationFeed: [
      {
        sender: String,
        product: String,
        messages: [
          {
            date: String,
            rec: String,
            content: String,
          },
        ],
      },
    ],

    orders: [
      {
        rec: String,
        product: String,
        sender: String,
        content: String,
        date: String,
      },
    ],
    enrollments: {
      title: String,
      viewer: String,
      price: Number,
      dateStart: String,
      dateEnd: String,
    },
    affiliate: {
      token: String,
      affiliator: String,
    },
  },
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    timestamps: true,
  }
);
/* profilSchema.index({email:1},{unique: true})
 */
// reset Password
profileSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  // hash and set to resetPasswordToken
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  //console.log(new Date(Date.now()).getHours());
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};
// Show all rewards for the profil

export default mongoose.models
  ? mongoose.models.Profile || mongoose.model('Profile', profileSchema)
  : mongoose.model('Profile', profileSchema);
