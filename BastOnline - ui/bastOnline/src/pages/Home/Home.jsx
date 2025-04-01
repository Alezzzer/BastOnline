import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import ProductsDisplay from '../../ProductsDisplay/ProductsDisplay'
const Home = () => {

  const[category, setCategory] = useState("All")


  return (
    <div>
        <Header/>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <ProductsDisplay category={category}/>
    </div>
  )
}

export default Home