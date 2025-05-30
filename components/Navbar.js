'use client';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useClerk, useUser } from '@clerk/nextjs';
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

    // Step 1: Unique categories nikaalo
    const uniqueCategories = Array.from(new Set(products.map(item => item.category)));





    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const scrollHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;

            const scrollPercent = (currentScroll / (scrollHeight - windowHeight)) * 100;

            // 🔻 Hide navbar if scrolled down 80%+
            if (scrollPercent > 30 && currentScroll > lastScrollY) {
                setShowNavbar(false);
            }

            // 🔼 Show navbar if scrolling up (from any point)
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



            <Link href={'/'}>
                <div className='flex items-center gap-x-10'>
                    <div className="text-2xl text-teal-950  font-bold">EasyMart</div>
                    <div className='flex items-center hover:outline-2 px-2 h-9 rounded-lg bg-blue-200'>
                        <  Search />
                        <input type="text"
                            className=' outline-none px-2 h-7 rounded-lg bg-blue-200'
                            placeholder='Search your product'
                        />
                    </div>
                </div>
            </Link>

            <div className=' flex items-center gap-4'>


                <div className='hover:text-blue-500' >Cart</div>


                <button
                    onClick={() => setOpen(!open)}
                    onBlur={() => { setTimeout(() => { setOpen(false) }, 500); }}
                    className="relative text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Products <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                </button>

                {/* <!-- Dropdown menu --> */}
                <div className={`z-10 ${open ? "" : "hidden"} absolute top-20 right-5 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-fit dark:bg-gray-700`}>

                    <ul className="py-2 text-sm flex  justify-items-start text-gray-700 dark:text-gray-200" >

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
                    className='border py-2 w-16 text-center rounded-md font-semibold hover:font-bold  '>Login</button>}
                {isSignedIn && <Link href={"/info"}> <div>
                    <img
                        src={user.imageUrl}
                        alt="User Profile"
                        style={{ width: '40px', borderRadius: '50%' }}
                    />

                </div></Link>}

            </div>
        </nav>
    );
};

export default Navbar;
