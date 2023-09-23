import { ref, orderByChild, query, equalTo, onValue } from "firebase/database";
import { db } from "../firebase";

export function getExerciseByName(name) {
  let exercise;
  try {
    const queryExercise = query(
      ref(db, "exercises"),
      orderByChild("exercise_name"),
      equalTo(name)
    );
    onValue(queryExercise, (snap) => {
      const data = snap.val();
      if (data) {
        exercise = {};
        exercise.id = Object.keys(data)[0];
        exercise.info = Object.values(data)[0];
      } else {
        exercise = null;
      }
    });
  } catch (error) {
    alert(
      "Sorry something went wrong while trying to access exercise, please try again later"
    );

    throw error;
  }
  return exercise;
}
