
// import React, { useState, useEffect, useRef } from "react";
// import { database } from "/Users/adarshkumar/tracker-app/src/firebase.js";
// import { ref, push, remove, onValue, update,set  } from "firebase/database";
// import { FaPause, FaPlay } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
// import CustomNavbar from "../NavBar/NavBar";
// import { auth } from "/Users/adarshkumar/tracker-app/src/firebase.js"; 



// import "bootstrap-icons/font/bootstrap-icons.css";

// const ActivityTracker = () => {
//   const [activities, setActivities] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [timerState, setTimerState] = useState({});
//   const intervalRefs = useRef({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [deletedActivityIds, setDeletedActivityIds] = useState([]);

//   const [user, setUser] = useState(null); // State to store authenticated user

//   useEffect(() => {
//     const unsubscribeAuth = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });
//     return () => {
//       unsubscribeAuth();
//     };
//   }, []);

//   useEffect(() => {
//     if (user) {
//       const activitiesRef = ref(database, `activities/${user.uid}`);
//       const unsubscribeActivities = onValue(activitiesRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           const activityList = Object.keys(data).map((key) => ({
//             id: key,
//             name: data[key].name,
//             instances: data[key].instances || [],
//             showInstances: false,
//             elapsedTime: data[key].elapsedTime || 0,
//             status: data[key].status || "active",
//           }));
//           setActivities(activityList);
//         } else {
//           setActivities([]);
//         }
//       });

//       return () => {
//         unsubscribeActivities();
//         Object.values(intervalRefs.current).forEach((interval) =>
//           clearInterval(interval)
//         );
//       };
//     }
//   }, [user]);


  
  
//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter" && inputValue.trim() !== "") {
//         const existingActivity = activities.find(
//             (activity) => activity.name === inputValue.trim()
//         );
//         if (existingActivity) {
//             alert(`Activity "${inputValue.trim()}" already exists!`);
//             return;
//         }

//         const newActivity = {
//             name: inputValue.trim(),
//             instances: [],
//             showInstances: false,
//             // elapsedTime: 0,
//             startTime: Date.now(), // Set startTime as a timestamp representing the current time
//         };
//         setActivities((prevActivities) => [...prevActivities, newActivity]);
//         setInputValue("");
//         saveActivity(newActivity);

//         // Start timer for the newly created activity
//         // startTimer(newActivity.id);
//     }
// };


//   const saveActivity = (newActivity) => {
//     try {
//       const user = auth.currentUser; // Get the currently authenticated user
//       if (user) {
//         const activitiesRef = ref(database, `activities/${user.uid}`); // Use the user's UID as part of the path
//         push(activitiesRef, newActivity);
//       } else {
//         console.error("No user is currently authenticated.");
//       }
//     } catch (error) {
//       console.error("Error saving activity:", error);
//     }
//   };


//   const startTimer = (activityId) => {
//   // Stop timer for other activities
//   Object.keys(timerState).forEach((key) => {
//     if (key !== activityId && timerState[key] === "started") {
//       stopTimer(key);
//     }
//   });

//   // Clear all interval timers
//   Object.values(intervalRefs.current).forEach((interval) =>
//     clearInterval(interval)
//   );

//   // Get the current time as start time
//   const startTime = Date.now();
//   console.log(startTime + "time");
  

//   // Update activity status and start time in the database in real-time
//   const activityRef = ref(
//     database,
//     `activities/${auth.currentUser.uid}/${activityId}`
//   );
//   update(activityRef, {
//     status: "started",
    
//   });

   
//   const activity = activities.find((activity) => activity.id === activityId);
//   const instance = {
//     // startTime: new Date(stopTime - activity.elapsedTime * 1000).toLocaleString(),
//     startTime: new Date(startTime).toLocaleString(),
//     elapsedTime: activity.elapsedTime,
//   };
//   const updatedInstances = [...activity.instances, instance];

//   update(activityRef, {
//     instances: updatedInstances,
//     elapsedTime: 0,
//   });

//   // Start new timer for the selected activity
//   intervalRefs.current[activityId] = setInterval(() => {
//     const elapsedTime = Math.floor(
//       (Date.now() -
//         startTime +
//         activities.find((activity) => activity.id === activityId).elapsedTime *
//           1000) /
//         1000
//     );
//     setActivities((prevActivities) =>
//       prevActivities.map((activity) =>
//         activity.id === activityId ? { ...activity, elapsedTime } : activity
//       )
//     );
//   }, 1000);

//   // Update timer state
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "started",
//   }));

//   // Set startTime directly in the activity object
//   setActivities((prevActivities) =>
//     prevActivities.map((activity) =>
//       activity.id === activityId ? { ...activity, startTime } : activity
//     )
//   );
// };
  

// // const startTimer = (activityId) => {
// //   // Stop timer for other activities
// //   Object.keys(timerState).forEach((key) => {
// //     if (key !== activityId && timerState[key] === "started") {
// //       stopTimer(key);
// //     }
// //   });

// //   // Clear all interval timers
// //   Object.values(intervalRefs.current).forEach((interval) =>
// //     clearInterval(interval)
// //   );

// //   // Get the current time as start time
// //   const startTime = Date.now();
// //   console.log(startTime + "time");
  

// //   // Update activity status and start time in the database in real-time
// //   const activityRef = ref(
// //     database,
// //     `activities/${auth.currentUser.uid}/${activityId}`
// //   );
// //   update(activityRef, {
// //     status: "started",
    
// //   });

// //   // Start new timer for the selected activity
// //   intervalRefs.current[activityId] = setInterval(() => {
// //     const elapsedTime = Math.floor(
// //       (Date.now() -
// //         startTime +
// //         activities.find((activity) => activity.id === activityId).elapsedTime *
// //           1000) /
// //         1000
// //     );
// //     setActivities((prevActivities) =>
// //       prevActivities.map((activity) =>
// //         activity.id === activityId ? { ...activity, elapsedTime } : activity
// //       )
// //     );
// //   }, 1000);

// //   // Update timer state
// //   setTimerState((prevTimerState) => ({
// //     ...prevTimerState,
// //     [activityId]: "started",
// //   }));

// //   // Set startTime directly in the activity object
// //   setActivities((prevActivities) =>
// //     prevActivities.map((activity) =>
// //       activity.id === activityId ? { ...activity, startTime } : activity
// //     )
// //   );
// // };



// const pauseTimer = (activityId) => {
//   clearInterval(intervalRefs.current[activityId]);
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "paused",
//   }));
// };
  
  


  

  
  
  
  
// const resumeTimer = (activityId) => {
//   const startTime = Date.now();
//   intervalRefs.current[activityId] = setInterval(() => {
//     const elapsedTime = Math.floor(
//       (Date.now() -
//         startTime +
//         activities.find((activity) => activity.id === activityId)
//           .elapsedTime *
//           1000) /
//         1000
//     );
//     setActivities((prevActivities) =>
//       prevActivities.map((activity) =>
//         activity.id === activityId ? { ...activity, elapsedTime } : activity
//       )
//     );
//   }, 1000);
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "started",
//   }));
// };

  
  
  
  

// const stopTimer = (activityId) => {
//   clearInterval(intervalRefs.current[activityId]);

//   // Get the current time as stop time
//   const stopTime = Date.now();

//   // Update activity status and stop time in the database in real-time
//   const activityRef = ref(
//     database,
//     `activities/${auth.currentUser.uid}/${activityId}`
//   );
//   update(activityRef, {
//     status: "stopped",
//     stopTime: stopTime,
//   }).then(() => {
//     // Get the activity and its instances
//     const activity = activities.find((activity) => activity.id === activityId);
//     const updatedInstances = activity.instances.map((instance) => {
//       // Find the instance that matches the start time with the current activity
//       if (instance.startTime === new Date(activity.startTime).toLocaleString()) {
//         // Update the stop time and calculate the elapsed time
//         instance.stopTime = new Date(stopTime).toLocaleString();
//         instance.elapsedTime = Math.floor((stopTime - new Date(activity.startTime).getTime()) / 1000);
//       }
//       return instance;
//     });

//     // Update the instances array in the database
//     update(activityRef, {
//       instances: updatedInstances,
//       elapsedTime: 0,
//     }).catch((error) => {
//       console.error("Error updating instances:", error);
//     });
//   }).catch((error) => {
//     console.error("Error updating activity status:", error);
//   });

//   // Update UI by resetting the elapsed time
//   setActivities((prevActivities) =>
//     prevActivities.map((activity) =>
//       activity.id === activityId ? { ...activity, elapsedTime: 0 } : activity
//     )
//   );

//   // Update timer state
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "stopped",
//   }));
// };



  
//   const deleteActivity = (activityId) => {
//     clearInterval(intervalRefs.current[activityId]);

//     // Mark activity as deleted in the database
//     const activityRef = ref(
//       database,
//       `activities/${auth.currentUser.uid}/${activityId}`
//     ); // Update the activity path
//     update(activityRef, { status: "deleted" }); // Update status to 'deleted'

//     // Update UI by removing the deleted activity
//     setActivities((prevActivities) =>
//       prevActivities.filter((activity) => activity.id !== activityId)
//     );

//     // Store the deleted activity ID persistently
//     const updatedDeletedActivityIds = [...deletedActivityIds, activityId];
//     localStorage.setItem(
//       "deletedActivityIds",
//       JSON.stringify(updatedDeletedActivityIds)
//     );
//   };

//   // const toggleInstances = (activityId) => {
//   //   setActivities((prevActivities) =>
//   //     prevActivities.map((activity) =>
//   //       activity.id === activityId
//   //         ? { ...activity, showInstances: !activity.showInstances }
//   //         : activity
//   //     )
//   //   );
//   // };
//   const toggleInstances = (activityId) => {
//     // Get the current activity
//     const activity = activities.find((activity) => activity.id === activityId);
//     if (!activity) {
//         console.error("Activity not found:", activityId);
//         return;
//     }

//     // Update the showInstances property of the activity in the database
//     const activityRef = ref(database, `activities/${auth.currentUser.uid}/${activityId}`);
//     update(activityRef, { showInstances: !activity.showInstances });

//     // Update the local state to reflect the change
//     setActivities((prevActivities) =>
//         prevActivities.map((activity) =>
//             activity.id === activityId ? { ...activity, showInstances: !activity.showInstances } : activity
//         )
//     );
// };

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   // Filter out deleted activities before rendering
//   const filteredActivities = activities.filter(
//     (activity) =>
//       activity && // Check if activity is defined
//       activity.name && // Check if activity has a name property
//       typeof activity.name === "string" && // Check if name is a string (optional, depending on your data)
//       activity.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !deletedActivityIds.includes(activity.id) && // Filter out deleted activities
//       activity.status !== "deleted" // Filter out deleted activities
//   );


//   const calculateTotalTimeSpent = (activity) => {
//     let totalTimeSpent = 0;
//     activity.instances.forEach((instance) => {
//       totalTimeSpent += instance.elapsedTime;
//     });
//     return totalTimeSpent;
//   };

//   return (
//     <div>
//       <CustomNavbar handleSearch={handleSearch} />
//       <input
//         type="text"
//         placeholder="Enter activity name"
//         value={inputValue}
//         onChange={handleInputChange}
//         onKeyPress={handleKeyPress}
//         style={{
//           position: "sticky",
//           top: "0",
//           borderRadius: "10px",
//           padding: "8px",
//           margin: "8px 0",
//           width: "100%",
//           marginTop: "5%",
//           backgroundColor: "#f0f0f0",
//           border: "1px solid #ccc",
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//         }}
//       />
//       <div
//         style={{
//           maxHeight: "calc(100vh - 200px)", // Adjust the max height as needed
//           overflowY: "auto",
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "10px",
//         }}
//       >
//         {filteredActivities.map((activity) => (
//           <div
//             key={activity.id}
//             style={{
//               border: "1.5px solid #ccc",
//               padding: "20px",
//               margin: "10px 0",
//               borderRadius: "10px",
//               position: "relative",
//               minWidth: "200px",
//               width: "calc(33.33% - 10px)",
//               backgroundColor: "white",
//             }}
//           >
//             <FontAwesomeIcon
//               icon={faTimesCircle}
//               style={{
//                 position: "absolute",
//                 top: "2px",
//                 right: "1px",
//                 cursor: "pointer",
//                 color: "#e32400",
//               }}
//               onClick={() => deleteActivity(activity.id)}
//             />

//             <div style={{ backgroundColor: "pink", borderRadius: "40px" }}>
//               <h3 className="text-3xl font-bold underline  text-center ">
//                 {activity.name}
//               </h3>
//             </div>

//             <div
//               style={{ textAlign: "center", fontSize: "40px", color: "black" }}
//             >
//               {formatTime(activity.elapsedTime)}
//             </div>

//             <div className=" ">
//               <div
//                 style={{
//                   maxHeight: "150px",
//                   overflowY: "scroll",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <div style={{ textAlign: "center", fontSize: "20px", color: "black" }}>
//     Total Time Spent: {formatTime(calculateTotalTimeSpent(activity))}
//   </div>

// {activity.showInstances && (
//   <ul className="list-group">
//     {activity.instances.map((instance, index) => {
//       // Split the start time string into components
//       const [startDate, startTime] = instance.startTime.split(", ");
//       const [startDay, startMonth, startYear] = startDate.split("/");
//       const [startHourMinute, startAmPm] = startTime.split(" ");
//       const [startHour, startMinute, startSecond] = startHourMinute.split(":");
      
//       // Create a new Date object for the start time
//       const startDateObj = new Date(`${startMonth}/${startDay}/${startYear} ${startHour}:${startMinute}:${startSecond} ${startAmPm}`);

//       // Calculate the end time based on start time and elapsed time
//       const endTimeObj = new Date(startDateObj.getTime() + instance.elapsedTime * 1000);

//       return (
//         <li key={index} className="list-group-item">
//           <div style={{ textAlign: "left", color: "black" }}>
//             <p>
//               Start Time:{" "}
//               {instance.startTime ? (
//                 startDateObj.toLocaleString([], { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }) // Use the formatted start time
//               ) : (
//                 "N/A"
//               )}
//             </p>
//             <p>
//               End Time:{" "}
//               {endTimeObj.toLocaleString([], { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })} {/* Use the formatted end time */}
//             </p>
//             <p>Elapsed Time: {instance.elapsedTime} sec</p>
//           </div>
//         </li>
//       );
//     })}
//   </ul>
// )}





//               </div>
//               {timerState[activity.id] === "started" ? (
//         <button className="px-3 py-2" onClick={() => pauseTimer(activity.id)}>
//           <FaPause /> 
//         </button>
//       ) : timerState[activity.id] === "paused" ? (
//         <button className="px-3 py-2" onClick={() => resumeTimer(activity.id)}>
//           <FaPlay /> 
//         </button>
//       ) : (
//         <button className="px-3 py-2" onClick={() => startTimer(activity.id)}>
//           <FaPlay /> 
//         </button>
//       )}
  
// {/* <button className="px-3 py-2" onClick={() => resumeTimer(activity.id)}>
//   <FaPlay />
//   Resume
// </button> */}

//               <button
//                 className="px-3 py-2 "
//                 onClick={() => stopTimer(activity.id)}
//               >
//                 <i class="bi bi-stop-circle-fill"></i>
//               </button>

//               <button
//                 className="px-3 py-2 "
//                 onClick={() => toggleInstances(activity.id)}
//               >
//                 <i class="bi bi-arrows-angle-expand"></i>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActivityTracker;
















import React, { useState, useEffect, useRef } from "react";
import { database } from "/Users/adarshkumar/tracker-app/src/firebase.js";
import { ref, push, remove, onValue, update,set  } from "firebase/database";
import { FaPause, FaPlay } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CustomNavbar from "../NavBar/NavBar";
import { auth } from "/Users/adarshkumar/tracker-app/src/firebase.js"; 



import "bootstrap-icons/font/bootstrap-icons.css";

const ActivityTracker = () => {
  const [activities, setActivities] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [timerState, setTimerState] = useState({});
  const intervalRefs = useRef({});
  const [searchQuery, setSearchQuery] = useState("");
  const [deletedActivityIds, setDeletedActivityIds] = useState([]);

  const [user, setUser] = useState(null); // State to store authenticated user

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribeAuth();
    };
  }, []);

  useEffect(() => {
    if (user) {
      const activitiesRef = ref(database, `activities/${user.uid}`);
      const unsubscribeActivities = onValue(activitiesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const activityList = Object.keys(data).map((key) => {
            const activityData = data[key];

            
            // Get the most recent instance's start time
            
            const lastInstance = activityData.instances && activityData.instances.length > 0 ? activityData.instances[activityData.instances.length - 1] : null;
            const startTime = lastInstance ? lastInstance.startTime : null;
  
            // Calculate elapsedTime based on startTime
            const currentTime = Date.now();
            let elapsedTime = activityData.elapsedTime || 0;
            if (activityData.status === 'started' && startTime) {
              elapsedTime += Math.floor((currentTime - startTime + activityData.elapsedTime * 1000) / 1000);
            }
  
            // Log the start time and elapsedTime
            console.log(`Activity: ${activityData.name}, Start Time: ${startTime}, Elapsed Time: ${elapsedTime}`);
  
            return {
              id: key,
              name: activityData.name,
              instances: activityData.instances || [],
              showInstances: activityData.showInstances || false,
              elapsedTime: elapsedTime,
              status: activityData.status || "active",
              startTime: startTime,
              timerState: activityData.timerState || "stopped",
            };
          });
          setActivities(activityList);
        } else {
          setActivities([]);
        }
      });
  
      return () => {
        unsubscribeActivities();
        Object.values(intervalRefs.current).forEach((interval) =>
          clearInterval(interval)
        );
      };
    }
  }, [user]);
  
  


  
  
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      const existingActivity = activities.find(
        (activity) => activity.name === inputValue.trim()
      );
      if (existingActivity) {
        alert(`Activity "${inputValue.trim()}" already exists!`);
        return;
      }

      const newActivity = {
        name: inputValue.trim(),
        instances: [],
        showInstances: false,
        startTime: Date.now(), // Set startTime as a timestamp representing the current time

      };
      setActivities((prevActivities) => [...prevActivities, newActivity]);
      setInputValue("");
      saveActivity(newActivity);

      // Simulate click on start timer button

    }
  };
  
  
  
  
  


  const saveActivity = (newActivity) => {
  
    try {
      const user = auth.currentUser; // Get the currently authenticated user
      if (user) {
        const activitiesRef = ref(database, `activities/${user.uid}`); // Use the user's UID as part of the path
        push(activitiesRef, newActivity);
        startTimer(newActivity.id);
      } else {
        console.error("No user is currently authenticated.");
      }
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };


  const startTimer = (activityId) => {
   
    console.log("Starting timer for activity:", activityId);
    const activity = activities.find((activity) => activity.id === activityId);
    if (!activity) {
      console.error("Activity not found:", activityId);
      return;
    }
  
    // Stop timer for other activities
    Object.keys(timerState).forEach((key) => {
      if (key !== activityId && timerState[key] === "started") {
        stopTimer(key);
      }
    });
  
    // Clear all interval timers
    Object.values(intervalRefs.current).forEach((interval) =>
      clearInterval(interval)
    );
  
    // Get the current time as start time
    const startTime = Date.now();
  
    const instance = {
      startTime: startTime,
      elapsedTime: activity ? activity.elapsedTime : 0, // Check if activity is defined
    };
    const updatedInstances = [...activity.instances, instance];
    // Update activity status and start time in the database in real-time
  
    const activityRef = ref(
      database,
      `activities/${auth.currentUser.uid}/${activityId}`
    );
    update(activityRef, {
      status: "started",
    });
    update(activityRef, {
      instances: updatedInstances,
      elapsedTime: 0,
    });
  
    // Start new timer for the selected activity
    intervalRefs.current[activityId] = setInterval(() => {
      const elapsedTime = Math.floor(
        (Date.now() -
          startTime +
          (activity ? activity.elapsedTime : 0) * 1000) /
          1000
      );
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.id === activityId ? { ...activity, elapsedTime } : activity
        )
      );
    }, 1000);
  
    // Update timer state
    setTimerState((prevTimerState) => ({
      ...prevTimerState,
      [activityId]: "started",
    }));
  
    // Set startTime directly in the activity object
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === activityId ? { ...activity, startTime } : activity
      )
    );
  };
  

//   const startTimer = (activityId) => {
//   // Stop timer for other activities
//   Object.keys(timerState).forEach((key) => {
//     if (key !== activityId && timerState[key] === "started") {
//       stopTimer(key);
//     }
//   });

//   // Clear all interval timers
//   Object.values(intervalRefs.current).forEach((interval) =>
//     clearInterval(interval)
//   );

//   // Get the current time as start time
//   const startTime = Date.now()
//   // console.log(startTime + "time");
  



  
//   const activity = activities.find((activity) => activity.id === activityId);
//   const instance = {
//     startTime: startTime,
//     // startTime: new Date(startTime),
//     // startTime: new Date(startTime).toLocaleString(),
//     elapsedTime: activity.elapsedTime,
//   };
//   const updatedInstances = [...activity.instances, instance];
//  // Update activity status and start time in the database in real-time

//  const activityRef = ref(
//   database,
//   `activities/${auth.currentUser.uid}/${activityId}`
// );
// update(activityRef, {
//   status: "started",
  
// });
//   update(activityRef, {
//     instances: updatedInstances,
//     // elapsedTime: 0,
//   });

//   // Start new timer for the selected activity
//   intervalRefs.current[activityId] = setInterval(() => {
//     const elapsedTime = Math.floor(
//       (Date.now() -
//         startTime +
//         activities.find((activity) => activity.id === activityId).elapsedTime *
//           1000) /
//         1000
//     );
//     setActivities((prevActivities) =>
//       prevActivities.map((activity) =>
//         activity.id === activityId ? { ...activity, elapsedTime } : activity
//       )
//     );
//   }, 1000);

//   // Update timer state
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "started",
//   }));

//   // Set startTime directly in the activity object
//   setActivities((prevActivities) =>
//     prevActivities.map((activity) =>
//       activity.id === activityId ? { ...activity, startTime } : activity
//     )
//   );
// };
  





const pauseTimer = (activityId) => {
  clearInterval(intervalRefs.current[activityId]);
  setTimerState((prevTimerState) => ({
    ...prevTimerState,
    [activityId]: "paused",
  }));
};
  
  


  

  
  
  
  
const resumeTimer = (activityId) => {
  const startTime = Date.now();
  intervalRefs.current[activityId] = setInterval(() => {
    const elapsedTime = Math.floor(
      (Date.now() -
        startTime +
        activities.find((activity) => activity.id === activityId)
          .elapsedTime *
          1000) /
        1000
    );
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === activityId ? { ...activity, elapsedTime } : activity
      )
    );
  }, 1000);
  setTimerState((prevTimerState) => ({
    ...prevTimerState,
    [activityId]: "started",
  }));
};

  
  
  
  

const stopTimer = (activityId) => {
  clearInterval(intervalRefs.current[activityId]);

  // Get the current time as stop time
  const stopTime = Date.now();

  // Update the stop time in the latest instance
  const activity = activities.find((activity) => activity.id === activityId);
  const activityRef = ref(
    database,
    `activities/${auth.currentUser.uid}/${activityId}`
  );
  update(activityRef, {
    status: "stopped",
    
  });
  if (activity) {
    const latestInstance = activity.instances && activity.instances.length > 0 ? activity.instances[activity.instances.length - 1] : null;
    if (latestInstance) {
      latestInstance.stopTime = stopTime;
      latestInstance.elapsedTime = Math.floor((stopTime - new Date(latestInstance.startTime).getTime()) / 1000);

      // Update the instance in the database
      const activityRef = ref(database, `activities/${auth.currentUser.uid}/${activityId}`);
      update(activityRef, {
        instances: activity.instances,
        elapsedTime: 0, // Reset elapsed time for the activity
      }).then(() => {
        // Update UI by resetting the elapsed time
        setActivities((prevActivities) =>
          prevActivities.map((activity) =>
            activity.id === activityId ? { ...activity, elapsedTime: 0 } : activity
          )
        );
      }).catch((error) => {
        console.error("Error updating instance:", error);
      });
    }
  }

  // Update timer state
  setTimerState((prevTimerState) => ({
    ...prevTimerState,
    [activityId]: "stopped",
  }));
};




  
  const deleteActivity = (activityId) => {
    clearInterval(intervalRefs.current[activityId]);

    // Mark activity as deleted in the database
    const activityRef = ref(
      database,
      `activities/${auth.currentUser.uid}/${activityId}`
    ); // Update the activity path
    update(activityRef, { status: "deleted" }); // Update status to 'deleted'

    // Update UI by removing the deleted activity
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== activityId)
    );

    // Store the deleted activity ID persistently
    const updatedDeletedActivityIds = [...deletedActivityIds, activityId];
    localStorage.setItem(
      "deletedActivityIds",
      JSON.stringify(updatedDeletedActivityIds)
    );
  };

  // const toggleInstances = (activityId) => {
  //   setActivities((prevActivities) =>
  //     prevActivities.map((activity) =>
  //       activity.id === activityId
  //         ? { ...activity, showInstances: !activity.showInstances }
  //         : activity
  //     )
  //   );
  // };
  
  const toggleInstances = (activityId) => {
    const activity = activities.find((activity) => activity.id === activityId);
    if (!activity) {
        console.error("Activity not found:", activityId);
        return;
    }

    const updatedActivities = activities.map((act) =>
        act.id === activityId ? { ...act, showInstances: !act.showInstances } : act
    );
    setActivities(updatedActivities);

    // Update the showInstances property of the activity in the database
    const activityRef = ref(database, `activities/${auth.currentUser.uid}/${activityId}`);
    update(activityRef, { showInstances: !activity.showInstances })
        .then(() => {
            console.log("Show instances toggled successfully in the database.");
        })
        .catch((error) => {
            console.error("Error toggling show instances in the database:", error);
            // Revert the local state change if there's an error
            setActivities(activities); // Restore previous state
        });
};





  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Filter out deleted activities before rendering
  const filteredActivities = activities.filter(
    (activity) =>
      activity && // Check if activity is defined
      activity.name && // Check if activity has a name property
      typeof activity.name === "string" && // Check if name is a string (optional, depending on your data)
      activity.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !deletedActivityIds.includes(activity.id) && // Filter out deleted activities
      activity.status !== "deleted" // Filter out deleted activities
  );


  const calculateTotalTimeSpent = (activity) => {
    let totalTimeSpent = 0;
    activity.instances.forEach((instance) => {
      totalTimeSpent += instance.elapsedTime;
    });
    return totalTimeSpent;
  };

  return (
    <div>
      <CustomNavbar handleSearch={handleSearch} />
      <input
        type="text"
        placeholder="Enter activity name"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        style={{
          position: "sticky",
          top: "0",
          borderRadius: "10px",
          padding: "8px",
          margin: "8px 0",
          width: "100%",
          marginTop: "5%",
          backgroundColor: "#f0f0f0",
          border: "1px solid #ccc",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />
      <div
        style={{
          maxHeight: "calc(100vh - 200px)", // Adjust the max height as needed
          overflowY: "auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        {filteredActivities.map((activity) => (
          <div
            key={activity.id}
            style={{
              border: "1.5px solid #ccc",
              padding: "20px",
              margin: "10px 0",
              borderRadius: "10px",
              position: "relative",
              minWidth: "200px",
              width: "calc(33.33% - 10px)",
              backgroundColor: "white",
            }}
          >
            <FontAwesomeIcon
              icon={faTimesCircle}
              style={{
                position: "absolute",
                top: "2px",
                right: "1px",
                cursor: "pointer",
                color: "#e32400",
              }}
              onClick={() => deleteActivity(activity.id)}
            />

            <div style={{ backgroundColor: "pink", borderRadius: "40px" }}>
              <h3 className="text-3xl font-bold underline  text-center ">
                {activity.name}
              </h3>
            </div>

            <div
              style={{ textAlign: "center", fontSize: "40px", color: "black" }}
            >
              {formatTime(activity.elapsedTime)}
            </div>

            <div className=" ">
              <div
                style={{
                  maxHeight: "150px",
                  overflowY: "scroll",
                  borderRadius: "10px",
                }}
              >
                <div style={{ textAlign: "center", fontSize: "20px", color: "black" }}>
    Total Time Spent: {formatTime(calculateTotalTimeSpent(activity))}
  </div>

  {activity.showInstances && (
  <ul className="list-group">
    {activity.instances.map((instance, index) => {
      // Check if instance.startTime is a string before splitting it
      if (typeof instance.startTime !== 'string') {
        console.error('Invalid instance.startTime:', instance.startTime);
        return null; // Skip rendering this instance
      }

      // Split the start time string into components
      const [startDate, startTime] = instance.startTime.split(", ");
      const [startDay, startMonth, startYear] = startDate.split("/");
      const [startHourMinute, startAmPm] = startTime.split(" ");
      const [startHour, startMinute, startSecond] = startHourMinute.split(":");
      
      // Create a new Date object for the start time
      const startDateObj = new Date(`${startMonth}/${startDay}/${startYear} ${startHour}:${startMinute}:${startSecond} ${startAmPm}`);

      // Calculate the end time based on start time and elapsed time
      const endTimeObj = new Date(startDateObj.getTime() + instance.elapsedTime * 1000);

      return (
        <li key={index} className="list-group-item">
          <div style={{ textAlign: "left", color: "black" }}>
            <p>
              Start Time:{" "}
              {instance.startTime ? (
                startDateObj.toLocaleString([], { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }) // Use the formatted start time
              ) : (
                "N/A"
              )}
            </p>
            <p>
              End Time:{" "}
              {endTimeObj.toLocaleString([], { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })} {/* Use the formatted end time */}
            </p>
            <p>Elapsed Time: {instance.elapsedTime} sec</p>
          </div>
        </li>
      );
    })}
  </ul>
)}





              </div>
              {timerState[activity.id] === "started" ? (
        <button className="px-3 py-2" onClick={() => pauseTimer(activity.id)}>
          <FaPause /> 
        </button>
      ) : timerState[activity.id] === "paused" ? (
        <button className="px-3 py-2" onClick={() => resumeTimer(activity.id)}>
          <FaPlay /> 
        </button>
      ) : (
      <button className="px-3 py-2" onClick={() => startTimer(activity.id)}>
          <FaPlay /> 
        </button>
      )}
  


              <button
                className="px-3 py-2 "
                onClick={() => stopTimer(activity.id)}
              >
                <i class="bi bi-stop-circle-fill"></i>
              </button>

              <button
                className="px-3 py-2 "
                onClick={() => toggleInstances(activity.id)}
              >
                <i class="bi bi-arrows-angle-expand"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityTracker;









// import React, { useState, useEffect, useRef } from "react";
// import { database } from "/Users/adarshkumar/tracker-app/src/firebase.js";
// import { ref, push, remove, onValue, update,set  } from "firebase/database";
// import { FaPause, FaPlay } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
// import CustomNavbar from "../NavBar/NavBar";
// import { auth } from "/Users/adarshkumar/tracker-app/src/firebase.js"; 



// import "bootstrap-icons/font/bootstrap-icons.css";

// const ActivityTracker = () => {
//   const [activities, setActivities] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [timerState, setTimerState] = useState({});
//   const intervalRefs = useRef({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [deletedActivityIds, setDeletedActivityIds] = useState([]);

//   const [user, setUser] = useState(null); // State to store authenticated user

//   useEffect(() => {
//     const unsubscribeAuth = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });
//     return () => {
//       unsubscribeAuth();
//     };
//   }, []);

//   useEffect(() => {
//     if (user) {
//       const activitiesRef = ref(database, `activities/${user.uid}`);
//       const unsubscribeActivities = onValue(activitiesRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           const activityList = Object.keys(data).map((key) => ({
//             id: key,
//             name: data[key].name,
//             instances: data[key].instances || [],
//             showInstances: false,
//             elapsedTime: data[key].elapsedTime || 0,
//             status: data[key].status || "active",
//           }));
//           setActivities(activityList);
//         } else {
//           setActivities([]);
//         }
//       });

//       return () => {
//         unsubscribeActivities();
//         Object.values(intervalRefs.current).forEach((interval) =>
//           clearInterval(interval)
//         );
//       };
//     }
//   }, [user]);


  
  
//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter" && inputValue.trim() !== "") {
//         const existingActivity = activities.find(
//             (activity) => activity.name === inputValue.trim()
//         );
//         if (existingActivity) {
//             alert(`Activity "${inputValue.trim()}" already exists!`);
//             return;
//         }

//         const newActivity = {
//             name: inputValue.trim(),
//             instances: [],
//             showInstances: false,
//             // elapsedTime: 0,
//             startTime: Date.now(), // Set startTime as a timestamp representing the current time
//         };
//         setActivities((prevActivities) => [...prevActivities, newActivity]);
//         setInputValue("");
//         saveActivity(newActivity);

//         // Start timer for the newly created activity
//         // startTimer(newActivity.id);
//     }
// };


//   const saveActivity = (newActivity) => {
//     try {
//       const user = auth.currentUser; // Get the currently authenticated user
//       if (user) {
//         const activitiesRef = ref(database, `activities/${user.uid}`); // Use the user's UID as part of the path
//         push(activitiesRef, newActivity);
//       } else {
//         console.error("No user is currently authenticated.");
//       }
//     } catch (error) {
//       console.error("Error saving activity:", error);
//     }
//   };


//   const startTimer = (activityId) => {
//   // Stop timer for other activities
//   Object.keys(timerState).forEach((key) => {
//     if (key !== activityId && timerState[key] === "started") {
//       stopTimer(key);
//     }
//   });

//   // Clear all interval timers
//   Object.values(intervalRefs.current).forEach((interval) =>
//     clearInterval(interval)
//   );

//   // Get the current time as start time
//   const startTime = Date.now();
//   console.log(startTime + "time");
  

//   // Update activity status and start time in the database in real-time
//   const activityRef = ref(
//     database,
//     `activities/${auth.currentUser.uid}/${activityId}`
//   );
//   update(activityRef, {
//     status: "started",
    
//   });

   
//   const activity = activities.find((activity) => activity.id === activityId);
//   const instance = {
//     // startTime: new Date(stopTime - activity.elapsedTime * 1000).toLocaleString(),
//     startTime: new Date(startTime).toLocaleString(),
//     elapsedTime: activity.elapsedTime,
//   };
//   const updatedInstances = [...activity.instances, instance];

//   update(activityRef, {
//     instances: updatedInstances,
//     elapsedTime: 0,
//   });

//   // Start new timer for the selected activity
//   intervalRefs.current[activityId] = setInterval(() => {
//     const elapsedTime = Math.floor(
//       (Date.now() -
//         startTime +
//         activities.find((activity) => activity.id === activityId).elapsedTime *
//           1000) /
//         1000
//     );
//     setActivities((prevActivities) =>
//       prevActivities.map((activity) =>
//         activity.id === activityId ? { ...activity, elapsedTime } : activity
//       )
//     );
//   }, 1000);

//   // Update timer state
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "started",
//   }));

//   // Set startTime directly in the activity object
//   setActivities((prevActivities) =>
//     prevActivities.map((activity) =>
//       activity.id === activityId ? { ...activity, startTime } : activity
//     )
//   );
// };
  

// // const startTimer = (activityId) => {
// //   // Stop timer for other activities
// //   Object.keys(timerState).forEach((key) => {
// //     if (key !== activityId && timerState[key] === "started") {
// //       stopTimer(key);
// //     }
// //   });

// //   // Clear all interval timers
// //   Object.values(intervalRefs.current).forEach((interval) =>
// //     clearInterval(interval)
// //   );

// //   // Get the current time as start time
// //   const startTime = Date.now();
// //   console.log(startTime + "time");
  

// //   // Update activity status and start time in the database in real-time
// //   const activityRef = ref(
// //     database,
// //     `activities/${auth.currentUser.uid}/${activityId}`
// //   );
// //   update(activityRef, {
// //     status: "started",
    
// //   });

// //   // Start new timer for the selected activity
// //   intervalRefs.current[activityId] = setInterval(() => {
// //     const elapsedTime = Math.floor(
// //       (Date.now() -
// //         startTime +
// //         activities.find((activity) => activity.id === activityId).elapsedTime *
// //           1000) /
// //         1000
// //     );
// //     setActivities((prevActivities) =>
// //       prevActivities.map((activity) =>
// //         activity.id === activityId ? { ...activity, elapsedTime } : activity
// //       )
// //     );
// //   }, 1000);

// //   // Update timer state
// //   setTimerState((prevTimerState) => ({
// //     ...prevTimerState,
// //     [activityId]: "started",
// //   }));

// //   // Set startTime directly in the activity object
// //   setActivities((prevActivities) =>
// //     prevActivities.map((activity) =>
// //       activity.id === activityId ? { ...activity, startTime } : activity
// //     )
// //   );
// // };



// const pauseTimer = (activityId) => {
//   clearInterval(intervalRefs.current[activityId]);
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "paused",
//   }));
// };
  
  


  

  
  
  
  
// const resumeTimer = (activityId) => {
//   const startTime = Date.now();
//   intervalRefs.current[activityId] = setInterval(() => {
//     const elapsedTime = Math.floor(
//       (Date.now() -
//         startTime +
//         activities.find((activity) => activity.id === activityId)
//           .elapsedTime *
//           1000) /
//         1000
//     );
//     setActivities((prevActivities) =>
//       prevActivities.map((activity) =>
//         activity.id === activityId ? { ...activity, elapsedTime } : activity
//       )
//     );
//   }, 1000);
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "started",
//   }));
// };

  
  
  
  

// const stopTimer = (activityId) => {
//   clearInterval(intervalRefs.current[activityId]);

//   // Get the current time as stop time
//   const stopTime = Date.now();

//   // Update activity status and stop time in the database in real-time
//   const activityRef = ref(
//     database,
//     `activities/${auth.currentUser.uid}/${activityId}`
//   );
//   update(activityRef, {
//     status: "stopped",
//     stopTime: stopTime,
//   }).then(() => {
//     // Get the activity and its instances
//     const activity = activities.find((activity) => activity.id === activityId);
//     const updatedInstances = activity.instances.map((instance) => {
//       // Find the instance that matches the start time with the current activity
//       if (instance.startTime === new Date(activity.startTime).toLocaleString()) {
//         // Update the stop time and calculate the elapsed time
//         instance.stopTime = new Date(stopTime).toLocaleString();
//         instance.elapsedTime = Math.floor((stopTime - new Date(activity.startTime).getTime()) / 1000);
//       }
//       return instance;
//     });

//     // Update the instances array in the database
//     update(activityRef, {
//       instances: updatedInstances,
//       elapsedTime: 0,
//     }).catch((error) => {
//       console.error("Error updating instances:", error);
//     });
//   }).catch((error) => {
//     console.error("Error updating activity status:", error);
//   });

//   // Update UI by resetting the elapsed time
//   setActivities((prevActivities) =>
//     prevActivities.map((activity) =>
//       activity.id === activityId ? { ...activity, elapsedTime: 0 } : activity
//     )
//   );

//   // Update timer state
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "stopped",
//   }));
// };



  
//   const deleteActivity = (activityId) => {
//     clearInterval(intervalRefs.current[activityId]);

//     // Mark activity as deleted in the database
//     const activityRef = ref(
//       database,
//       `activities/${auth.currentUser.uid}/${activityId}`
//     ); // Update the activity path
//     update(activityRef, { status: "deleted" }); // Update status to 'deleted'

//     // Update UI by removing the deleted activity
//     setActivities((prevActivities) =>
//       prevActivities.filter((activity) => activity.id !== activityId)
//     );

//     // Store the deleted activity ID persistently
//     const updatedDeletedActivityIds = [...deletedActivityIds, activityId];
//     localStorage.setItem(
//       "deletedActivityIds",
//       JSON.stringify(updatedDeletedActivityIds)
//     );
//   };

//   // const toggleInstances = (activityId) => {
//   //   setActivities((prevActivities) =>
//   //     prevActivities.map((activity) =>
//   //       activity.id === activityId
//   //         ? { ...activity, showInstances: !activity.showInstances }
//   //         : activity
//   //     )
//   //   );
//   // };
//   const toggleInstances = (activityId) => {
//     // Get the current activity
//     const activity = activities.find((activity) => activity.id === activityId);
//     if (!activity) {
//         console.error("Activity not found:", activityId);
//         return;
//     }

//     // Update the showInstances property of the activity in the database
//     const activityRef = ref(database, `activities/${auth.currentUser.uid}/${activityId}`);
//     update(activityRef, { showInstances: !activity.showInstances });

//     // Update the local state to reflect the change
//     setActivities((prevActivities) =>
//         prevActivities.map((activity) =>
//             activity.id === activityId ? { ...activity, showInstances: !activity.showInstances } : activity
//         )
//     );
// };

//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   // Filter out deleted activities before rendering
//   const filteredActivities = activities.filter(
//     (activity) =>
//       activity && // Check if activity is defined
//       activity.name && // Check if activity has a name property
//       typeof activity.name === "string" && // Check if name is a string (optional, depending on your data)
//       activity.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !deletedActivityIds.includes(activity.id) && // Filter out deleted activities
//       activity.status !== "deleted" // Filter out deleted activities
//   );


//   const calculateTotalTimeSpent = (activity) => {
//     let totalTimeSpent = 0;
//     activity.instances.forEach((instance) => {
//       totalTimeSpent += instance.elapsedTime;
//     });
//     return totalTimeSpent;
//   };

//   return (
//     <div>
//       <CustomNavbar handleSearch={handleSearch} />
//       <input
//         type="text"
//         placeholder="Enter activity name"
//         value={inputValue}
//         onChange={handleInputChange}
//         onKeyPress={handleKeyPress}
//         style={{
//           position: "sticky",
//           top: "0",
//           borderRadius: "10px",
//           padding: "8px",
//           margin: "8px 0",
//           width: "100%",
//           marginTop: "5%",
//           backgroundColor: "#f0f0f0",
//           border: "1px solid #ccc",
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//         }}
//       />
//       <div
//         style={{
//           maxHeight: "calc(100vh - 200px)", // Adjust the max height as needed
//           overflowY: "auto",
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "10px",
//         }}
//       >
//         {filteredActivities.map((activity) => (
//           <div
//             key={activity.id}
//             style={{
//               border: "1.5px solid #ccc",
//               padding: "20px",
//               margin: "10px 0",
//               borderRadius: "10px",
//               position: "relative",
//               minWidth: "200px",
//               width: "calc(33.33% - 10px)",
//               backgroundColor: "white",
//             }}
//           >
//             <FontAwesomeIcon
//               icon={faTimesCircle}
//               style={{
//                 position: "absolute",
//                 top: "2px",
//                 right: "1px",
//                 cursor: "pointer",
//                 color: "#e32400",
//               }}
//               onClick={() => deleteActivity(activity.id)}
//             />

//             <div style={{ backgroundColor: "pink", borderRadius: "40px" }}>
//               <h3 className="text-3xl font-bold underline  text-center ">
//                 {activity.name}
//               </h3>
//             </div>

//             <div
//               style={{ textAlign: "center", fontSize: "40px", color: "black" }}
//             >
//               {formatTime(activity.elapsedTime)}
//             </div>

//             <div className=" ">
//               <div
//                 style={{
//                   maxHeight: "150px",
//                   overflowY: "scroll",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <div style={{ textAlign: "center", fontSize: "20px", color: "black" }}>
//     Total Time Spent: {formatTime(calculateTotalTimeSpent(activity))}
//   </div>

// {activity.showInstances && (
//   <ul className="list-group">
//     {activity.instances.map((instance, index) => {
//       // Split the start time string into components
//       const [startDate, startTime] = instance.startTime.split(", ");
//       const [startDay, startMonth, startYear] = startDate.split("/");
//       const [startHourMinute, startAmPm] = startTime.split(" ");
//       const [startHour, startMinute, startSecond] = startHourMinute.split(":");
      
//       // Create a new Date object for the start time
//       const startDateObj = new Date(`${startMonth}/${startDay}/${startYear} ${startHour}:${startMinute}:${startSecond} ${startAmPm}`);

//       // Calculate the end time based on start time and elapsed time
//       const endTimeObj = new Date(startDateObj.getTime() + instance.elapsedTime * 1000);

//       return (
//         <li key={index} className="list-group-item">
//           <div style={{ textAlign: "left", color: "black" }}>
//             <p>
//               Start Time:{" "}
//               {instance.startTime ? (
//                 startDateObj.toLocaleString([], { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }) // Use the formatted start time
//               ) : (
//                 "N/A"
//               )}
//             </p>
//             <p>
//               End Time:{" "}
//               {endTimeObj.toLocaleString([], { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })} {/* Use the formatted end time */}
//             </p>
//             <p>Elapsed Time: {instance.elapsedTime} sec</p>
//           </div>
//         </li>
//       );
//     })}
//   </ul>
// )}





//               </div>
//               {timerState[activity.id] === "started" ? (
//         <button className="px-3 py-2" onClick={() => pauseTimer(activity.id)}>
//           <FaPause /> 
//         </button>
//       ) : timerState[activity.id] === "paused" ? (
//         <button className="px-3 py-2" onClick={() => resumeTimer(activity.id)}>
//           <FaPlay /> 
//         </button>
//       ) : (
//         <button className="px-3 py-2" onClick={() => startTimer(activity.id)}>
//           <FaPlay /> 
//         </button>
//       )}
  
// {/* <button className="px-3 py-2" onClick={() => resumeTimer(activity.id)}>
//   <FaPlay />
//   Resume
// </button> */}

//               <button
//                 className="px-3 py-2 "
//                 onClick={() => stopTimer(activity.id)}
//               >
//                 <i class="bi bi-stop-circle-fill"></i>
//               </button>

//               <button
//                 className="px-3 py-2 "
//                 onClick={() => toggleInstances(activity.id)}
//               >
//                 <i class="bi bi-arrows-angle-expand"></i>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActivityTracker;













//3 march 2:11


// import React, { useState, useEffect, useRef } from "react";
// import { database } from "/Users/adarshkumar/tracker-app/src/firebase.js";
// import { ref, push, remove, onValue, update,set  } from "firebase/database";
// import { FaPause, FaPlay } from "react-icons/fa";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
// import CustomNavbar from "../NavBar/NavBar";
// import { auth } from "/Users/adarshkumar/tracker-app/src/firebase.js"; 



// import "bootstrap-icons/font/bootstrap-icons.css";

// const ActivityTracker = () => {
//   const [activities, setActivities] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   const [timerState, setTimerState] = useState({});
//   const intervalRefs = useRef({});
//   const [searchQuery, setSearchQuery] = useState("");
//   const [deletedActivityIds, setDeletedActivityIds] = useState([]);

//   const [user, setUser] = useState(null); // State to store authenticated user

//   useEffect(() => {
//     const unsubscribeAuth = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//       } else {
//         setUser(null);
//       }
//     });
//     return () => {
//       unsubscribeAuth();
//     };
//   }, []);
//   useEffect(() => {
//     if (user) {
//       const activitiesRef = ref(database, `activities/${user.uid}`);
//       const unsubscribeActivities = onValue(activitiesRef, (snapshot) => {
//         const data = snapshot.val();
//         if (data) {
//           const activityList = Object.keys(data).map((key) => {
//             const activityData = data[key];
//             // Retrieve elapsed time from localStorage
//             const storedElapsedTime = localStorage.getItem(`elapsedTime_${key}`);
//             const elapsedTime = storedElapsedTime ? parseInt(storedElapsedTime) : 0;

//             // Get the most recent instance's start time
//             const lastInstance = activityData.instances && activityData.instances.length > 0 ? activityData.instances[activityData.instances.length - 1] : null;
//             const startTime = lastInstance ? lastInstance.startTime : null;

//             // Calculate elapsedTime based on startTime
//             const currentTime = Date.now();
//             let totalElapsedTime = elapsedTime || 0;
//             if (activityData.status === 'started' && startTime) {
//               totalElapsedTime += Math.floor((currentTime - startTime) / 1000);
//             }

//             // Log the start time and elapsedTime
//             console.log(`Activity: ${activityData.name}, Start Time: ${startTime}, Elapsed Time: ${totalElapsedTime}`);

//             return {
//               id: key,
//               name: activityData.name,
//               instances: activityData.instances || [],
//               showInstances: activityData.showInstances || false,
//               elapsedTime: totalElapsedTime,
//               status: activityData.status || "active",
//               startTime: startTime,
//               timerState: activityData.timerState || "stopped",
//             };
//           });
//           setActivities(activityList);
//         } else {
//           setActivities([]);
//         }
//       });
//       const storedTimerState = localStorage.getItem("timerState");
//   const storedStartTimes = localStorage.getItem("startTimes");
//   if (storedTimerState && storedStartTimes) {
//     setTimerState(JSON.parse(storedTimerState));
//     const startTimes = JSON.parse(storedStartTimes);
//     const elapsedTimeFromStorage = JSON.parse(localStorage.getItem("elapsedTime")) || {};
//     setActivities((prevActivities) =>
//       prevActivities.map((activity) => ({
//         ...activity,
//         startTime: startTimes[activity.id] || null,
//         elapsedTime: elapsedTimeFromStorage[activity.id] || 0,
//       }))
//     );
//   }
//       return () => {
//         unsubscribeActivities();
//         Object.values(intervalRefs.current).forEach((interval) =>
//           clearInterval(interval)
//         );
//       };
      
//     }
    
//   }, [user]);

//   const updateElapsedTime = (activityId, elapsedTime) => {
//     const elapsedTimeFromStorage = JSON.parse(localStorage.getItem("elapsedTime")) || {};
//     elapsedTimeFromStorage[activityId] = elapsedTime;
//     localStorage.setItem("elapsedTime", JSON.stringify(elapsedTimeFromStorage));
//   };
  
//   useEffect(() => {
//     const retrievedActivities = activities.map(activity => {
//       if (activity.status === "started") {
//         const storedElapsedTime = localStorage.getItem(`elapsedTime_${activity.id}`);
//         if (storedElapsedTime) {
//           return {
//             ...activity,
//             elapsedTime: parseInt(storedElapsedTime)
//           };
//         }
//       } else if (activity.status === "stopped") {
//         localStorage.removeItem(`elapsedTime_${activity.id}`);
//         return {
//           ...activity,
//           elapsedTime: 0
//         };
//       }
//       return activity;
//     });
//     setActivities(retrievedActivities);
//   }, [timerState]);



  
  
//   const handleInputChange = (event) => {
//     setInputValue(event.target.value);
//   };

//   const handleKeyPress = (event) => {
//     if (event.key === "Enter" && inputValue.trim() !== "") {
//       const existingActivity = activities.find(
//         (activity) => activity.name === inputValue.trim()
//       );
//       if (existingActivity) {
//         alert(`Activity "${inputValue.trim()}" already exists!`);
//         return;
//       }

//       const newActivity = {
//         name: inputValue.trim(),
//         instances: [],
//         showInstances: false,
//         // startTime: Date.now(), // Set startTime as a timestamp representing the current time

//       };
//       setActivities((prevActivities) => [...prevActivities, newActivity]);
//       setInputValue("");
//       saveActivity(newActivity);

//       // Simulate click on start timer button

//     }
//   };
  
  
  
  
  


//   const saveActivity = (newActivity) => {
  
//     try {
//       const user = auth.currentUser; // Get the currently authenticated user
//       if (user) {
//         const activitiesRef = ref(database, `activities/${user.uid}`); // Use the user's UID as part of the path
//         push(activitiesRef, newActivity);
//         startTimer(newActivity.id);
//       } else {
//         console.error("No user is currently authenticated.");
//       }
//     } catch (error) {
//       console.error("Error saving activity:", error);
//     }
//   };

//   const startTimer = (activityId) => {
//     console.log("Starting timer for activity:", activityId);
//     const activity = activities.find((activity) => activity.id === activityId);
//     if (!activity) {
//       console.error("Activity not found:", activityId);
//       return;
//     }

//     // Stop timer for other activities
//     Object.keys(timerState).forEach((key) => {
//       if (key !== activityId && timerState[key] === "started") {
//         stopTimer(key);
//       }
//     });

//     // Clear all interval timers
//     Object.values(intervalRefs.current).forEach((interval) =>
//       clearInterval(interval)
//     );

//     // Get the current time as start time
//     const startTime = Date.now();
//     const startTimes = JSON.parse(localStorage.getItem("startTimes")) || {};
//   startTimes[activityId] = startTime;
//   localStorage.setItem("startTimes", JSON.stringify(startTimes));

//     const instance = {
//       startTime: startTime,
//       elapsedTime: activity ? activity.elapsedTime : 0, // Check if activity is defined
//     };
//     const updatedInstances = [...activity.instances, instance];
//     // Update activity status and start time in the database in real-time

//     const activityRef = ref(
//       database,
//       `activities/${auth.currentUser.uid}/${activityId}`
//     );
//     update(activityRef, {
//       status: "started",
//     });
//     update(activityRef, {
//       instances: updatedInstances,
//       elapsedTime: 0,
//     });

//     // Start new timer for the selected activity
//     intervalRefs.current[activityId] = setInterval(() => {
//       const elapsedTime = Math.floor(
//         (Date.now() -
//           startTime +
//           (activity ? activity.elapsedTime : 0) * 1000) /
//           1000
//       );
//       setActivities((prevActivities) =>
//         prevActivities.map((activity) =>
//           activity.id === activityId ? { ...activity, elapsedTime } : activity
//         )
//       );

//       // Save elapsed time to localStorage
//       localStorage.setItem(`elapsedTime_${activityId}`, elapsedTime.toString());
//     }, 1000);

//     // Update timer state
//     setTimerState((prevTimerState) => ({
//       ...prevTimerState,
//       [activityId]: "started",
//     }));

//     // Set startTime directly in the activity object
//     setActivities((prevActivities) =>
//       prevActivities.map((activity) =>
//         activity.id === activityId ? { ...activity, startTime } : activity
//       )
//     );
//   };

// //   const startTimer = (activityId) => {
// //   // Stop timer for other activities
// //   Object.keys(timerState).forEach((key) => {
// //     if (key !== activityId && timerState[key] === "started") {
// //       stopTimer(key);
// //     }
// //   });

// //   // Clear all interval timers
// //   Object.values(intervalRefs.current).forEach((interval) =>
// //     clearInterval(interval)
// //   );

// //   // Get the current time as start time
// //   const startTime = Date.now()
// //   // console.log(startTime + "time");
  



  
// //   const activity = activities.find((activity) => activity.id === activityId);
// //   const instance = {
// //     startTime: startTime,
// //     // startTime: new Date(startTime),
// //     // startTime: new Date(startTime).toLocaleString(),
// //     elapsedTime: activity.elapsedTime,
// //   };
// //   const updatedInstances = [...activity.instances, instance];
// //  // Update activity status and start time in the database in real-time

// //  const activityRef = ref(
// //   database,
// //   `activities/${auth.currentUser.uid}/${activityId}`
// // );
// // update(activityRef, {
// //   status: "started",
  
// // });
// //   update(activityRef, {
// //     instances: updatedInstances,
// //     // elapsedTime: 0,
// //   });

// //   // Start new timer for the selected activity
// //   intervalRefs.current[activityId] = setInterval(() => {
// //     const elapsedTime = Math.floor(
// //       (Date.now() -
// //         startTime +
// //         activities.find((activity) => activity.id === activityId).elapsedTime *
// //           1000) /
// //         1000
// //     );
// //     setActivities((prevActivities) =>
// //       prevActivities.map((activity) =>
// //         activity.id === activityId ? { ...activity, elapsedTime } : activity
// //       )
// //     );
// //   }, 1000);

// //   // Update timer state
// //   setTimerState((prevTimerState) => ({
// //     ...prevTimerState,
// //     [activityId]: "started",
// //   }));

// //   // Set startTime directly in the activity object
// //   setActivities((prevActivities) =>
// //     prevActivities.map((activity) =>
// //       activity.id === activityId ? { ...activity, startTime } : activity
// //     )
// //   );
// // };
  





// const pauseTimer = (activityId) => {
//   clearInterval(intervalRefs.current[activityId]);
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "paused",
//   }));
// };
  
  


  

  
  
  
  
// const resumeTimer = (activityId, elapsedTime) => {
//   intervalRefs.current[activityId] = setInterval(() => {
//     const updatedElapsedTime = elapsedTime + 1; // Increment elapsed time by 1 second
//     setActivities((prevActivities) =>
//       prevActivities.map((activity) =>
//         activity.id === activityId ? { ...activity, elapsedTime: updatedElapsedTime } : activity
//       )
//     );

//     // Save updated elapsed time to localStorage
//     localStorage.setItem(`elapsedTime_${activityId}`, updatedElapsedTime.toString());
//   }, 1000);

//   // Update timer state
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "started",
//   }));
// };
  
  
  
  

// const stopTimer = (activityId) => {
//   clearInterval(intervalRefs.current[activityId]);

//   // Get the current time as stop time
//   const stopTime = Date.now();
//   const startTimes = JSON.parse(localStorage.getItem("startTimes")) || {};
//   delete startTimes[activityId];
//   localStorage.setItem("startTimes", JSON.stringify(startTimes));

//   // Update the stop time in the latest instance
//   const activity = activities.find((activity) => activity.id === activityId);
//   const activityRef = ref(
//     database,
//     `activities/${auth.currentUser.uid}/${activityId}`
//   );
//   update(activityRef, {
//     status: "stopped",
    
//   });
//   if (activity) {
//     const latestInstance = activity.instances && activity.instances.length > 0 ? activity.instances[activity.instances.length - 1] : null;
//     if (latestInstance) {
//       latestInstance.stopTime = stopTime;
//       latestInstance.elapsedTime = Math.floor((stopTime - new Date(latestInstance.startTime).getTime()) / 1000);

//       // Update the instance in the database
//       const activityRef = ref(database, `activities/${auth.currentUser.uid}/${activityId}`);
//       update(activityRef, {
//         instances: activity.instances,
//         elapsedTime: 0, // Reset elapsed time for the activity
//       }).then(() => {
//         // Update UI by resetting the elapsed time
//         setActivities((prevActivities) =>
//           prevActivities.map((activity) =>
//             activity.id === activityId ? { ...activity, elapsedTime: 0 } : activity
//           )
//         );
//       }).catch((error) => {
//         console.error("Error updating instance:", error);
//       });
//     }
//   }

//   // Update timer state
//   setTimerState((prevTimerState) => ({
//     ...prevTimerState,
//     [activityId]: "stopped",
//   }));
// };




  
//   const deleteActivity = (activityId) => {
//     clearInterval(intervalRefs.current[activityId]);

//     // Mark activity as deleted in the database
//     const activityRef = ref(
//       database,
//       `activities/${auth.currentUser.uid}/${activityId}`
//     ); // Update the activity path
//     update(activityRef, { status: "deleted" }); // Update status to 'deleted'

//     // Update UI by removing the deleted activity
//     setActivities((prevActivities) =>
//       prevActivities.filter((activity) => activity.id !== activityId)
//     );

//     // Store the deleted activity ID persistently
//     const updatedDeletedActivityIds = [...deletedActivityIds, activityId];
//     localStorage.setItem(
//       "deletedActivityIds",
//       JSON.stringify(updatedDeletedActivityIds)
//     );
//   };

//   // const toggleInstances = (activityId) => {
//   //   setActivities((prevActivities) =>
//   //     prevActivities.map((activity) =>
//   //       activity.id === activityId
//   //         ? { ...activity, showInstances: !activity.showInstances }
//   //         : activity
//   //     )
//   //   );
//   // };
  
//   const toggleInstances = (activityId) => {
//     const activity = activities.find((activity) => activity.id === activityId);
//     if (!activity) {
//         console.error("Activity not found:", activityId);
//         return;
//     }

//     const updatedActivities = activities.map((act) =>
//         act.id === activityId ? { ...act, showInstances: !act.showInstances } : act
//     );
//     setActivities(updatedActivities);

//     // Update the showInstances property of the activity in the database
//     const activityRef = ref(database, `activities/${auth.currentUser.uid}/${activityId}`);
//     update(activityRef, { showInstances: !activity.showInstances })
//         .then(() => {
//             console.log("Show instances toggled successfully in the database.");
//         })
//         .catch((error) => {
//             console.error("Error toggling show instances in the database:", error);
//             // Revert the local state change if there's an error
//             setActivities(activities); // Restore previous state
//         });
// };





//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;
//     return `${hours.toString().padStart(2, "0")}:${minutes
//       .toString()
//       .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   // Filter out deleted activities before rendering
//   const filteredActivities = activities.filter(
//     (activity) =>
//       activity && // Check if activity is defined
//       activity.name && // Check if activity has a name property
//       typeof activity.name === "string" && // Check if name is a string (optional, depending on your data)
//       activity.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
//       !deletedActivityIds.includes(activity.id) && // Filter out deleted activities
//       activity.status !== "deleted" // Filter out deleted activities
//   );


//   const calculateTotalTimeSpent = (activity) => {
//     let totalTimeSpent = 0;
//     activity.instances.forEach((instance) => {
//       totalTimeSpent += instance.elapsedTime;
//     });
//     return totalTimeSpent;
//   };

//   return (
//     <div>
//       <CustomNavbar handleSearch={handleSearch} />
//       <input
//         type="text"
//         placeholder="Enter activity name"
//         value={inputValue}
//         onChange={handleInputChange}
//         onKeyPress={handleKeyPress}
//         style={{
//           position: "sticky",
//           top: "0",
//           borderRadius: "10px",
//           padding: "8px",
//           margin: "8px 0",
//           width: "100%",
//           marginTop: "5%",
//           backgroundColor: "#f0f0f0",
//           border: "1px solid #ccc",
//           boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//         }}
//       />
//       <div
//         style={{
//           maxHeight: "calc(100vh - 200px)", // Adjust the max height as needed
//           overflowY: "auto",
//           display: "flex",
//           flexWrap: "wrap",
//           gap: "10px",
//         }}
//       >
//         {filteredActivities.map((activity) => (
//           <div
//             key={activity.id}
//             style={{
//               border: "1.5px solid #ccc",
//               padding: "20px",
//               margin: "10px 0",
//               borderRadius: "10px",
//               position: "relative",
//               minWidth: "200px",
//               width: "calc(33.33% - 10px)",
//               backgroundColor: "white",
//             }}
//           >
//             <FontAwesomeIcon
//               icon={faTimesCircle}
//               style={{
//                 position: "absolute",
//                 top: "2px",
//                 right: "1px",
//                 cursor: "pointer",
//                 color: "#e32400",
//               }}
//               onClick={() => deleteActivity(activity.id)}
//             />

//             <div style={{ backgroundColor: "pink", borderRadius: "40px" }}>
//               <h3 className="text-3xl font-bold underline  text-center ">
//                 {activity.name}
//               </h3>
//             </div>

//             <div
//               style={{ textAlign: "center", fontSize: "40px", color: "black" }}
//             >
//               {formatTime(activity.elapsedTime)}
//             </div>

//             <div className=" ">
//               <div
//                 style={{
//                   maxHeight: "150px",
//                   overflowY: "scroll",
//                   borderRadius: "10px",
//                 }}
//               >
//                 <div style={{ textAlign: "center", fontSize: "20px", color: "black" }}>
//     Total Time Spent: {formatTime(calculateTotalTimeSpent(activity))}
//   </div>

//   {activity.showInstances && (
//   <ul className="list-group">
//     {activity.instances.map((instance, index) => {
//       // Check if instance.startTime is a string before splitting it
//       if (typeof instance.startTime !== 'string') {
//         console.error('Invalid instance.startTime:', instance.startTime);
//         return null; // Skip rendering this instance
//       }

//       // Split the start time string into components
//       const [startDate, startTime] = instance.startTime.split(", ");
//       const [startDay, startMonth, startYear] = startDate.split("/");
//       const [startHourMinute, startAmPm] = startTime.split(" ");
//       const [startHour, startMinute, startSecond] = startHourMinute.split(":");
      
//       // Create a new Date object for the start time
//       const startDateObj = new Date(`${startMonth}/${startDay}/${startYear} ${startHour}:${startMinute}:${startSecond} ${startAmPm}`);

//       // Calculate the end time based on start time and elapsed time
//       const endTimeObj = new Date(startDateObj.getTime() + instance.elapsedTime * 1000);

//       return (
//         <li key={index} className="list-group-item">
//           <div style={{ textAlign: "left", color: "black" }}>
//             <p>
//               Start Time:{" "}
//               {instance.startTime ? (
//                 startDateObj.toLocaleString([], { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }) // Use the formatted start time
//               ) : (
//                 "N/A"
//               )}
//             </p>
//             <p>
//               End Time:{" "}
//               {endTimeObj.toLocaleString([], { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })} {/* Use the formatted end time */}
//             </p>
//             <p>Elapsed Time: {instance.elapsedTime} sec</p>
//           </div>
//         </li>
//       );
//     })}
//   </ul>
// )}





//               </div>
//               {timerState[activity.id] === "started" ? (
//         <button className="px-3 py-2" onClick={() => pauseTimer(activity.id)}>
//           <FaPause /> 
//         </button>
//       ) : timerState[activity.id] === "paused" ? (
//         <button className="px-3 py-2" onClick={() => resumeTimer(activity.id)}>
//           <FaPlay /> 
//         </button>
//       ) : (
//       <button className="px-3 py-2" onClick={() => startTimer(activity.id)}>
//           <FaPlay /> 
//         </button>
//       )}
  


//               <button
//                 className="px-3 py-2 "
//                 onClick={() => stopTimer(activity.id)}
//               >
//                 <i class="bi bi-stop-circle-fill"></i>
//               </button>

//               <button
//                 className="px-3 py-2 "
//                 onClick={() => toggleInstances(activity.id)}
//               >
//                 <i class="bi bi-arrows-angle-expand"></i>
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ActivityTracker;




