import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// abonnement : free/ org
const coranSchema = Schema(
  {
    id: Number,
    englishName: String,
    name: String,
    ayahs: [{
    number: Number,
    text: String,
    numberInSurah: Number,
    juz: Number,
    }],
  },

  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
export default mongoose.models.Coran || mongoose.model('Coran', coranSchema);
