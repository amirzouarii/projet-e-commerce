import { Route , Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profil from './pages/Profil';
import Erreur from './pages/Erreur';
import NavBar from './components/NavBar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { curent } from './JS/actions/authAction';
import Dashboard from './pages/Dashboard';
import ErrorToast from './components/ErrorToast';
import DetailProd from './components/DetailProd';
import Panier from './pages/Panier';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(state=>state.authReducer.isAuth) //pour le store et dispatch (les utiliser)
  const user = useSelector(state=>state.authReducer.user)
  const errors = useSelector(state => state.authReducer.errors)
  // console.log(errors);
  // console.log(user.isAdmin);


  useEffect(()=> { //gerer l'etat du compnent | cordination entre 2
    if(localStorage.getItem("token")){
      dispatch(curent())
    }
  },[dispatch]) //lorsque dispatch appelé la fonction va etre appelé 
  return (
    <div className="App">
      {Array.isArray(errors) 
      && 
      errors.map((error) => <ErrorToast key={error.msg} error={error} />)}
      
      <NavBar/>
      <Routes>
      <Route path='/' element={<Home />}/>
      {/* route pour mentrer les details d'un produit  */}
      <Route path='/prod/:id' element={<DetailProd />} />
      {isAuth ? (
        <>
        <Route path='/profile' element={<Profil />} /> 
        <Route path="/panier" element={<Panier />} />

        </>
      ) : (
        <>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      </>
      ) }
      
 {/* pour proteger ma route admin  */}
     

       {user.isAdmin &&     <Route path="/admin" element={<Dashboard />} />}

      <Route path='/*' element={<Erreur />}  />
      </Routes>

      <Footer />

      


    </div>
  );
}

export default App;
