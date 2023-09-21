import moment from "moment";
export const exercises = [
  {
    name: "Kettle Single Alternating Lunges",
    ref: "https://www.youtube.com/watch?v=3LdgCetmeFg",
  },
  {
    name: "Db Signle Leg RDL’s",
    ref: "https://www.youtube.com/watch?v=lI8-igvsnVQ",
  },
  {
    name: "Single Lunge",
    ref: "https://www.youtube.com/watch?v=1nErJljteqw",
  },
  {
    name: "Squat",
    ref: "https://www.youtube.com/watch?v=gcNh17Ckjgg",
  },
  {
    name: "New Squat",
    ref: "https://www.youtube.com/watch?v=gcNh17Ckjgg",
  },
  {
    name: "Hanging",
    ref: null,
  },
];

export const workouts = [
  {
    name: "legs",
    exercises: [
      {
        name: "Kettle Single Alternating Lunges",
        ref: "https://www.youtube.com/watch?v=3LdgCetmeFg",
      },
      {
        name: "Db Signle Leg RDL’s",
        ref: "https://www.youtube.com/watch?v=lI8-igvsnVQ",
      },
      {
        name: "Single Lunge",
        ref: "https://www.youtube.com/watch?v=1nErJljteqw",
      },
      {
        name: "Squat",
        ref: "https://www.youtube.com/watch?v=gcNh17Ckjgg",
      },
    ],
  },
  {
    name: "push1",
    exercises: [
      {
        name: "Kettle Single Alternating Lunges",
        ref: "https://www.youtube.com/watch?v=3LdgCetmeFg",
      },
      {
        name: "Db Signle Leg RDL’s",
        ref: "https://www.youtube.com/watch?v=lI8-igvsnVQ",
      },
      {
        name: "Single Lunge",
        ref: "https://www.youtube.com/watch?v=1nErJljteqw",
      },
      {
        name: "Squat",
        ref: "https://www.youtube.com/watch?v=gcNh17Ckjgg",
      },
    ],
  },
  {
    name: "push2",
    exercises: [
      {
        name: "Kettle Single Alternating Lunges",
        ref: "https://www.youtube.com/watch?v=3LdgCetmeFg",
      },
      {
        name: "Db Signle Leg RDL’s",
        ref: "https://www.youtube.com/watch?v=lI8-igvsnVQ",
      },
      {
        name: "Single Lunge",
        ref: "https://www.youtube.com/watch?v=1nErJljteqw",
      },
      {
        name: "Squat",
        ref: "https://www.youtube.com/watch?v=gcNh17Ckjgg",
      },
    ],
  },
  {
    name: "pull1",
    exercises: [
      {
        name: "Kettle Single Alternating Lunges",
        ref: "https://www.youtube.com/watch?v=3LdgCetmeFg",
      },
      {
        name: "Db Signle Leg RDL’s",
        ref: "https://www.youtube.com/watch?v=lI8-igvsnVQ",
      },
      {
        name: "Single Lunge",
        ref: "https://www.youtube.com/watch?v=1nErJljteqw",
      },
      {
        name: "Hanging",
        ref: null,
      },
    ],
  },
  {
    name: "pull2",
    exercises: [
      {
        name: "Kettle Single Alternating Lunges",
        ref: "https://www.youtube.com/watch?v=3LdgCetmeFg",
      },
      {
        name: "Db Signle Leg RDL’s",
        ref: "https://www.youtube.com/watch?v=lI8-igvsnVQ",
      },
      {
        name: "Single Lunge",
        ref: "https://www.youtube.com/watch?v=1nErJljteqw",
      },
      {
        name: "Squat",
        ref: "https://www.youtube.com/watch?v=gcNh17Ckjgg",
      },
    ],
  },
];

export const users = [
  {
    id: 0,
    name: "Ewelina",
    avatar: "",
    friends: [1, 2],
    workouts: [],
    exercies: [],
    workoutsHistory: [
      {
        date: moment().subtract(10, "days").calendar(),
        workoutName: "legs",
        exercies: [
          {
            name: "Kettle Single Alternating Lunges",
            ref: "https://www.youtube.com/watch?v=3LdgCetmeFg",
            data: [
              { set: 1, reps: 12, weight: 20 },
              { set: 2, reps: 12, weight: 20 },
              { set: 3, reps: 12, weight: 22 },
              { set: 4, reps: 12, weight: 22 },
              { set: 5, reps: 12, weight: 22 },
            ],
          },
          {
            name: "Db Signle Leg RDL’s",
            ref: "https://www.youtube.com/watch?v=lI8-igvsnVQ",
            data: [
              { set: 1, reps: 12, weight: 20 },
              { set: 2, reps: 12, weight: 20 },
              { set: 3, reps: 12, weight: 22 },
            ],
          },
          {
            name: "Single Lunge",
            ref: "https://www.youtube.com/watch?v=1nErJljteqw",
            data: [
              { set: 1, reps: 12, weight: 20 },
              { set: 2, reps: 12, weight: 20 },
              { set: 3, reps: 12, weight: 22 },
            ],
          },
          {
            name: "Squat",
            ref: "https://www.youtube.com/watch?v=gcNh17Ckjgg",
            data: [
              { set: 1, reps: 12, weight: 20 },
              { set: 2, reps: 12, weight: 20 },
              { set: 3, reps: 12, weight: 22 },
            ],
          },
        ],
      },
      {
        date: moment().subtract(20, "days").calendar(),
        workoutName: "pull1",
        exercies: [
          {
            name: "Kettle Single Alternating Lunges",
            ref: "https://www.youtube.com/watch?v=3LdgCetmeFg",
            data: [
              { set: 1, reps: 20, weight: 24 },
              { set: 2, reps: 20, weight: 24 },
              { set: 3, reps: 12, weight: 22 },
            ],
          },
          {
            name: "Db Signle Leg RDL’s",
            ref: "https://www.youtube.com/watch?v=lI8-igvsnVQ",
            data: [
              { set: 1, reps: 12, weight: 26 },
              { set: 2, reps: 12, weight: 20 },
              { set: 3, reps: 12, weight: 22 },
            ],
          },
          {
            name: "Single Lunge",
            ref: "https://www.youtube.com/watch?v=1nErJljteqw",
            data: [
              { set: 1, reps: 12, weight: 27 },
              { set: 2, reps: 12, weight: 20 },
              { set: 3, reps: 12, weight: 22 },
            ],
          },
          {
            name: "Hanging",
            ref: null,
            data: [
              { set: 1, reps: 1, weight: 0, hold: 30 },
              { set: 2, reps: 1, weight: 0, hold: 20 },
              { set: 3, reps: 1, weight: 0, hold: 30 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 1,
    name: "Karol",
    friends: [0],
    workouts: [],
    avatar: "",
    exercies: [],
    workoutsHistory: [
      {
        date: moment().subtract(10, "days").calendar(),
        workoutName: "legs",
        exercies: [
          {
            name: "Kettle Single Alternating Lunges",
            ref: "https://www.youtube.com/watch?v=3LdgCetmeFg",
            data: [
              { set: 1, reps: 12, weight: 50 },
              { set: 2, reps: 12, weight: 50 },
              { set: 3, reps: 12, weight: 50 },
            ],
          },
          {
            name: "Db Signle Leg RDL’s",
            ref: "https://www.youtube.com/watch?v=lI8-igvsnVQ",
            data: [
              { set: 1, reps: 12, weight: 50 },
              { set: 2, reps: 12, weight: 50 },
              { set: 3, reps: 12, weight: 50 },
            ],
          },
          {
            name: "Single Lunge",
            ref: "https://www.youtube.com/watch?v=1nErJljteqw",
            data: [
              { set: 1, reps: 12, weight: 50 },
              { set: 2, reps: 12, weight: 50 },
              { set: 3, reps: 12, weight: 50 },
            ],
          },
          {
            name: "Squat",
            ref: "https://www.youtube.com/watch?v=gcNh17Ckjgg",
            data: [
              { set: 1, reps: 12, weight: 50 },
              { set: 2, reps: 12, weight: 50 },
              { set: 3, reps: 12, weight: 50 },
            ],
          },
        ],
      },
      {
        date: moment().subtract(22, "days").calendar(),
        workoutName: "pull1",
        exercies: [
          {
            name: "Kettle Single Alternating Lunges",
            ref: "https://www.youtube.com/watch?v=3LdgCetmeFg",
            data: [
              { set: 1, reps: 20, weight: 70 },
              { set: 2, reps: 20, weight: 70 },
              { set: 3, reps: 12, weight: 70 },
            ],
          },
          {
            name: "Db Signle Leg RDL’s",
            ref: "https://www.youtube.com/watch?v=lI8-igvsnVQ",
            data: [
              { set: 1, reps: 12, weight: 70 },
              { set: 2, reps: 12, weight: 70 },
              { set: 3, reps: 12, weight: 70 },
            ],
          },
          {
            name: "Single Lunge",
            ref: "https://www.youtube.com/watch?v=1nErJljteqw",
            data: [
              { set: 1, reps: 12, weight: 70 },
              { set: 2, reps: 12, weight: 70 },
              { set: 3, reps: 12, weight: 70 },
            ],
          },
          {
            name: "Hanging",
            ref: null,
            data: [
              { set: 1, reps: 1, weight: 0, hold: 40 },
              { set: 2, reps: 1, weight: 0, hold: 40 },
              { set: 3, reps: 1, weight: 0, hold: 40 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Baton",
    friends: [0, 1],
    workouts: [],
    exercies: [],
    workoutsHistory: [],
  },
];

export const currentWorkout = [
  {
    user: 0,
    date: moment().format("L"),
    workoutName: "Legs",
    exercises: [],
  },
  {
    user: 1,
    date: moment().format("L"),
    workoutName: "Legs",
    exercises: [],
  },
];
