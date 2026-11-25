import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String },
  picture: { type: String }
}, { timestamps: true });
export default mongoose.model('User', userSchema);