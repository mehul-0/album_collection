import { Link } from "react-router-dom";
import Navbar from './Navbar';

const AddAlbum = (props) => {

  //this function get all the input like userid and title then call add album function for add it on the album list.
  const getAlbumFormData = () => {
    const userId = document.getElementById('addform-userID').value;
    const title = document.getElementById('addform-title').value;
    props.addAlbumToList(Number(userId), title);
  }

  return (
    <>
      <Navbar path="/" page="Home" />

      <div className='addalbum-container'>
        <div className='addalbum-form'>
          <h3>Enter New Album Details:</h3>
          
          <div className='inp-container'>
            Enter User Id :
            <input id='addform-userID' type="number" />
          </div>
          <div className='inp-container'>
            Enter Album Title :
            <input id='addform-title' type="text" />
          </div>
          <div>
            <Link to="/"><button onClick={getAlbumFormData}>Add To List</button></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddAlbum;
