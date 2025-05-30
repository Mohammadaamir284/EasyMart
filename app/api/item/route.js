// /app/api/cart/route.js
import dbConnect from "@/lib/mongodb";
import Cart from "@/module/Cart";

// app/api/item/route.js



export async function POST(req) {
    await dbConnect();
    const { name, price, image, category, userId } = await req.json();


    const existing = await Cart.findOne({ name, userId });
    if (existing) {
        return Response.json({ error: "Already exists" }, { status: 409 });
    }

    const cartItem = await Cart.create({ name, price, image, category, userId });
    return Response.json(cartItem);
}


export async function GET(req) {
    await dbConnect();
    const userId = req.nextUrl.searchParams.get("userId");

    if (!userId) {
        return Response.json({ error: "Missing userId" }, { status: 400 });
    }

    const items = await Cart.find({ userId });
    return Response.json(items);
}


export async function DELETE(req) {
    await dbConnect();
    const { name } = await req.json();

    if (!name) {
        return Response.json({ error: "Missing userId" }, { status: 400 });
    }
    await Cart.deleteOne({ name });
    return Response.json({ message: "Cart cleared" });
}
