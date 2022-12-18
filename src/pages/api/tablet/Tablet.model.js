import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const tabletSchema = Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, ' You must give a title'],
    },
    titleSlug: {
      type: String,
    },
    description: String,
    tags: [String],
    souras: [Number],
    words: [String],
    
    cards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Card',
      },
    ],

    tabletstatus: {
      type: String,
      required: true,
      enum: ['SOBH','DOHR','ASR','MAGH','ICHA'],
      default: 'SOBH',
    },
    level: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    liism: {
      type: Number,
      default: 0,
    },
    bookings:[
      {
        type: Schema.Types.ObjectId,
        ref: 'Booking',
      },
    ],
    colls: [
      {
        type: String,
        
      },
    ],
    viewers:[
      {
        type: String,
        
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

tabletSchema.index({ title: 1 }, { unique: true });
/**
 * comment
 */

export default mongoose.models.Tablet || mongoose.model('Tablet', tabletSchema);
