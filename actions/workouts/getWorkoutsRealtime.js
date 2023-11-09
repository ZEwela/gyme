import { auth } from "../../firebase";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

export function getWorkoutsRealtime(successCallback, errorCallback) {
  const user = auth.currentUser;
  const workoutsCollection = query(
    collection(db, "workouts"),
    where("user_id", "==", user.uid),
    orderBy("created_at", "desc")
  );

  // Subscribe to changes in the 'exercises' collection.
  const unsubscribe = onSnapshot(
    workoutsCollection,
    (querySnapshot) => {
      const workouts = [];
      querySnapshot.forEach((doc) => {
        const workoutData = doc.data();
        workouts.push(workoutData);
      });

      // Call the provided success callback function with the updated exercises.
      successCallback(workouts);
    },
    (error) => {
      console.error("Error fetching workouts: ", error);
      // Call the provided error callback function with the error
      errorCallback(error);
    }
  );

  // Return the unsubscribe function so you can stop listening to changes later if needed.
  return unsubscribe;
}
