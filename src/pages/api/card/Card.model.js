import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const cardSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, ' You must give a title'],
    },
    slugCard: {
      type: String,
      required: [true, ' You must give a title For tablet'],
    },
    tags: [String],
    soura: {
      type: Number,
      required: [true, ' You must give a soura for tablet'],
      min: 1,
      max: 114,
    },
    words: [String],
    cardStatus: {
      type: String,
      required: true,
      enum: ['SOBH', 'DOHR', 'ASR', 'MAGH', 'ICHA'],
      default: 'SOBH',
    },
    viewers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Viewer',
        required: false,
      },
    ],
    description: String,
    rate: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

cardSchema.index({ slugCard: 1 }, { unique: true });

export default mongoose.models.Card || mongoose.model('Card', cardSchema);
