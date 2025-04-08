import React, { useEffect, useState } from 'react'
import './Home.css'
import Header from '../../components/header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import ProductsDisplay from '../../ProductsDisplay/ProductsDisplay'
import { useLocation } from 'react-router-dom'
const Home = () => {
  const [category, setCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('search') || '';
    setSearchQuery(query);
  }, [location.search]);

  return (
    <div>
      <Header />
      <ExploreMenu setCategory={setCategory} />
      <ProductsDisplay category={category} searchQuery={searchQuery} />
    </div>
  );
};

export default Home;