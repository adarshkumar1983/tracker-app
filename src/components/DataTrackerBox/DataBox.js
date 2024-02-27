// import React, { useState, useEffect, useRef } from 'react';
// import { database } from '/Users/adarshkumar/tracker-app/src/firebase.js';
// import { ref, push, remove, onValue, update } from 'firebase/database';
// import { MdCancel } from "react-icons/md";
// import { MdRestartAlt } from "react-icons/md";
// import { BsSignStopFill } from "react-icons/bs";
// import { IoIosExpand } from "react-icons/io";
// import { FaPause } from "react-icons/fa6";
// import { GrResume } from "react-icons/gr";

// const ActivityTracker = () => {
//     const [activities, setActivities] = useState([]);
//     const [inputValue, setInputValue] = useState('');
//     const [timerState, setTimerState] = useState({}); // Track timer state for each activity
//     const intervalRefs = useRef({});

//     useEffect(() => {
//         const activitiesRef = ref(database, 'activities');
//         const unsubscribe = onValue(activitiesRef, (snapshot) => {
//             const data = snapshot.val();
//             if (data) {
//                 const activityList = Object.keys(data).map((key) => ({
//                     id: key,
//                     name: data[key].name,
//                     instances: data[key].instances || [],
//                     showInstances: false,
//                 }));
//                 setActivities(activityList);
//             } else {
//                 setActivities([]);
//             }
//         });

//         return () => {
//             unsubscribe();
//             Object.values(intervalRefs.current).forEach((interval) => clearInterval(interval));
//         };
//     }, []);

//     const handleInputChange = (event) => {
//         setInputValue(event.target.value);
//     };

//     const handleKeyPress = (event) => {
//         if (event.key === 'Enter' && inputValue.trim() !== '') {
//             const existingActivity = activities.find((activity) => activity.name === inputValue.trim());
//             if (existingActivity) {
//                 alert(`Activity "${inputValue.trim()}" already exists!`);
//                 return;
//             }

//             const newActivity = {
//                 name: inputValue.trim(),
//                 instances: [],
//                 showInstances: false,
//             };
//             setActivities((prevActivities) => [...prevActivities, newActivity]);
//             setInputValue('');
//             saveActivity(newActivity);
//         }
//     };

//     const saveActivity = (newActivity) => {
//         try {
//             const activitiesRef = ref(database, 'activities');
//             push(activitiesRef, newActivity);
//         } catch (error) {
//             console.error("Error saving activity:", error);
//         }
//     };

//     const startTimer = (activityId) => {
//         const startTime = Date.now();
//         intervalRefs.current[activityId] = setInterval(() => {
//             const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
//             setActivities((prevActivities) =>
//                 prevActivities.map((activity) =>
//                     activity.id === activityId ? { ...activity, elapsedTime } : activity
//                 )
//             );
//         }, 1000);
//         setTimerState((prevTimerState) => ({ ...prevTimerState, [activityId]: 'started' }));
//     };

//     const pauseTimer = (activityId) => {
//         clearInterval(intervalRefs.current[activityId]);
//         setTimerState((prevTimerState) => ({ ...prevTimerState, [activityId]: 'paused' }));
//     };

//     const resumeTimer = (activityId) => {
//         const startTime = Date.now() - (activities.find((activity) => activity.id === activityId).elapsedTime * 1000);
//         intervalRefs.current[activityId] = setInterval(() => {
//             const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
//             setActivities((prevActivities) =>
//                 prevActivities.map((activity) =>
//                     activity.id === activityId ? { ...activity, elapsedTime } : activity
//                 )
//             );
//         }, 1000);
//         setTimerState((prevTimerState) => ({ ...prevTimerState, [activityId]: 'started' }));
//     };

//     const stopTimer = (activityId) => {
//         clearInterval(intervalRefs.current[activityId]);

//         const activity = activities.find((activity) => activity.id === activityId);
//         const instance = { startTime: Date.now(), elapsedTime: activity.elapsedTime };
//         const updatedInstances = [...activity.instances, instance];

//         const activityRef = ref(database, `activities/${activityId}`);
//         update(activityRef, { instances: updatedInstances });

//         setActivities((prevActivities) =>
//             prevActivities.map((activity) =>
//                 activity.id === activityId ? { ...activity, elapsedTime: 0 } : activity
//             )
//         );
//         setTimerState((prevTimerState) => ({ ...prevTimerState, [activityId]: 'stopped' }));
//     };

//     const deleteActivity = (activityId) => {
//         clearInterval(intervalRefs.current[activityId]);

//         setActivities((prevActivities) => prevActivities.filter((activity) => activity.id !== activityId));

//         const activityRef = ref(database, `activities/${activityId}`);
//         remove(activityRef)
//             .then(() => {
//                 console.log("Activity deleted successfully");
//             })
//             .catch((error) => {
//                 console.error("Error deleting activity:", error);
//             });
//     };

//     const toggleInstances = (activityId) => {
//         setActivities((prevActivities) =>
//             prevActivities.map((activity) =>
//                 activity.id === activityId ? { ...activity, showInstances: !activity.showInstances } : activity
//             )
//         );
//     };

//     return (
//         <div>
//             <h1>Activity Tracker</h1>
//             <input
//                 type="text"
//                 placeholder="Enter activity name"
//                 value={inputValue}
//                 onChange={handleInputChange}
//                 onKeyPress={handleKeyPress}
//             />
//             {activities.map((activity) => (
//                 <div key={activity.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0', borderRadius: '5px', position: 'relative' }}>
//                     <button
//                         style={{ position: 'absolute', top: '5px', right: '5px', cursor: 'pointer' }}
//                         onClick={() => deleteActivity(activity.id)}
//                     >
//                        <MdCancel />
//                     </button>
//                     <h3>{activity.name}</h3>
//                     <div>
//                         {activity.showInstances && activity.instances.map((instance, index) => (
//                             <div key={index}>
//                                 <p>Start Time: {new Date(instance.startTime).toLocaleString()}</p>
//                                 <p>Elapsed Time: {instance.elapsedTime} seconds</p>
//                             </div>
//                         ))}
//                         {(timerState[activity.id] === 'started' || !timerState[activity.id]) && (
//                             <button onClick={() => pauseTimer(activity.id)}><FaPause /></button>
//                         )}
//                         {timerState[activity.id] === 'paused' && (
//                             <button onClick={() => resumeTimer(activity.id)}><GrResume /></button>
//                         )}
//                         <button onClick={() => startTimer(activity.id)}><MdRestartAlt /></button>
//                         <button onClick={() => stopTimer(activity.id)}><BsSignStopFill /></button>
//                         <button onClick={() => toggleInstances(activity.id)}><IoIosExpand /></button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ActivityTracker;





import React, { useState, useEffect, useRef } from "react";
import { database } from "/Users/adarshkumar/tracker-app/src/firebase.js";
import { ref, push, remove, onValue, update } from "firebase/database";
import { FaPause, FaPlay } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CustomNavbar from "../NavBar/NavBar";
import { auth } from "/Users/adarshkumar/tracker-app/src/firebase.js"; // Make sure to replace '/path/to/firebase' with the actual path to your Firebase configuration file

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
          const activityList = Object.keys(data).map((key) => ({
            id: key,
            name: data[key].name,
            instances: data[key].instances || [],
            showInstances: false,
            elapsedTime: data[key].elapsedTime || 0,
            status: data[key].status || "active",
          }));
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
        elapsedTime: 0,
      };
      setActivities((prevActivities) => [...prevActivities, newActivity]);
      setInputValue("");
      saveActivity(newActivity);

      // Start timer for the newly created activity
      // startTimer(newActivity.id);
    }
  };

  const saveActivity = (newActivity) => {
    try {
      const user = auth.currentUser; // Get the currently authenticated user
      if (user) {
        const activitiesRef = ref(database, `activities/${user.uid}`); // Use the user's UID as part of the path
        push(activitiesRef, newActivity);
      } else {
        console.error("No user is currently authenticated.");
      }
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  const startTimer = (activityId) => {
    // Clear all interval timers
    Object.values(intervalRefs.current).forEach((interval) =>
      clearInterval(interval)
    );

    // Start new timer for the selected activity
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

    // Set timer state
    setTimerState((prevTimerState) => ({
      ...prevTimerState,
      [activityId]: "started",
    }));

    // Stop timer for other activities
    setActivities((prevActivities) =>
      prevActivities.map((activity) => ({
        ...activity,
        elapsedTime: 0,
      }))
    );
  };

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

    const activity = activities.find((activity) => activity.id === activityId);
    const instance = {
      startTime: Date.now(),
      elapsedTime: activity.elapsedTime,
    };
    const updatedInstances = [...activity.instances, instance];

    const activityRef = ref(
      database,
      `activities/${auth.currentUser.uid}/${activityId}`
    ); // Update the activity path
    update(activityRef, {
      instances: updatedInstances,
      elapsedTime: 0,
      status: "active",
    }); // Update instances, elapsedTime, and status

    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === activityId
          ? { ...activity, elapsedTime: 0, status: "active" }
          : activity
      )
    );
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

  const toggleInstances = (activityId) => {
    setActivities((prevActivities) =>
      prevActivities.map((activity) =>
        activity.id === activityId
          ? { ...activity, showInstances: !activity.showInstances }
          : activity
      )
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
                {activity.showInstances &&
                  activity.instances.map((instance, index) => (
                    <ul className="list-group">
                      {activity.instances.map((instance, index) => (
                        <li key={index} className="list-group-item">
                          <div style={{ textAlign: "left", color: "black" }}>
                            <p>
                              Start Time:{" "}
                              {new Date(instance.startTime).toLocaleString()}
                            </p>
                            <p>Elapsed Time: {instance.elapsedTime} sec</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ))}
              </div>

              {timerState[activity.id] === "started" ? (
                <button
                  className="px-3 py-2 "
                  onClick={() => pauseTimer(activity.id)}
                >
                  <FaPause />
                </button>
              ) : (
                <button
                  className="px-3 py-2  "
                  onClick={() => startTimer(activity.id)}
                >
                  {" "}
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
