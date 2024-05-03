/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, Component, useEffect } from "react";

import { Navbar, Container, Nav, FormControl } from "react-bootstrap";
import { useUserAuth } from "../../context/ UserAuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import logo from "../NavBar/health.png";
import charts from "../NavBar/charts.png"
import { MDBContainer } from "mdb-react-ui-kit";
import { FaSearch } from "react-icons/fa";

import { auth, database } from "../../firebase";

const CustomNavbar = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState("");
  const { user, logOut } = useUserAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userId = currentUser.uid;
          const userRef = database.ref("users/" + userId);
          userRef.on("value", (snapshot) => {
            const data = snapshot.val();
            setUserData(data);
          });
        } else {
          console.log("No user is signed in.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

    // Clean up function
    return () => {
      // Unsubscribe from Firebase listeners if any
      database.ref().off();
    };
  }, []);

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchValue(query);
    handleSearch(query); // Pass the search query to the parent component
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const navbarBrandStyle = {
    position: 'relative',
  };
  const shiningEffectStyle = {
    position: 'absolute',
    top: '-10px',
    left: '10px',
    width: 'calc(100% + 9px)',
    height: 'calc(100% + 9px)',
    borderRadius: '50%',
 
    backgroundColor:'radial-gradient(circle, rgba(255,2525,352,0.2) 0%, rgba(217, 90, 21, 0.8) 50%)',
    animation: 'blinking 1s infinite',
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
            style={{ borderRadius: "50%" }}
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
          <Navbar.Brand href="https://tracker-dashboard.onrender.com" style={navbarBrandStyle}>
        <img
          alt="Dashboard"
          src={charts}
          width="45"
          height="45"
          style={{ borderRadius: '50%', marginRight: '2px' }}
        />
        <span style={shiningEffectStyle}></span>
      </Navbar.Brand>
          <Nav className="ml-auto mr-auto"></Nav>
          {user && (
            <div className="user-info" onClick={toggleDetails}>
             
              {showDetails && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%" ,
                    backgroundColor: "#343a40",
                    padding: "5px",
                    borderRadius: "10px",
                    zIndex: "1000"
                  }}
                  className="expanded-details"
                >
                  <p className="text-light mb-1">
                    {user.displayName || user.email}
                  </p>
                  <button onClick={logOut} className="btn btn-danger btn-sm">
                    Logout
                  </button>
                </div>
              )}

              <img
                src={user.photoURL}
                // src={user.photoURL || defaultProfilePic} // Use default profile picture if photoURL is missing
                alt="User Photo"
                width="50"
                height="50"
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
