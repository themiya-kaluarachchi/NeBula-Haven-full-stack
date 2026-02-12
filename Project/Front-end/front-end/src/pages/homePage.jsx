import React from 'react'
import Header from '../components/header'
import { Route, Routes } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className='w-full h-full bg-primary'>
        <Header />
        <Routes path="/" >
          <Route path='/' element={<h1>Welcome to Home Page</h1>} />
          <Route path='/products' element={<h1>Product List</h1>} />
          <Route path='/contact' element={<h1>Contact Us</h1>} />
          <Route path='/about' element={<h1>About Us</h1>} />
          <Route path='/*' element={<h1>404 Not Found</h1>} />
        </Routes>
    </div>
  )
}
