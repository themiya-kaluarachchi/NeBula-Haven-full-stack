import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ProductOverview() {
    const location = useLocation();
    const product = location.state;

  return (
    <div>Product overview {product.name}</div>
  )
}
