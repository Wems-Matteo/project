import { getSession } from 'next-auth/client';
import connectDB from '../../../config/connectDB';
import noteModel from '../../../models/note.model';
connectDB();
const handler = (req, res) => {
  switch (req.method) {
    case 'DELETE':
      deleteNote(req, res);
      break;
    case 'GET':
      getNotes(req, res);
      break;
    case 'POST':
      postNote(req, res);
      break;
    case 'PUT':
      putResponse(req, res);
      break;
    default: return null;
  }
}
const deleteNote = async (req, res) => {
  const { text } = req.body;
  try {
    const session = await getSession({ req });
    if (!session) return res.status(400).json({ message: 'Invalid authentication' });
    await noteModel.findOneAndDelete({ note: text });
    return res.status(200).json({ success: true });
  } catch (err) { return res.status(500).json({ message: err.message }) }
}
const getNotes = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session) return res.status(400).json({ message: 'Invalid authentication' });
    const data = await noteModel.find({});
    return res.status(200).json({ data: data });
  } catch (err) { return res.status(500).json({ message: err.message }) }
}
const postNote = async (req, res) => {
  const { author, note } = req.body.params;
  try {
    const session = await getSession({ req });
    if (!session) return res.status(400).json({ message: 'Invalid authentication' });
    await noteModel.create({ author, note });
    return res.status(200).json({ success: true });
  } catch (err) { return res.status(500).json({ message: err.message }) }
}
const putResponse = async (req, res) => {
  const { text, response } = req.body.params;
  try {
    const session = await getSession({ req });
    if (!session) return res.status(400).json({ message: 'Invalid authentication' });
    await noteModel.findOneAndUpdate({ note: text }, { response });
    return res.status(200).json({ success: true });
   } catch (err) { return res.status(500).json({ message: err.message }) }
}
export default handler;