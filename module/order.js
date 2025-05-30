// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String }, // ✅ Add this
  name: { type: String },
  price: { type: Number },
  image: { type: String },
  category: { type: String },
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
