import mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
const Schema = mongoose.Schema;
//const geocoder = require('@/lib/nodeGeoCoder')

const profileSchema = Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, 'You must give a login '],
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'You must give a password'],
      minlength: [4, 'you must give at least 4 characters password length'],
      select: false,
    },
    organisation: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: {
        values: ['ADMIN', 'ORG', 'FAM', 'USER'],
        message: 'please select a role for your pofil',
      },
      default: 'USER',
    },
    avatar: {
      type: String,
      trim: true,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Card',
        required: false,
      },
    ],
    tablets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tablet',
        required: false,
      },
    ],
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
profileSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  return await bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return err;
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      this.password = hash;
      next();
    });
  });
});

profileSchema.methods.checkPassword = function (password) {
  const passwordHash = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }
      resolve(same);
    });
  });
};
// reset Password
profileSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  // hash and set to resetPasswordToken
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log(new Date(Date.now()).getHours());
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};
// Show all rewards for the profil
profileSchema.virtual('rewards', {
  ref: 'Reward',
  localField: '_id',
  foreignField: 'createdBy',
  justOne: false,
});
/**
 * comment
 */

export default mongoose.models
  ? mongoose.models.Profile || mongoose.model('Profile', profileSchema)
  : mongoose.model('Profile', profileSchema);
