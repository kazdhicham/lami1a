import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const selectionSchema = Schema(
  {
    title: {
      type: String,
      lowercase: true,
      trim: true,
    },
    titleSlug: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },

    promote: [
      {
        type: String,
        trim: true,
      },
    ],
    author: {
      type: String,
      required: true,
    },

    products: {
      type: [String],
      required: false,
    },
    image: {
      public_id: String,
      url: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },

    selectionStatus: [String],
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

export default mongoose.models
  ? mongoose.models.Selection || mongoose.model('Selection', selectionSchema)
  : mongoose.model('Selection', selectionSchema);
