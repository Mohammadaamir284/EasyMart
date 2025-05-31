"use client"
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";


export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [blur, setblur] = useState(true)

    const { user } = useUser()
    const userId = user?.id;

    useEffect(() => {
        if (!userId) return; // wait until userId is loaded

        const fetchOrders = async () => {
            try {
                const res = await fetch(`/api/order-api?userId=${userId}`);
                const data = await res.json();
                setOrders(data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            }
        };

        fetchOrders();
    }, [userId]); // ✅ Run effect when userId changes

    





    const handleDelete = async (_id) => {
        try {
            const res = await fetch("/api/order-api", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ _id }),
            });

            const result = await res.json();

            if (result.message) {
                setOrders(orders.filter((item) => item._id !== _id));
            }
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <Navbar/>
            <h1 className="text-3xl font-bold mb-6 text-center">🛒 Complete Orders</h1>


            <div className="opacity-70  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {orders.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white border shadow-md rounded-2xl p-4 flex flex-col items-center hover:shadow-lg transition"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-32 h-32 object-cover rounded-full mb-4"
                        />
                        <h2 className="text-xl font-semibold mb-1">{item.name}</h2>
                        <p className="text-gray-600 mb-2 capitalize">{item.category}</p>
                        <p className="text-green-600 font-bold mb-4">₹{item.price}</p>
                        <button
                            onClick={() => handleDelete(item._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                        >
                            Remove
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}
