import { ref, onValue } from "firebase/database";
import { db } from "../firebase";

export function getExercises() {
  let exercises;
  try {
    const exercisesRef = ref(db, "exercises");
    onValue(exercisesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const dataInArray = Object.values(data);
        exercises = dataInArray;
      } else {
        exercises = [];
      }
    });
  } catch (error) {
    alert(
      "Sorry something went wrong while trying to display list of exercises, please try again later"
    );
  }
  return exercises;
}
