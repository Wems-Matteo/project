import mongoose from 'mongoose';
const connectDB = () => {
  if(mongoose.connections[0].readyState) return 0;
  mongoose.connect(process.env.DATABASE_URI, {}, err => {
    if(err) throw err;
    console.log('Connected to MongoDB');
  });
}
export default connectDB;