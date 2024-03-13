import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/ UserAuthContext";
import TimerApp from "./components/DataTrackerBox/DataBox"; 
import Footer from "./components/Foot/Footer";

function App() {
  return (
  <div> 
    <Container style={{ flex: 1 }} >
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                    
                    <div style={{ width: "100%", padding: "20px",marginTop:"0%"}}>
                      <TimerApp />
                      
                    </div>
                    {/* <Footer/> */}
                  </ProtectedRoute>
                }

               />

                <Route
                  path="/"
                  element={
                    <div style={{ width: "400px" ,marginTop:"100" }}>
                      <Login />
                    </div>

                  }
               />
              <Route
                path="/signup"
                element={
                  <div style={{ width: "400px" }}>
                    <Signup />
                  </div>
                }
              />
            </Routes>

          </UserAuthContextProvider>

        </Col>

      </Row>

    </Container>
             <div style={{marginTop:"0%"}}>  
       
             </div>
 
    </div>
  );
}

export default App;

// import { Container, Row, Col } from "react-bootstrap";
// import { Routes, Route } from "react-router-dom";
// import "./App.css";
// import Home from "./components/Home";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { UserAuthContextProvider } from "./context/ UserAuthContext";
// import TimerApp from "./components/DataTrackerBox/DataBox";
// import AnalysisPage from "./components/Result/result"; // Import the AnalysisPage component

// function App() {
//   return (
//     <Container style={{ width: "100%" }}>
//       <Row>
//         <Col>
//           <UserAuthContextProvider>
//             <Routes>
//               <Route
//                 path="/home"
//                 element={
//                   <ProtectedRoute>
//                     <Home />
//                     <div style={{ width: "100%", padding: "20px" }}>
//                       <TimerApp />
//                     </div>
//                   </ProtectedRoute>
//                 }
//               />
//               <Route
//                 path="/analysis" // Add the path for the analysis page
//                 element={<AnalysisPage />} // Render the AnalysisPage component
//               />
//               <Route
//                 path="/"
//                 element={
//                   <div style={{ width: "400px" }}>
//                     <Login />
//                   </div>
//                 }
//               />
//               <Route
//                 path="/signup"
//                 element={
//                   <div style={{ width: "400px" }}>
//                     <Signup />
//                   </div>
//                 }
//               />
//             </Routes>
//           </UserAuthContextProvider>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default App;
