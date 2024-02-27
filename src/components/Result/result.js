// import React, { useState, useEffect } from 'react';
// import firebase from 'firebase/compat/app'; // Import the compat version for Firebase v9
// import 'firebase/compat/database'; // Import the compat version for the Realtime Database

// import { Line } from 'react-chartjs-2';
// import 'chart.js/auto'; // Import the necessary scales
// import 'chartjs-adapter-date-fns';
// import 'chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.esm.js';

// // Register the linear scale




// const Result = () => {
//   const [activityData, setActivityData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: 'Time Spent',
//         data: [],
//         fill: false,
//         backgroundColor: 'rgba(75,192,192,0.4)',
//         borderColor: 'rgba(75,192,192,1)',
//       },
//     ],
//   });

//   useEffect(() => {
//     // Firebase configuration
//     const firebaseConfig = {
//         apiKey: "AIzaSyBddNzqwVLCeEEc2q3TJrerASUuawVrN40",
//   authDomain: "tracker-a7db9.firebaseapp.com",
//   projectId: "tracker-a7db9",
//   storageBucket: "tracker-a7db9.appspot.com",
//   messagingSenderId: "425135442305",
//   appId: "1:425135442305:web:462c10ee1d01aedd778080",
//   measurementId: "G-ZHFDC39525"
//     };
//     // Initialize Firebase
//     if (!firebase.apps.length) {
//       firebase.initializeApp(firebaseConfig);
//     }

//     // Reference to the Firebase database
//     const dbRef = firebase.database().ref('userActivity');

//     // Fetch user activity data from Firebase
//     dbRef.on('value', (snapshot) => {
//       const userData = snapshot.val();
//       if (userData) {
//         const labels = Object.keys(userData); // Assuming keys are activity names
//         const data = Object.values(userData); // Assuming values are time spent
//         const newData = {
//           labels: labels,
//           datasets: [
//             {
//               label: 'Time Spent',
//               data: data,
//               fill: false,
//               backgroundColor: 'rgba(75,192,192,0.4)',
//               borderColor: 'rgba(75,192,192,1)',
//             },
//           ],
//         };
//         setActivityData(newData);
//       }
//     });

//     // Clean up Firebase listener on component unmount
//     return () => dbRef.off('value');
//   }, []);

//   return (
//     <div>
//       <h2>Activity Analysis</h2>
//       <Line
//         data={activityData}
//         options={{
//           scales: {
//             x: {
//               type: 'category',
//               title: {
//                 display: true,
//                 text: 'Activity',
//               },
//             },
//             y: {
//               type: 'linear',
//               title: {
//                 display: true,
//                 text: 'Time Spent (minutes)',
//               },
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default Result;
