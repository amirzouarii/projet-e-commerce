import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProd } from '../JS/actions/productAction'
import ListeProd from '../components/ListeProd';
import Carrossel from '../components/Carrossel';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.productReducer.products)
    console.log(products);
  useEffect(()=>{
    dispatch(getAllProd())
    
  }, [dispatch])
  return (
    <div>
      <Carrossel />
      <ListeProd products={products} all={true} />
    </div>
  )
}

export default Home