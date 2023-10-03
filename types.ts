import { Timestamp } from "firebase/firestore";

export type Workout = {
  created_at: string | Timestamp;
  exercises_list: ExercisesListElement[];
  user_id: string;
  workout_id: string;
  sets: SetRecord[];
  workout_name: string;
  note: string;
  updated_at: string | Timestamp;
};

export type ExercisesListElement = {
  exercise_id: string;
  exercise_name: string;
};

type SetRecord = Record<string, Set>;

export type Set = {
  created_at: string;
  hold?: number;
  note?: string;
  reps?: number;
  set_order: number;
  weight?: number;
};
