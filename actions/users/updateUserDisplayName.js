import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
const auth = getAuth();
export const updateUserDisplayName = async (newDisplayName) => {
  const currentUserRef = doc(db, "users", auth.currentUser.uid);
  await updateDoc(currentUserRef, { displayName: newDisplayName });

  const currentUserListRef = doc(db, "usersList", auth.currentUser.uid);

  try {
    await updateDoc(currentUserListRef, { displayName: newDisplayName });
  } catch (error) {
    if (error.message.includes("No document to update")) {
      const userInListData = {
        _id: auth.currentUser.uid,
        displayName: newDisplayName,
        email: auth.currentUser.providerData[0].email,
      };
      await setDoc(currentUserListRef, userInListData);
    } else {
      console.error("Error during updating user's information", error);
    }
  }

  // Update the displayName in the 'friends' arrays of the user's friends.
  const currentUserData = (await getDoc(currentUserRef)).data();
  const userFriendsArray = currentUserData.friends;
  if (userFriendsArray && userFriendsArray.length > 0) {
    userFriendsArray.forEach(async (friend) => {
      const friendRef = doc(db, "users", friend._id);
      const currentFriendFriendsData = (await getDoc(friendRef)).data().friends;
      if (currentFriendFriendsData && currentFriendFriendsData.length > 0) {
        const updatedFriendFriends = currentFriendFriendsData.map((friend) => {
          if (friend._id === auth.currentUser.uid) {
            return { ...friend, displayName: newDisplayName };
          }
          return friend;
        });

        await updateDoc(friendRef, { friends: updatedFriendFriends });
      }
    });
  }
};
