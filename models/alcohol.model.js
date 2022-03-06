import mongoose from 'mongoose';
const alcoholSchema = new mongoose.Schema({
  alcohol: {
    type: String,
    required: true
  },
  drinks: {
    type: Array,
    required: true
  }
});
export default mongoose.models.alcohol || mongoose.model('alcohol', alcoholSchema);