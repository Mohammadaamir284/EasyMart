import dbConnect from "@/lib/mongodb";
import product1 from "@/module/product(1)";
import { NextResponse } from "next/server";

export async function POST(req) {
  const products = await req.json(); 

  try {
    await dbConnect();

    await product1.insertMany(products); 

    return new Response(JSON.stringify({ message: 'Products added successfully' }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Error adding products', error }), { status: 500 });
  }
}