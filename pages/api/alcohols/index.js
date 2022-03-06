import { getSession } from 'next-auth/client';
import connectDB from '../../../config/connectDB';
import alcoholModel from '../../../models/alcohol.model';
connectDB();
const handler = (req, res) => {
  switch (req.method) {
    case 'DELETE':
      deleteAlcohol(req, res);
      break;
    case 'GET':
      getAlcohols(req, res);
      break;
    case 'POST':
      postAlcohol(req, res);
      break;
    default: return null;
  }
}
const deleteAlcohol = async (req, res) => {
  const { alcohol, drink } = req.body;
  console.log(alcohol)
  try {
    const session = await getSession({ req });
    if (!session) return res.status(400).json({ message: 'Invalid authentication' });
    await alcoholModel.findOneAndUpdate({ alcohol }, { $pull: { drinks: { name: drink } } });
    return res.status(200).json({ success: true });
  } catch (err) { return res.status(500).json({ message: err.message }) }
}
const getAlcohols = async (req, res) => {
  try {
    const session = await getSession({ req });
    if (!session) return res.status(400).json({ message: 'Invalid authentication' });
    const data = await alcoholModel.find({});
    return res.status(200).json({ data: data });
  } catch (err) { return res.status(500).json({ message: err.message }) }
}
const postAlcohol = async (req, res) => {
  const { alcohol, drink } = req.body.params;
  try {
    const session = await getSession({ req });
    if (!session) return res.status(400).json({ message: 'Invalid authentication' });
    await alcoholModel.findOneAndUpdate({ alcohol }, { $push: { drinks: {...drink, alcohol} } }, { upsert: true });
    return res.status(200).json({ success : true });
  } catch (err) { return res.status(500).json({ message: err.message }) }
}
export default handler;