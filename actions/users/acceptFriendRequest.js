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

  const currentRequests = currentUserData.friends || [];
  currentRequests.push(friend);

  updateDoc(currentUserRef, {
    friends: currentRequests,
  });

  // Delete accepted request from user's pending friend requests
  const filteredPendingFriendRequests =
    currentUserData.pendingFriendRequests.filter(
      ({ request_id }) => request_id !== requestInfo.request_id
    );
  // Update the document with the new array
  updateDoc(currentUserRef, {
    pendingFriendRequests: filteredPendingFriendRequests,
  });

  // Delete accepted request from sender's sent friend requests
  const senderUserRef = doc(db, "users", requestInfo.sender_id);
  const senderUserData = (await getDoc(senderUserRef)).data();
  const filteredSentFriendRequests = senderUserData.sentFriendRequests.filter(
    ({ request_id }) => request_id !== requestInfo.request_id
  );
  // Update the document with the new array
  updateDoc(senderUserRef, {
    sentFriendRequests: filteredSentFriendRequests,
  });

  // Add friend in sender's friends array
  const senderFriend = {
    _id: currentUserData._id,
    displayName: currentUserData.displayName,
    email: currentUserData.providerData.email,
  };

  // Retrieve the current array, push the new item, and then update the field
  const senderRequests = senderUserData.friends || [];
  senderRequests.push(senderFriend);

  // Update the document with the new array
  updateDoc(senderUserRef, {
    friends: senderRequests,
  });

  //   Delete friend request from friendRequests
  await deleteDoc(
    doc(db, "friendRequests", requestInfo.sender_id + currentUserData._id)
  );
};
