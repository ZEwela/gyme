import { getAuth, updateEmail } from "firebase/auth";
const auth = getAuth();
export const updateUserEmail = (email) => {
  updateEmail(auth.currentUser, email)
    .then(() => {
      // Email updated!
      // ...
      console.log("Email updated!");
    })
    .catch((error) => {
      // An error occurred
      // ...
      console.log("Error!", error);
    });
};
