import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
  <div style={{ display:"flex" ,
                justifyContent:"center",
                alignItems:"center"
  }}>
    <Spinner animation="border"  />;
    </div>
  )
}

export default Loading;
