'use client';


import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useClerk, useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

const Navbar = () => {

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [open, setOpen] = useState(false);

    const { openSignIn, isSignedIn } = useClerk()
    const { user } = useUser()
    const [products, setProducts] = useState([])


    useEffect(() => {
        fetch("/api/products/")
            .then(res => res.json())
            .then(data => {
                setProducts(data.products)
            })
    }, [])

    const uniqueCategories = Array.from(new Set(products.map(item => item.category)));

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollPercent = (currentScroll / (scrollHeight - windowHeight)) * 100;
            if (scrollPercent > 30 && currentScroll > lastScrollY) {
                setShowNavbar(false);
            }
            if (currentScroll < lastScrollY) {
                setShowNavbar(true);
            }
            setLastScrollY(currentScroll);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <nav
            className={`w-[92vw] flex items-center justify-between rounded-full m-[4vw] fixed top-0 px-6 py-3 bg-white shadow-md z-50 transition-all duration-500 ease-in-out
        ${showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
        >

            <div className='flex items-center gap-x-10'>
                <div className="text-2xl text-teal-950  font-bold">EasyMart</div>

                <div className='hidden md:block'>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-400 shadow-xl focus-within:ring-2 focus-within:ring-blue-400 transition ">
                        <Search className="text-gray-500 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search your product"
                            className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
                        />
                    </div>

                </div>
            </div>


            <div className=' flex items-center gap-4'>
                <button
                    onClick={() => setOpen(!open)}
                    onBlur={() => { setTimeout(() => { setOpen(false) }, 500); }}
                    className="relative px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-violet-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200 text-center inline-flex items-center" type="button">Products <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {/* <!-- Dropdown menu --> */}
                <div className={`z-10 ${open ? "" : "hidden"} absolute top-20 right-5 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-fit dark:bg-gray-700`}>
                    <ul className="py-2 text-sm flex flex-col  justify-items-start text-gray-700 dark:text-gray-200" >

                        {uniqueCategories.map((category, index) => (
                            <li key={index}>
                                <Link
                                    href={`/${category}`}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    {category}
                                </Link>
                            </li>
                        ))}

                    </ul>
                </div>
                {!isSignedIn && <button
                    onClick={openSignIn}
                    className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"
                >
                    Login
                </button>}

                <UserButton
                    appearance={{
                        elements: {

                            userButtonAvatarBox: "w-full h-full ring-4 ring-purple-500",
                            userButtonAvatarImage: "w-full h-full object-cover",
                        },
                    }}
                />


            </div>
        </nav>
    );
};

export default Navbar;
