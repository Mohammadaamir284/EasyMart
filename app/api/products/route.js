// import dbConnect from '../../../lib/mongodb';
// import Product from '../../../models/Product';
import dbConnect from "@/lib/mongodb"

import product1 from "@/module/product(1)";

export async function POST(req) {
    const {
        name,
        price,
        image,
        image1 = "",
        image2 = "",
        image3 = "",
        image4 = "",
        category,         // ✅ Yeh field hona chahiye
        description
    } = await req.json();

    try {
        await dbConnect(); // Connect to DB
        const newProduct = new product1({
            name,
            price,
            image,
            image1 ,
            image2,
            image3,
            image4,
            category,         // ✅ Yeh field hona chahiye
            description
        });
        await newProduct.save(); // Save to MongoDB
        return new Response(JSON.stringify({ message: 'Product added successfully' }), { status: 201 });

    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error adding product', error }), { status: 500 });
    }
}

// GET method to fetch all products
export async function GET(req) {
    try {
        await dbConnect(); // Connect to DB
        const products = await product1.find(); // Fetch all products
        return new Response(JSON.stringify({ products }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ message: 'Error fetching products', error }), { status: 500 });
    }
}