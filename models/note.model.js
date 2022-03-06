import mongoose from 'mongoose';
const noteSchema = new mongoose.Schema({
  author: {
    required: true,
    type: String
  },
  note: {
      required: true,
      type: String
  },
  response: String
}, { timestamps: true });
export default mongoose.models.note || mongoose.model('note', noteSchema);