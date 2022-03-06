import { getSession } from 'next-auth/client';
import connectDB from '../../../config/connectDB';
import suggestionModel from '../../../models/suggestion.model';
connectDB();
const handler = (req, res) => {
  switch (req.method) {
    case 'DELETE':
      deleteSuggestion(req, res);
      break;
    case 'GET':
      getSuggestions(req, res);
      break;
    case 'POST':
      postSuggestion(req, res);
      break;
    case 'PUT':
      putResponse(req, res);
      break;
    default: return null;
  }
}
const deleteSuggestion = async (req, res) => {
  const { text } = req.body;
  try {
    const session = await getSession({ req });
    if (!session) return res.status(400).json({ message: 'Invalid authentication' });
    await suggestionModel.findOneAndDelete({ suggestion: text });
    return res.status(200).json({ success: true });
  } catch (err) { return res.status(500).json({ message: err.message }) }
}
const getSuggestions = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session) return res.status(400).json({ message: 'Invalid authentication' });
    const data = await suggestionModel.find({});
    return res.status(200).json({ data: data });
  } catch (err) { return res.status(500).json({ message: err.message }) }
}
const postSuggestion = async (req, res) => {
  const { author, suggestion } = req.body.params;
  try {
    const session = await getSession({ req });
    if (!session) return res.status(400).json({ message: 'Invalid authentication' });
    await suggestionModel.create({ author, suggestion });
    return res.status(200).json({ success: true });
  } catch (err) { return res.status(500).json({ message: err.message }) }
}
const putResponse = async (req, res) => {
  const { text, response } = req.body.params;
  try {
    const session = await getSession({ req });
    if (!session) return res.status(400).json({ message: 'Invalid authentication' });
    await suggestionModel.findOneAndUpdate({ suggestion: text }, { response });
    return res.status(200).json({ success: true });
   } catch (err) { return res.status(500).json({ message: err.message }) }
}
export default handler;