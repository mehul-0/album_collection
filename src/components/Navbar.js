import { Link } from 'react-router-dom'

//get button name and path for every component
const Navbar = (props) => {
  return (
    <div className='navbar'>
      <h1 className='title'> Album Collection </h1>
      <Link to={props.path}><button>{props.page}</button></Link>
    </div>
  )
}

export default Navbar;
