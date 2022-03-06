import mongoose from 'mongoose';
const suggestionSchema = new mongoose.Schema({
  author: {
    required: true,
    type: String
  },
  suggestion: {
      required: true,
      type: String
  },
  response: String
}, { timestamps: true });
export default mongoose.models.suggestion || mongoose.model('suggestion', suggestionSchema);