import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const removeFriend = async (friendToRemove) => {
  const currentUserRef = doc(db, "users", auth.currentUser.uid);

  // Get the current user's data
  const currentUserData = (await getDoc(currentUserRef)).data();

  if (Array.isArray(currentUserData.friends)) {
    // Find the index of the friend to remove

    const findUser = (friend) => {
      return friend._id === friendToRemove._id;
    };
    const friendIndex = currentUserData.friends.findIndex(findUser);

    if (friendIndex !== -1) {
      // Remove the friend from the array
      currentUserData.friends.splice(friendIndex, 1);

      // Update the "friends" field in the user's data
      await updateDoc(currentUserRef, { friends: currentUserData.friends });

      console.log("Friend removed successfully!");
    } else {
      console.log("Friend not found in the list.");
    }
  } else {
    console.log("Error: Friends field is not defined or not an array.");
  }
};
