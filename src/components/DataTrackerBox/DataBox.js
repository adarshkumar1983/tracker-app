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
import { ref, push, remove, onValue, update, set } from "firebase/database";
import { FaPause, FaPlay } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CustomNavbar from "../NavBar/NavBar";
import { auth } from "/Users/adarshkumar/tracker-app/src/firebase.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import Footer from "../Foot/Footer";
const ActivityTracker = () => {
  const [activities, setActivities] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [timerState, setTimerState] = useState({});
  const intervalRefs = useRef({});
  const startButtonRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [deletedActivityIds, setDeletedActivityIds] = useState([]);
  const [newActivityId, setNewActivityId] = useState(null);
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
       const activeActivity = activities.find(activity => activity.status === 'started');
    if (activeActivity) {
      // If there is an active activity, stop it
      stopTimer(activeActivity.id);
    }
      const activitiesRef = ref(database, `activities/${user.uid}`);
      const unsubscribeActivities = onValue(activitiesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const activityList = Object.keys(data).map((key) => {
            const activityData = data[key];
            const storedElapsedTime = localStorage.getItem(
              `elapsedTime_${key}`
            );
            const elapsedTime = storedElapsedTime
              ? parseInt(storedElapsedTime)
              : 0;
            const lastInstance =
              activityData.instances && activityData.instances.length > 0
                ? activityData.instances[activityData.instances.length - 1]
                : null;
            const startTime = lastInstance ? lastInstance.startTime : null;
            const currentTime = Date.now();
            let totalElapsedTime = elapsedTime || 0;
            if (activityData.status === "started" && startTime) {
              totalElapsedTime += Math.floor((currentTime - startTime) / 1000);
            }
            return {
              id: key,
              name: activityData.name,
              instances: activityData.instances || [],
              showInstances: activityData.showInstances || false,
              elapsedTime: totalElapsedTime,
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
      activities.forEach((activity) => {
        if (activity.status === "started") {
          const storedElapsedTime = parseInt(
            localStorage.getItem(`elapsedTime_${activity.id}`)
          );
          if (!isNaN(storedElapsedTime)) {
            // Use stored start time to calculate elapsed time
            resumeTimer(activity.id, storedElapsedTime);
          } else {
            // If elapsedTime is NaN, stop the timer
            stopTimer(activity.id);
          }
        }
      });
      // const storedTimerState = localStorage.getItem("timerState");
      // const storedStartTimes = localStorage.getItem("startTimes");
      // if (storedTimerState && storedStartTimes) {
      //   setTimerState(JSON.parse(storedTimerState));
      //   const startTimes = JSON.parse(storedStartTimes);
      //   setActivities((prevActivities) =>
      //     prevActivities.map((activity) => ({
      //       ...activity,
      //       startTime: startTimes[activity.id] || null,
      //     }))
      //   );
      // }

      activities.forEach((activity) => {
        if (activity.status === "started") {
          const elapsedTime = parseInt(
            localStorage.getItem(`elapsedTime_${activity.id}`)
          );
          if (!isNaN(elapsedTime)) {
            // Use handleStartOrResumeTimer to start or resume the timer based on activity status
            handleStartOrResumeTimer(activity.id, activity.status, elapsedTime);
          } else {
            // If elapsedTime is NaN, stop the timer
            handleStartOrResumeTimer(activity.id, "stopped", 0);
          }
        }
      });
      // activities.forEach((activity) => {
      //   if (activity.status === 'started') {
      //     const elapsedTime = parseInt(localStorage.getItem(`elapsedTime_${activity.id}`));
      //     if (!isNaN(elapsedTime)) {
      //       // Resume the timer
      //       handleStartOrResumeTimer(activity.id, 'started', elapsedTime);
      //     }
      //   }
      // });
      activities.forEach((activity) => {
        if (activity.status === "started") {
          startTimer(activity.id);
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

  const updateElapsedTime = (activityId, elapsedTime) => {
    const elapsedTimeFromStorage =
      JSON.parse(localStorage.getItem("elapsedTime")) || {};
    elapsedTimeFromStorage[activityId] = elapsedTime;
    localStorage.setItem("elapsedTime", JSON.stringify(elapsedTimeFromStorage));
  };

  useEffect(() => {
    const retrievedActivities = activities.map((activity) => {
      if (activity.status === "started") {
        const storedElapsedTime = localStorage.getItem(
          `elapsedTime_${activity.id}`
        );
        if (storedElapsedTime) {
          return {
            ...activity,
            elapsedTime: parseInt(storedElapsedTime),
          };
        }
      } else if (activity.status === "stopped") {
        localStorage.removeItem(`elapsedTime_${activity.id}`);
        return {
          ...activity,
          elapsedTime: 0,
        };
      }
      return activity;
    });
    setActivities(retrievedActivities);
  }, [timerState]);

  useEffect(() => {
    if (newActivityId) {
      startTimer(newActivityId); // Start the timer for the new activity
    }
  }, [activities]); // Listen for changes in the activities state
  
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
      };
      setActivities((prevActivities) => [...prevActivities, newActivity]);
      setInputValue("");
      saveActivity(newActivity);
      // startTimer(newActivity.id);
    }
  };

  const saveActivity = (newActivity) => {
    try {
      const user = auth.currentUser; 
      if (user) {
        const activitiesRef = ref(database, `activities/${user.uid}`); 
        const newActivityRef = push(activitiesRef, newActivity); // Push the new activity to the database
        const id = newActivityRef.key; // Retrieve the generated ID for the new activity
        
        // Check if newActivityId is valid before starting the timer
        if (id) {
          setNewActivityId(id); // Update newActivityId
        } else {
          console.error("Failed to get the ID for the new activity.");
        }
      } else {
        console.error("No user is currently authenticated.");
      }
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };
  

  const startOrResumeTimer = (activityId, initialElapsedTime = 0) => {
    const startTime = Date.now() - initialElapsedTime * 1000;

    intervalRefs.current[activityId] = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.id === activityId ? { ...activity, elapsedTime } : activity
        )
      );
      localStorage.setItem(`elapsedTime_${activityId}`, elapsedTime.toString());
    }, 1000);
  };
  const handleStartOrResumeTimer = (activityId, status, elapsedTime) => {
    if (status === "started") {
      startOrResumeTimer(activityId, elapsedTime);
    } else {
      pauseTimer(activityId);
    }
  };

  
  // const startTimer = (activityId) => {
  //   console.log("Starting timer for activity:", activityId);
  //   const activity = activities.find((activity) => activity.id === activityId);
  //   if (!activity) {
  //     console.error("Activity not found:", activityId);
  //     return;
  //   }
  
  //   const ongoingInstance = activity.instances.find(
  //     (instance) => !instance.stopTime
  //   );
  //   if (ongoingInstance) {
  //     console.log("Timer is already running for this activity.");
  //     return;
  //   }
  //   Object.keys(timerState).forEach((key) => {
  //     if (key !== activityId && timerState[key] === "started") {
  //       stopTimer(key);
  //     }
  //   });
  
  //   Object.values(intervalRefs.current).forEach((interval) =>
  //     clearInterval(interval)
  //   );
  
  //   const startTime = Date.now();
  //   const startTimes = JSON.parse(localStorage.getItem("startTimes")) || {};
  //   startTimes[activityId] = startTime;
  //   localStorage.setItem("startTimes", JSON.stringify(startTimes));
  
  //   const instance = {
  //     startTime: startTime,
  //     elapsedTime: activity ? activity.elapsedTime : 0,
  //   };
  //   const updatedInstances = [...activity.instances, instance];
  //   const activityRef = ref(
  //     database,
  //     `activities/${auth.currentUser.uid}/${activityId}`
  //   );
    
  //   update(activityRef, {
  //     status: "started",
  //     instances: updatedInstances,
  //     elapsedTime: activity ? activity.elapsedTime : 0, // Ensure that elapsedTime is a valid number
  //   });
  
  //   intervalRefs.current[activityId] = setInterval(() => {
  //     const elapsedTime = Math.floor(
  //       (Date.now() -
  //         startTime +
  //         (activity ? activity.elapsedTime : 0) * 1000) /
  //         1000
  //     );
  //     setActivities((prevActivities) =>
  //       prevActivities.map((activity) =>
  //         activity.id === activityId ? { ...activity, elapsedTime } : activity
  //       )
  //     );
  //     localStorage.setItem(`elapsedTime_${activityId}`, elapsedTime.toString());
  //   }, 1000);
  //   setTimerState((prevTimerState) => ({
  //     ...prevTimerState,
  //     [activityId]: "started",
  //   }));
  //   setActivities((prevActivities) =>
  //     prevActivities.map((activity) =>
  //       activity.id === activityId ? { ...activity, startTime } : activity
  //     )
  //   );
  // };
  
  const startTimer = (activityId) => {
    console.log('Starting timer for activity:', activityId);
    const activity = activities.find((activity) => activity.id === activityId);
    if (!activity || activity.status === "deleted") {
      console.error("Activity not found or already deleted:", activityId);
      return;
  }
    if (!activity) {
      console.error('Activity not found:', activityId);
      return;
    }
  
    const ongoingInstance = activity.instances.find(
      (instance) => !instance.stopTime
    );
    if (ongoingInstance) {
      console.log('Timer is already running for this activity.');
      return;
    }
  
    Object.keys(timerState).forEach((key) => {
      if (key !== activityId && timerState[key] === 'started') {
        stopTimer(key);
      }
    });
  
    Object.values(intervalRefs.current).forEach((interval) =>
      clearInterval(interval)
    );
  
    const startTime = Date.now();
    const startTimes = JSON.parse(localStorage.getItem('startTimes')) || {};
    startTimes[activityId] = startTime;
    localStorage.setItem('startTimes', JSON.stringify(startTimes));
  
    const instance = {
      startTime: startTime,
      elapsedTime: activity ? activity.elapsedTime : 0,
    };
    const updatedInstances = [...activity.instances, instance];
    const activityRef = ref(
      database,
      `activities/${auth.currentUser.uid}/${activityId}`
    );
  
    // Check if there are any deleted activities
    if (deletedActivityIds.length > 0) {
      console.log('There are deleted activities. Cannot start a new activity.');
      return;
    }
  
    // Proceed with starting the timer and updating activity status
    update(activityRef, {
      status: 'started', // Update status to 'started' when starting timer
      instances: updatedInstances,
      elapsedTime: activity ? activity.elapsedTime : 0, // Ensure that elapsedTime is a valid number
    });
  
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
      [activityId]: 'started',
    }));
  
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === activityId ? { ...activity, startTime } : activity
      )
    );
  };
  
  
  

  const pauseTimer = (activityId) => {
    clearInterval(intervalRefs.current[activityId]);
    setTimerState((prevTimerState) => ({
      ...prevTimerState,
      [activityId]: "paused",
    }));
  };

  const resumeTimer = (activityId, elapsedTime) => {
    // Retrieve stored start time
    const storedStartTime = JSON.parse(localStorage.getItem("startTimes"))[
      activityId
    ];

    // Calculate the time elapsed since the activity was last started
    const currentTime = Date.now();
    const timeElapsedSinceStart = Math.floor(
      (currentTime - storedStartTime) / 1000
    );

    // Calculate total elapsed time by adding the stored elapsed time and the time elapsed since start
    const totalElapsedTime = elapsedTime + timeElapsedSinceStart;

    // Start interval to update elapsed time continuously
    const intervalId = setInterval(() => {
      const updatedElapsedTime =
        totalElapsedTime + Math.floor((Date.now() - storedStartTime) / 1000);
      setActivities((prevActivities) =>
        prevActivities.map((activity) =>
          activity.id === activityId
            ? { ...activity, elapsedTime: updatedElapsedTime }
            : activity
        )
      );
      localStorage.setItem(
        `elapsedTime_${activityId}`,
        updatedElapsedTime.toString()
      );
    }, 1000);

    // Update the intervalRefs with the new interval
    intervalRefs.current[activityId] = intervalId;

    // Update timer state to "started"
    setTimerState((prevTimerState) => ({
      ...prevTimerState,
      [activityId]: "started",
    }));
  };

  const stopTimer = (activityId) => {
    clearInterval(intervalRefs.current[activityId]);
    const activity = activities.find((activity) => activity.id === activityId);
    if (!activity || activity.status === "deleted") {
        console.error("Activity not found or already deleted:", activityId);
        return;
    }
    const stopTime = Date.now();
    const startTimes = JSON.parse(localStorage.getItem("startTimes")) || {};
    delete startTimes[activityId];
    localStorage.setItem("startTimes", JSON.stringify(startTimes));
    // const activity = activities.find((activity) => activity.id === activityId);
    const activityRef = ref(
      database,
      `activities/${auth.currentUser.uid}/${activityId}`
    );
    update(activityRef, {
      status: "stopped",
    });
    if (activity) {
      const latestInstance =
        activity.instances && activity.instances.length > 0
          ? activity.instances[activity.instances.length - 1]
          : null;
      if (latestInstance) {
        latestInstance.stopTime = stopTime;
        latestInstance.elapsedTime = Math.floor(
          (stopTime - new Date(latestInstance.startTime).getTime()) / 1000
        );
        const activityRef = ref(
          database,
          `activities/${auth.currentUser.uid}/${activityId}`
        );
        update(activityRef, {
          instances: activity.instances,
          elapsedTime: 0,
        })
          .then(() => {
            setActivities((prevActivities) =>
              prevActivities.map((activity) =>
                activity.id === activityId
                  ? { ...activity, elapsedTime: 0 }
                  : activity
              )
            );
          })
          .catch((error) => {
            console.error("Error updating instance:", error);
          });
  
        // If the stopped activity is the new activity, clear the newActivityId state variable
        if (newActivityId === activityId) {
          setNewActivityId(null);
        }
      }
    }
    setTimerState((prevTimerState) => ({
      ...prevTimerState,
      [activityId]: "stopped",
    }));
  };
  

  const deleteActivity = (activityId) => {
    clearInterval(intervalRefs.current[activityId]);
    const activity = activities.find((activity) => activity.id === activityId);
    const activityRef = ref(
      database,
      `activities/${auth.currentUser.uid}/${activityId}`
    );

    if (activity) {
      // Find the last instance of the activity
      const lastInstanceIndex = activity.instances.length - 1;
      const lastInstance = activity.instances[lastInstanceIndex];

      if (lastInstance && !lastInstance.stopTime) {
        // Update the stop time of the last instance to the current time
        activity.instances[lastInstanceIndex] = {
          ...lastInstance,
          stopTime: Date.now(),
          elapsedTime: Math.floor(
            (Date.now() - new Date(lastInstance.startTime).getTime()) / 1000
          ),
        };

        // Update the database with the modified instance
        update(activityRef, {
          instances: activity.instances,
        })
          .then(() => {
            console.log("Stop time updated for the last instance.");
          })
          .catch((error) => {
            console.error("Error updating stop time:", error);
          });
      }
    }

    // Update the activity status to "deleted" in the database
    update(activityRef, { status: "deleted" });

    // Remove the activity from the local state
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== activityId)
    );

    // Update the list of deleted activity IDs
    const updatedDeletedActivityIds = [...deletedActivityIds, activityId];
    localStorage.setItem(
      "deletedActivityIds",
      JSON.stringify(updatedDeletedActivityIds)
    );
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

  const filteredActivities = activities.filter(
    (activity) =>
        activity &&
        activity.name &&
        typeof activity.name === "string" &&
        activity.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !deletedActivityIds.includes(activity.id) &&
        activity.status !== "deleted"
);


  const calculateTotalTimeSpent = (activity) => {
    let totalTimeSpent = 0;
    activity.instances.forEach((instance) => {
      totalTimeSpent += instance.elapsedTime;
    });
    return totalTimeSpent;
  };

  return (
    <div className="w-full md:w-1/2 lg:w-1/3" >
    <CustomNavbar handleSearch={handleSearch} />
    <input
      type="text"
      placeholder="Enter activity name"
      value={inputValue}
      onChange={handleInputChange}
      onKeyPress={handleKeyPress}
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        borderRadius: "10px",
        padding: "8px",
        margin: "75px 0 0 0", // Changed margin top to make space for the navbar
        width: "100%",
        backgroundColor: "#f0f0f0",
        border: "1px solid #ccc",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        zIndex: "1000",
      }}
    />

    <div
      style={{
        marginTop: "900px", // Adjusted margin top to create space between input box and activity cards
        maxHeight: "calc(100vh - 200px)",
        overflowY: "auto",
        justifyContent:"center",
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
  
            borderRadius: "11px",
            minWidth: "250px",
            width: "calc(33.33% - 10px)",
            backgroundColor: "white",
            position: "relative",
          }}
        >
          <FontAwesomeIcon
            icon={faTimesCircle}
            style={{
              position: "absolute",
              top: "-2px",
              right: "-2px",
              cursor: "pointer",
              color: "#e32400",
              fontSize: "1.5rem",
            }}
            onClick={() => deleteActivity(activity.id)}
          />

          <div
            style={{
              backgroundColor: "pink",
              borderRadius: "40px",
              marginBottom: "10px",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              {activity.name}
            </h3>
          </div>
          <div
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              color: "black",
              marginBottom: "10px",
            }}
          >
            {formatTime(activity.elapsedTime)}
          </div>
          <div>
            <div
              style={{
                maxHeight: "150px",
                overflowY: "scroll",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  textAlign: "center",
                  fontSize: "1.2rem",
                  color: "black",
                  marginBottom: "10px",
                }}
              >
                Total Time Spent:{" "}
                {formatTime(calculateTotalTimeSpent(activity))}
              </div>
            </div>
            {timerState[activity.id] === "started" ||
            activity.status === "started" ? (
              <button
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#dc3545",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
                onClick={() => stopTimer(activity.id)}
              >
                <i className="bi bi-stop-circle-fill"></i> Stop
              </button>
            ) : timerState[activity.id] === "paused" ? (
              <button
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#28a745",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
                onClick={() => resumeTimer(activity.id)}
              >
                <i className="bi bi-play-fill"></i> Resume
              </button>
            ) : (
              <button
                ref={startButtonRef}
                style={{
                  width: "100%",
                  padding: "8px",
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
                onClick={() => startTimer(activity.id)}
              >
                <i className="bi bi-play-fill"></i> Start
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default ActivityTracker;
