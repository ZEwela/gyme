import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export const acceptFriendRequest = async (requestInfo) => {
  const currentUserRef = doc(db, "users", auth.currentUser.uid);
  const currentUserData = (await getDoc(currentUserRef)).data();

  const friend = {
    _id: requestInfo.sender_id,
    displayName: requestInfo.sender_displayName,
    email: requestInfo.sender_email,
  };

  const currentRequests = currentUserData.friends || {};
  currentRequests[requestInfo.sender_id] = friend;

  // add friend
  try {
    await updateDoc(currentUserRef, {
      friends: currentRequests,
    });
  } catch (error) {
    console.error(
      "Error from friend request accepting proccess, adding friend: ",
      error
    );
  }

  // Delete accepted request from user's pending friend requests
  const pendingFriendRequestsToDeleteFrom =
    currentUserData.pendingFriendRequests;
  delete currentUserData.pendingFriendRequests[requestInfo.sender_id];

  try {
    await updateDoc(currentUserRef, {
      pendingFriendRequests: pendingFriendRequestsToDeleteFrom,
    });
  } catch (error) {
    console.error(
      "Error from friend request accepting proccess, removing pending request from user's data: ",
      error
    );
  }

  // Delete accepted request from sender's sent friend requests
  const senderUserRef = doc(db, "users", requestInfo.sender_id);
  const senderUserData = (await getDoc(senderUserRef)).data();
  const sentFriendRequestsToDeleteFrom = senderUserData.sentFriendRequests;
  delete sentFriendRequestsToDeleteFrom[auth.currentUser.uid];
  try {
    await updateDoc(senderUserRef, {
      sentFriendRequests: sentFriendRequestsToDeleteFrom,
    });
  } catch (error) {
    console.error(
      "Error from friend request accepting proccess, removing sent request from friend's data: ",
      error
    );
  }

  // Add friend in sender's friends array
  const senderFriend = {
    _id: currentUserData._id,
    displayName: currentUserData.displayName,
    email: currentUserData.providerData.email,
  };

  let senderRequests = senderUserData.friends || {};
  senderRequests[currentUserData._id] = senderFriend;

  try {
    await updateDoc(senderUserRef, {
      friends: senderRequests,
    });
  } catch (error) {
    console.error(
      "Error from friend request accepting proccess, adding friend to sender's data: ",
      error
    );
  }

  //   Delete friend request from friendRequests
  try {
    await deleteDoc(
      doc(db, "friendRequests", requestInfo.sender_id + currentUserData._id)
    );
  } catch (error) {
    console.error(
      "Error from friend request accepting proccess, delete request from friendRequests: ",
      error
    );
  }
};
