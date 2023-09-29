import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export function getExercises() {
  return new Promise(async (resolve, reject) => {
    try {
      const exercisesCollection = collection(db, "exercises");

      const querySnapshot = await getDocs(exercisesCollection);
      const exercises = [];
      querySnapshot.forEach((doc) => {
        const exerciseData = doc.data();
        exercises.push(exerciseData);
      });
      resolve(exercises);
    } catch (error) {
      console.error("Error fetching exercises: ", error);
      reject(error);
    }
  });
}
