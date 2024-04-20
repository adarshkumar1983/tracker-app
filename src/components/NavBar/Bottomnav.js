import React from 'react';
import { MDBContainer } from "mdb-react-ui-kit";
import { FaPlus} from "react-icons/fa";

const BottomBar = () => {
  return (
    <div 
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'gray',
        color: 'white',
        padding: '25px',
        zIndex: 10000, // Adjust as needed


      }}
    >
      
    
    </div>
  );
};

export default BottomBar;
