"use client"
import { useState } from 'react'


const page = () => {
    const [add, setadd] = useState({ name: '', price: '', image: '', image1: '', image2: '', image3: '', image4: '', category: '', description: '' })
    const handeladd = (e) => {
        setadd({ ...add, [e.target.name]: e.target.value })
    }

    const handelsubmit = async (params) => {
        
        if (!name.trim() || !price.trim() || !image.trim()) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "name": add.name,
                "price": add.price,
                "image": add.image,
                "image1": add.image1,
                "image2": add.image2,
                "image3": add.image3,
                "image4": add.image4,
                "category": add.category,
                "description": add.description
            });

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"

            };

            let fetch2 = await fetch("/api/products/", requestOptions)
            let response = fetch2.json()
            setadd(response)
        }
       
    }






    return (
        <>
            <form
                className='flex flex-col justify-center mt-36 items-center'
                onSubmit={handelsubmit}>
                <input
                    className="border outline my-2 rounded-lg"
                    value={add.name}
                    name="name"
                    onChange={handeladd}
                    type="text" placeholder='Enter Product Name '
                />

                <input
                    className="border outline my-2 rounded-lg"
                    value={add.price}
                    name="price"
                    onChange={handeladd}
                    type="text" placeholder='Enter Product Price'
                />

                <input
                    className="border outline my-2 rounded-lg"
                    value={add.image}
                    name="image"
                    onChange={handeladd}
                    type="text" placeholder='Enter Product Front Image'
                />

                <input
                    className="border outline my-2 rounded-lg"
                    value={add.image1}
                    name="image1"
                    onChange={handeladd}
                    type="text" placeholder='Enter Product Back Image'
                />

                <input
                    className="border outline my-2 rounded-lg"
                    value={add.image2}
                    name="image2"
                    onChange={handeladd}
                    type="text" placeholder='Enter Product Back Image'
                />

                <input
                    className="border outline my-2 rounded-lg"
                    value={add.image3}
                    name="image3"
                    onChange={handeladd}
                    type="text" placeholder='Enter Product Back Image'
                />

                <input
                    className="border outline my-2 rounded-lg"
                    value={add.image4}
                    name="image4"
                    onChange={handeladd}
                    type="text" placeholder='Enter Product Back Image'
                />
                {/* 
                <input
                    value={add.category}
                    name="category"
                    onChange={handeladd}
                    type="text" placeholder='Enter Product category' /> */}
                <label htmlFor="category" className="block text-center text-sm font-medium text-gray-700">
                    Category
                </label>
                <select
                    id="category"
                    name="category"
                    value={add.category}
                    onChange={handeladd}
                    className="mt-1 block w-fit border border-gray-300 rounded-md shadow-sm p-2"
                    required
                >
                    <option value="">Select Category</option>
                    <option value="vegetabels & fruite">Vegetables & Fruits</option>
                    <option value="electronics">Electronics</option>
                    <option value="beauty">Beauty</option>
                    <option value="shoes">Shoes</option>
                    {/* Add more options as needed */}
                </select>


                <input
                    className="border outline my-2 rounded-lg"
                    value={add.description}
                    name="description"
                    onChange={handeladd}
                    type="text" placeholder='Enter Product description'
                />

                <button className='bg-blue-600 text-white p-2 rounded-2xl' type='submit'>submit</button>
            </form>
        </>
    )
}

export default page