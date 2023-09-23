import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export function getExercises() {
  return new Promise((resolve, reject) => {
    const exercisesRef = ref(db, "exercises");

    onValue(exercisesRef, (snapshot) => {
      try {
        const data = snapshot.val();
        const dataInArray = Object.values(data);
        resolve(dataInArray);
      } catch (error) {
        reject(error);
      }
    });
  });
}
