import './App.css'
import ProductCard from './components/productCard'

function App() {

  return (
    <>
      <h1>KTK</h1>
      <ProductCard name="Apple iPad" price="$599" image="https://celltronics.lk/wp-content/uploads/2025/04/Apple-iPad-Air-11-inch-M3-Chip-600x600.jpg" />
      <ProductCard name="Samsung Galaxy Tab" price="$499" image="https://objectstorage.ap-mumbai-1.oraclecloud.com/n/softlogicbicloud/b/cdn/o/products/MBPSSM-X216BZAASLK-S--1--1702023887.jpg" />
    </>
  )
}

export default App
