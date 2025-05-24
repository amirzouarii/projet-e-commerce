import React, { useEffect } from 'react'
import { toast , ToastContainer} from 'react-toastify'
import { useDispatch } from 'react-redux'
import { clearError } from '../JS/actions/authAction'


const ErrorToast = ({error}) => {
  const dispatch = useDispatch()

  console.log(error);
  useEffect(() => {
    toast.error(error.msg, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    theme: "dark",
    toastId:error.msg
  });
  //nettoyage du tableau error
  const timer = setTimeout(() => {
    dispatch(clearError())
  },3000)
  return ()=>clearTimeout(timer); // une assurance 
  }, [error , dispatch]);
  return (
    <div>
      <ToastContainer limit ={3} />
    </div>
  )
}

export default ErrorToast