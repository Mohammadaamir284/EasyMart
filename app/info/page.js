"use client";
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';



const OrderSummaryPage = () => {
    const { user, isLoaded } = useUser();
    const [cartItems, setCartItems] = useState([]);
    const [show, setshow] = useState([])
    const router = useRouter();

    const userId = user?.id;
    useEffect(() => {
        const fetchCart = async () => {
            const res = await fetch(`/api/item?userId=${userId}`);
            const data = await res.json();
            console.log("hj q   q", data)
            setCartItems(data);
        };
        fetchCart();
    }, [userId]);



    const handleOrderComplete = () => {
        setCartItems([]);
        router.push('/order-success');
    };

    const del = async (item) => {
       
         
            const response = await fetch("/api/item", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: item.name }),
            });

           if (!response.ok) throw new Error('Delete failed');

             setshow(show => show.filter(i => i.name !== item.name))
             toast.success("Item removed from cart!");


    };


    const total = cartItems.reduce((acc, item) => acc + item.price, 0);

    if (!isLoaded) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto p-6 ">

            <Link href={"/"}><div className='h-15'>
          <h1 className='m-5 text-3xl font-bold w-fit border p-2 rounded-full
          bg-gradient-to-r from-blue-500 to-indigo-600 text-white  shadow-md hover:shadow-lg hover:scale-105'>Easy Mart</h1>
            </div></Link>
          


            {/* Cart Items */}
            <div className="bg-white p-4 rounded-lg shadow mb-6">
                <h3 className="text-lg font-bold mb-4">🛒 Cart Items</h3>
                {cartItems.length === 0 ? (
                    <p className="text-gray-600">No items in cart.</p>
                ) : (
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index} className="flex justify-between py-2 border-b">
                                <div className='flex gap-4 justify-between items-center'>
                                    <img className=' w-20 border rounded-lg object-fill ' src={item.image} alt="" />
                                    <div className='flex flex-col justify-around'>
                                        <div className='font-bold text-lg  w-[45vw] h-10 overflow-scroll scrollbar-hide' >{item.name}</div>
                                        <div className='font-semibold text-2xl'>₹{item.price}</div>
                                    </div>

                                    <div
                                    className='cursor-pointer'
                                        onClick={() => del(item)}
                                    ><img src="./cross.svg" alt="" /></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Order Summary */}
            <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-bold mb-4">🧾 Order Summary</h3>
                <div className="flex justify-between text-lg mb-4">
                    <span>Total</span>
                    <span>₹{total}</span>
                </div>
                
            </div>
        </div>
    );
};

export default OrderSummaryPage;
