import { useSelector } from 'react-redux'
import User from './User'
import Loading from './Loading';

const ListUsers = () => {
   const users = useSelector((state) => state.userReducer.listUsers);
   const isLoad = useSelector((state) => state.userReducer.isLoad);
   console.log(isLoad);
  //  console.log(users);
  return (
    <div style={{display:"flex",
                justifyContent:"space-between",
                flexWrap:"wrap",
                margin:"50px",
                gap:"20px"
    }}>
      {isLoad && <Loading />}
      {users.map(user => <User key={user._id} user={user}/>)}
    
        
    </div>
  )
}

export default ListUsers