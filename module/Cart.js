// models/Cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: { type: String }, // ✅ Add this
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  category: { type: String },
});

export default mongoose.models.Cart || mongoose.model("Cart", cartSchema);
