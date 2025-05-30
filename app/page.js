"use client"
import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);

    };
    fetchAllProducts();
  }, []);

  const uniqueCategories = [...new Set(products.map((item) => item.category))];



  return (<>

    <Navbar />
    <section className='bg-[#32332e] md:h-[94vh] my-[3vh] rounded-xl p-4 md:w-[94vw] mx-[3vw]'>
      <img src="/front(1).jpeg"
        alt=""
        className='md:h-[90vh] rounded-xl md:w-[92vw]'
      />
    </section>


    <section>
      <div className="relative rounded-lg my-10 shadow-2xl w-[94vw] mx-[3vw]">
        <div className="flex flex-col space-y-10 p-4">
          {uniqueCategories.map((category) => {
            let filtered = products.filter((item) => item.category === category);
            let visibleItems = filtered.slice(0, 6);
            let hasMore = filtered.length > 6;

            return (
              <div key={category}>
                <h2 className="text-2xl font-bold px-4 py-2 capitalize">{category}</h2>
                <div className="flex overflow-x-auto scrollbar-hide space-x-4 px-4">
                  {visibleItems.map((item) => (
                    <Link key={item._id} href={item.name}><div  className="w-[200px] flex-shrink-0">
                      <img src={item.image} alt={item.name} className="h-50 w-full shadow-2xl object-cover rounded-md transition-transform duration-300 ease-in-out hover:scale-110" />
                      <div className="flex flex-col gap-y-4">
                        <p className="text-sm h-11 overflow-hidden border-b text-center rounded-b-lg font-semibold mt-2">{item.name}</p>
                        <p className="text-xl font-bold">₹{item.price}</p>
                      </div>
                    </div>
                    </Link>
                  ))}

                  {hasMore && (
                    <div className="w-[200px] h-[200px] flex-shrink-0 flex items-center justify-center bg-gray-100 rounded shadow hover:bg-gray-200 text-blue-600 font-semibold text-center">
                      <Link href={`/${encodeURIComponent(category)}`}>
                        <div className="border px-2 hover:bg-blue-500 hover:text-white rounded-full">
                          See More →
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

  </>
  )
}

export default page
