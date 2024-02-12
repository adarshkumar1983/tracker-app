
// import React, { useState } from 'react';
// import { Navbar, Container, Nav } from 'react-bootstrap';
// import { useUserAuth } from "/Users/adarshkumar/tracker-app/src/context/ UserAuthContext.js";
// import '/Users/adarshkumar/tracker-app/src/components/NavBar/CustomNavbar.css'; 
// import logo from '../NavBar/health.png';

// const CustomNavbar = () => {
//   const { user, logOut } = useUserAuth();
//   const [showDetails, setShowDetails] = useState(false);

//   const toggleDetails = () => {
//     setShowDetails(!showDetails);
//   };

//   return (
//     <Navbar bg="dark" variant="dark" fixed="top">
//       <Container>
//         <Navbar.Brand href="/">
//           <img
//             alt="Logo"
//             src={logo}
//             width="50"
//             height="50"
//             style={{ borderRadius: '50%' }} 
//             className="d-inline-block align-top"
//           />{' '}
  
//         </Navbar.Brand>
//         <Nav className="ml-auto">
//           {user && (
//             <div className="user-info" onClick={toggleDetails}>
//               {showDetails && (
//                 <div className="expanded-details">
//                   <p className="text-light mb-1">{user.displayName || user.email}</p>
//                   <button onClick={logOut} className="btn btn-danger btn-sm">Logout</button>
//                 </div>
//               )}
//               <img
//                 src={user.photoURL} 
//                 alt="User Photo"
//                 width="40"
//                 height="40"
//                 className="rounded-circle mr-2"
//               />
//             </div>
//           )}
//         </Nav>
//       </Container>
//     </Navbar>
//   );
// };

// export default CustomNavbar;



import React, { useState } from 'react';
import { Navbar, Container, Nav, FormControl } from 'react-bootstrap';
import { useUserAuth } from "/Users/adarshkumar/tracker-app/src/context/ UserAuthContext.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import logo from '../NavBar/health.png';

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
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-sm-2"
            value={searchValue}
            onChange={handleInputChange}
             style={{
              borderRadius: "10px", 
              marginLeft:"900px",
              backgroundColor: "#f0f0f0", 
              border: "1px solid #ccc",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
              }}
          />
        </Nav>
        <Nav className="ml-auto">
         {user && (
             <div className="user-info" onClick={toggleDetails}>
               {showDetails && (
                <div className="expanded-details">
                   <p className="text-light mb-1">{user.displayName || user.email}</p>
                  <button onClick={logOut} className="btn btn-danger btn-sm">Logout</button>
                 </div>
               )}
               <img
                 src={user.photoURL} 
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
