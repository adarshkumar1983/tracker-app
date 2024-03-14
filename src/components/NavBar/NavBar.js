/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState ,Component} from 'react';

import { Navbar, Container, Nav, FormControl } from 'react-bootstrap';
import { useUserAuth } from "../../context/ UserAuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../NavBar/health.png';
// import  "./CustomNavabr.css";
// import defaultProfilePic from '../NavBar/default-profile-pic.png'; // Import default profile picture

const CustomNavbar = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState('');
  const { user, logOut } = useUserAuth();
  const [showDetails, setShowDetails] = useState(false);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    handleSearch(query); // Pass the search query to the parent component
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Container>
        <Navbar.Brand href="/">
          <img
            alt="Logo"
            src={logo}
            width="50"
            height="50"
            style={{ borderRadius: '50%' }}
            className="d-inline-block align-top"
          />
        </Navbar.Brand>


<Nav className="ml-auto">
<Nav className="ml-auto mr-auto">
  <FormControl
    type="text"
    
    placeholder="Search"
   style={{marginRight:"10%",position:"inherit"}}
    value={searchValue}
    onChange={handleInputChange}
  />
</Nav>
  {user && (
    <div className="user-info" onClick={toggleDetails}>
      {/* Move expanded-details outside of Nav to make it appear over the navbar */}
      {showDetails && (

        <div 
        style={{
          position: 'absolute',
          top: '100%', /* Position it below the user-info div */
          right: '0',
          backgroundColor: '#343a40', /* Adjust as needed */
          padding: '10px',
          borderRadius: '5px',
          zIndex: '1000' /* Ensure it appears above other elements */
        }}
        className="expanded-details">
          <p className="text-light mb-1">{user.displayName || user.email}</p>
          <button onClick={logOut} className="btn btn-danger btn-sm">Logout</button>
        </div>
      )}
      
      <img
        src={user.photoURL } 
        // src={user.photoURL || defaultProfilePic} // Use default profile picture if photoURL is missing
        alt="User Photo"
        width="40"
        height="40"
        className="rounded-circle mr-2"
      />
    </div>
  )}
</Nav>

      </Container>
    </Navbar>
  );
};

export default CustomNavbar;


