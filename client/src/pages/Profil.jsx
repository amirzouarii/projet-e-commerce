import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { getMyProd } from '../JS/actions/productAction';
import ListeProd from '../components/ListeProd';
import AddProduct from '../components/AddProduct';

const Profil = () => {
  const user = useSelector(state => state.authReducer.user)
  const dispatch = useDispatch();
  const myProd = useSelector(state=>state.productReducer.myProduct)

  useEffect(() => { //useEffect dispatch action
    dispatch(getMyProd())  
  }, [dispatch])
  // console.log(user);
  return (
    <div>Profil
      <h2>hello {user.name}</h2>
      <AddProduct />
      <ListeProd products={myProd} all={false}/>

    </div>
    
  )
}

export default Profil