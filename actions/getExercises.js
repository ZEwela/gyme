import { db } from "../firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";

export function getExercisesRealtime(successCallback, errorCallback) {
  const exercisesCollection = collection(db, "exercises");

  // Subscribe to changes in the 'exercises' collection.
  const unsubscribe = onSnapshot(
    exercisesCollection,
    (querySnapshot) => {
      const exercises = [];
      querySnapshot.forEach((doc) => {
        const exerciseData = doc.data();
        exercises.push(exerciseData);
      });

      // Call the provided success callback function with the updated exercises.
      successCallback(exercises);
    },
    (error) => {
      console.error("Error fetching exercises: ", error);
      // Call the provided error callback function with the error
      errorCallback(error);
    }
  );

  // Return the unsubscribe function so you can stop listening to changes later if needed.
  return unsubscribe;
}

// export function getExercises() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const exercisesCollection = collection(db, "exercises");

//       const querySnapshot = await getDocs(exercisesCollection);
//       const exercises = [];
//       querySnapshot.forEach((doc) => {
//         const exerciseData = doc.data();
//         exercises.push(exerciseData);
//       });
//       resolve(exercises);
//     } catch (error) {
//       console.error("Error fetching exercises: ", error);
//       reject(error);
//     }
//   });
// }
