"use client"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation";
import Link from "next/link"

const Sidebar = () => {
    const pathname = usePathname();
    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("/api/products/")
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)

            })
    }, [])

    // Step 1: Unique categories nikaalo
    const uniqueCategories = Array.from(new Set(products.map(item => item.category)));
    const uniqueNames = Array.from(new Set(products.map(item => item.name)));
    return (
        <>

            <div className='relative  bg-[#111b21] w-[20vw] h-screen '>
                <div className=' flex  flex-col gap-3  '>
                    <Link href={'/'}><div className="text-3xl m-4 text-white font-bold">EasyMart</div></Link>

                    <ul className='overflow-hidden'>
                        {uniqueCategories.map((category, index) => {
                            const isActive = decodeURIComponent(pathname).toLowerCase() === `/${category.toLowerCase()}`;

                           return (
                                <li key={index}>
                                    <Link
                                        href={`/${category}`}
                                        className={`
                                            ${
                                                isActive ?
                                                "ml-3 font-semibold capitalize text-[24px] text-green-500  block px-4 py-2 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-gray-600 hover:scale-110" :
                                                "ml-3 font-semibold capitalize text-lg text-white block px-4 py-2 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-gray-600 hover:scale-110"
                                            }
                                            `}
                                    >
                                        {category}
                                    </Link>
                                </li>

                            )
                        })}


                        <li className="ml-3 font-semibold capitalize text-lg text-white block px-4 py-2 hover:bg-gray-100 hover:text-gray-950 dark:hover:bg-gray-600 hover:scale-110">Cart</li>

                    </ul>
                </div>

                <footer className="absolute bottom-0 w-[20vw] mx-auto text-center text-gray-500 py-4 text-sm border-t mt-10">
                    © 2025 EasyMart. All rights reserved.
                </footer>
            </div>

        </>
    )
}

export default Sidebar