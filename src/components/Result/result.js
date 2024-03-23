import { useEffect, useState } from 'react';
import { auth, database } from '.././../firebase'; // Import the Firebase auth and database instances

const Dashboard = () => {
  const [activityData, setActivityData] = useState(null);

  useEffect(() => {
    // Set up a listener to detect changes in authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, fetch activity data for the user
        fetchActivityData(user.uid);
      } else {
        // User is signed out, clear the activity data
        setActivityData(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const fetchActivityData = (userId) => {
    // Fetch activity data for the specified user ID
    // Example: Assuming your database structure is '/users/{userId}/activities'
    const activitiesRef = database.ref(`users/${userId}/activities`);
    
    // Set up a listener to fetch the data and update state when changes occur
    activitiesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setActivityData(data);
    });
  };

  return (
    <div className="dashboard">
      <h1>Activity Dashboard</h1>
      {activityData && (
        <div className="activity-summary">
          {/* Render activity data */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
