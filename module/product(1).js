import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },        // ✅ compulsory (main image)

  image1: { type: String, default: "" },          // ✅ optional
  image2: { type: String, default: "" },
  image3: { type: String, default: "" },
  image4: { type: String, default: "" },

  category: { type: String, required: true },
  description: { type: String, default: "" }         // ✅ Yeh bhi hona chahiye
});

export default mongoose.models.product2 || mongoose.model('product2', ProductSchema);