import { ref, set, push } from "firebase/database";
import { db } from "../firebase";

export async function create(name, technique, description) {
  const exerciseData = {
    exercise_name: name.toLowerCase(),
    technique_url: technique,
    description: description,
  };

  const newExerciseRef = await push(ref(db, "exercises"));

  await set(newExerciseRef, exerciseData)
    .then(() => {
      alert("Exercise saved");
    })
    .catch((error) => {
      alert(
        "Sorry something went wrong while saving exercise, please try again later"
      );
    });
}
