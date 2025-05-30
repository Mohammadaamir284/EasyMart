"use client"
import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

const ordersuccess = () => {

 


  const router = useRouter()
 useEffect(() => {
  setTimeout(() => {
    router.push("/order-history")
  }, 3000); 
 
  
 }, [router])
 

  return (
   <div className="flex items-center justify-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <div className="text-green-600 text-6xl mb-4">✔️</div>
        <h1 className="text-2xl font-bold text-green-700 mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-700">Thank you for shopping with us.</p>
      </div>
    </div>
  )
}

export default ordersuccess


