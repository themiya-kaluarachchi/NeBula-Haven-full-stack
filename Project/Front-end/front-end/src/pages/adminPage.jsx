import React from 'react'
import { Route, Routes } from 'react-router-dom'

export default function AdminPage() {
  return (
    <div className='w-full h-full bg-[#5A7863] flex p-2'>
      <div className='w-[300px] h-full bg-[#5A7863]'>

      </div>
      <div className='w-[calc(100%-300px)] h-full bg-[#EBF4DD] rounded-[20px]'>
        <Routes path="/">
          <Route path="/" element={<h1>Dashboard</h1>} />
          <Route path="/products" element={<h1>Products</h1>} />
          <Route path="/orders" element={<h1>Orders</h1>} />
        </Routes>
      </div>
    </div>
  )
}
