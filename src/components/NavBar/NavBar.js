/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState ,Component} from 'react';

import { Navbar, Container, Nav, FormControl } from 'react-bootstrap';
import { useUserAuth } from "../../context/ UserAuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../NavBar/health.png';
import { MDBContainer } from "mdb-react-ui-kit";
import { FaSearch } from "react-icons/fa";

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
<MDBContainer className="py-1">
      <div style={{ position: "relative" }}>
        <input
          type="text"
          className="search-hover"
          placeholder="Search here..."
          value={searchValue}
          onChange={handleInputChange}
          style={{
            border: "1px solid #ccc",
            outline: "none",
            backgroundSize: "22px",
            backgroundPosition: "13px",
            borderRadius: "100px",
            width: "20px",
            height: "20px",
            padding: "20px",
            transition: "all 0.5s",
          }}
          onMouseEnter={(e) => {
            e.target.style.width = "200px";
            e.target.style.paddingLeft = "50px";
          }}
          onMouseLeave={(e) => {
            e.target.style.width = "20px";
            e.target.style.paddingLeft = "25px";
          }}
        />
        <FaSearch
          style={{
            position: "absolute",
            top: "50%",
            left: "15px",
            transform: "translateY(-50%)",
            pointerEvents: "none",
            color: "#aaa",
          }}
        />
      </div>
    </MDBContainer>
<Nav className="ml-auto mr-auto">

    
</Nav>
  {user && (
    <div className="user-info" onClick={toggleDetails}>
      {/* Move expanded-details outside of Nav to make it appear over the navbar */}
      {showDetails && (

        <div 
        style={{
          position: 'absolute',
          top: '100%', /* Position it below the user-info div */
          right: '',
          backgroundColor: '#343a40', /* Adjust as needed */
          padding: '10px',
          borderRadius: '50px',
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
        width="45"
        height="45"
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


