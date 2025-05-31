"use client"
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { MoreVertical, Menu, X } from "lucide-react";
import { GetTimeInfo } from "./getTimeInfo";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function Page() {
  const params = useParams();
  const category = decodeURIComponent(params.category);
  const pathname = usePathname();

  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const [isMobile, setIsMobile] = useState(false);
  const [open, setopen] = useState(false)
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [product, setProduct] = useState([]);
  const [names, setNames] = useState([]);
  const [mainImages, setMainImages] = useState([]);
  const [time, setTime] = useState(GetTimeInfo());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(GetTimeInfo());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    const res = await fetch("/api/products/");
    const data = await res.json();
    const data1 = data.products;

    setAllProducts(data1);
    setProducts(data1);

    const matchByName = data1.find(p => p.name === category);
    const categoryToUse = matchByName ? matchByName.category : category;

    setProduct(data1.filter(item => item.category === category));
    setNames(data1.filter(item => item.name === category));
    setCategoryProducts(data1.filter(p => p.category === categoryToUse));
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const handleImageClick = (index, img) => {


    const updated = [...mainImages];
    updated[index] = img;
    setMainImages(updated);
  };

  const uniqueCategories = Array.from(new Set(products.map(item => item.category)));

  // Cart item function

  const handleAddToCart = async (item, userId) => {
    if (!isSignedIn) {
      toast.error("🚫 Please login to add items to cart!");
      return;
    }
    const res = await fetch("/api/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category,
        userId: user?.id
      }),
    });

    await res.json();
    toast.success("Item moved from cart!");

  };





  const del = async (item) => {
    if (!isSignedIn) {
      toast.error("🚫 Please login to Order items!");
      return;
    }
    try {
      // 🟢 Step 1: DELETE from cart
      const res = await fetch("/api/item", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: item.name }), // ✅ Or use _id if possible
      });

      const data = await res.json();
      console.log("Deleted from cart:", data);

      // 🟢 Step 2: Add to Orders
      const res1 = await fetch("/api/order-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          userId: user?.id,
        }),
      });

      const data1 = await res1.json();
      console.log("Added to orders:", data1);

      // Optional UI update:
      // refreshCartItems(); or update local state
    } catch (error) {
      console.error("Error during delete/order:", error);
    }
    router.push("/order-success")
  };


  return (
    <div className="flex min-h-screen  relative">
      {/* Sidebar */}
      <div className={`w-[50vw] md:w-[20vw] z-50 bg-[#111b21] 
  transition-transform duration-300 ease-in-out 
  md:translate-x-0 md:static
  ${open ? "translate-x-0 absolute" : "-translate-x-full absolute"}`}
      >
        {product.length > 0 ? (
          <Sidebar />
        ) : (
          <div className="flex flex-col h-full relative">
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <Link href="/">
                <span className="text-white text-2xl font-bold">EasyMart</span>
              </Link>
              <div
                onClick={() => setIsMobile(!isMobile)}
                onBlur={() => { setTimeout(() => { setIsMobile(false) }, 500); }}
                className=" relative">
                <MoreVertical className="text-white cursor-pointer" />
                <ul

                  className={`absolute right-0  w-48  bg-slate-700 rounded-xl shadow-lg z-50 
                 ${isMobile ? "" : "hidden"} `}>
                  {uniqueCategories.map((cat, i) => (
                    <li key={i}>
                      <Link
                        href={`/${cat}`}
                        className="block px-4 py-2 text-white hover:bg-slate-600 capitalize"
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>



            <ul className="flex flex-col overflow-y-auto scrollbar-hide border h-[80vh] px-2 mt-2 ">
              {categoryProducts.map((item, i) => {

                const isActive = decodeURIComponent(pathname).toLowerCase() === `/${item.name.toLowerCase()}`;


                return (
                  <li key={i} className="my-2">
                    <Link
                      href={`/${item.name}`}
                      className={`block px-4 py-2 rounded-lg border h-20 overflow-hidden ${isActive
                        ? "text-green-400 text-xl h-24 font-bold"
                        : "text-white text-base"
                        } hover:bg-slate-600 capitalize`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}

            </ul>

            <footer className="text-gray-400 w-full text-sm text-center py-3 border-t">
              © 2025 EasyMart. All rights reserved.
            </footer>
          </div>
        )}
      </div>

      <main>
       <Link href={"/"}> <div className="text-3xl cursor-pointer font-semibold mx-1 my-2 md:hidden block ">Easy Mart</div></Link>
        {/* Main Content */}
        <div className="md:w-[80vw] w-[96vw] md:h-[96vh] m-2 bg-white p-4 overflow-y-auto rounded-lg border">
          {product.length > 0 && (
            <div>
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold capitalize mb-4">
                  {decodeURIComponent(params.category)}
                </h2>
                {open ?
                  <><span className="md:hidden block" onClick={() => setopen(!open)}>  <X size={32} /></span></> :
                  <><span className="md:hidden block" onClick={() => setopen(!open)}>  <Menu size={32} /></span></>
                }
              </div>

              {/* Grid Product Listing */}
              <div className="grid grid-cols-2 md:grid-cols-4 md:gap-6 gap-2 mb-10 ">
                {product.map((item, i) => (
                  <Link key={i} href={`/${item.name}`}>
                    <div className="bg-[#202c33b5] p-3 rounded-lg shadow hover:shadow-xl transition md:w-full 
                  w-[42.5vw] ">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-40 object-cover rounded-lg mb-2"
                      />
                      <p className="text-white font-semibold text-center truncate">{item.name}</p>
                      <div className="text-yellow-400 mt-2 text-lg flex justify-center">
                        ★★★★<span className="text-gray-400">★</span>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-white">
                        <span className="font-bold text-xl">₹{item.price}</span>
                        <span className="bg-red-500 text-xs px-2 py-1 rounded font-bold">10% OFF</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Single Product Page */}
          {Array.isArray(names) && names.map((item, index) => {
            const images = [item.image, item.image1, item.image2, item.image3, item.image4];
            const mainImage = mainImages[index] || item.image;

            return (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-100 p-4 rounded-lg"
              >
                <div className="block md:hidden relative mb-3">
                  <span
                    onClick={() => setopen(!open)}
                    className={`
                    absolute top-0 md:hidden block z-50 cursor-pointer
                     transition-all duration-300 ease-in-out
                      ${open ? 'right-4 translate-x-0' : 'left-4 -translate-x-1'}
                            `}
                  >
                    {open ? <X size={32} /> : <Menu size={32} />}
                  </span>
                </div>


                {/* Image Viewer */}
                <div>
                  <img src={mainImage} className="w-full h-96 object-fill rounded-lg" />
                  <div className="flex flex-wrap justify-center mt-3 gap-2">
                    {images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        onClick={() => handleImageClick(index, img)}
                        className="w-20 h-20 object-cover border rounded-lg cursor-pointer hover:scale-105 transition"
                      />
                    ))}
                  </div>
                </div>

                {/* Product Details */}
                <div>
                  <h3 className="text-2xl font-bold mb-3">{item.name}</h3>
                  <p className="text-lg font-semibold text-green-600">Price: ₹{item.price}</p>
                  <span className="inline-block bg-red-500 text-white px-2 py-1 mt-2 rounded text-sm">
                    10% OFF
                  </span>
                  <div className="mt-4 text-yellow-400 text-xl">★★★★☆</div>
                </div>

                {/* Purchase Section */}
                <div className="bg-white p-4 rounded-lg border shadow">
                  <div className="text-2xl font-bold mb-3">₹{item.price}</div>
                  <p className="font-medium mb-2">
                    FREE delivery in Delhi 110001 by <span className="text-blue-600">{time.formattedDate}</span>
                  </p>
                  <p className="text-sm text-red-500 mb-4">Order within {time.timeLeft}</p>
                  <p className="text-green-600 font-semibold mb-2">In Stock</p>
                  <p>
                    Ships from <span className="text-blue-500">EasyMart</span>
                  </p>
                  <p>
                    Sold by <span className="text-blue-500">Soild @ home</span>
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600">
                      Add to Cart
                    </button>
                    <div
                      className="bg-orange-600 text-center text-white font-bold py-2 rounded hover:bg-orange-700"
                    >
                      <button
                        onClick={() => del(item)}>
                        Buy Now
                      </button></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
