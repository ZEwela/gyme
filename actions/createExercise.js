import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function create(name, technique, description) {
  try {
    const newExerciseRef = doc(collection(db, "exercises"));
    const exerciseId = newExerciseRef._key.path.segments[1];

    const exerciseData = {
      exercise_id: exerciseId,
      exercise_name: name.toLowerCase(),
      technique_url: technique,
      description: description,
    };

    await setDoc(newExerciseRef, exerciseData);
  } catch (error) {
    console.log(error);
    alert(
      "Sorry something went wrong while saving exercise, please try again later"
    );
  }
}
