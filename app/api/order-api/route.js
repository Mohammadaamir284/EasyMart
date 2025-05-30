import dbConnect from "@/lib/mongodb";
import order from "@/module/order";
import mongoose from "mongoose";

// app/api/item/route.js



export async function POST(req) {
    await dbConnect();
    const { name, price, image, category, userId } = await req.json();


    const existing = await order.findOne({ name, userId });
    if (existing) {
        return Response.json({ error: "Already exists" }, { status: 409 });
    }

    const orderItem = await order.create({ name, price, image, category, userId });
    return Response.json(orderItem);
}


export async function GET(req) {
    await dbConnect();
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
        return Response.json({ error: "Missing userId" }, { status: 400 });
    }

    const items = await order.find({ userId });
    return Response.json(items);
}


export async function DELETE(req) {
  await dbConnect();
  const { _id } = await req.json();

  if (!_id) {
    return Response.json({ error: "Missing _id" }, { status: 400 });
  }

  await order.deleteOne({ _id: new mongoose.Types.ObjectId(_id) });
  return Response.json({ message: "Order item deleted" });
}