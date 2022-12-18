import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// abonnement : free/ org
const ayahSchema = Schema(
  {
    number: Number,
    text: String,
    numberInSurah: Number,
    juz: Number,
  },

  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
export default mongoose.models.Ayah || mongoose.model('Ayah', ayahSchema);
