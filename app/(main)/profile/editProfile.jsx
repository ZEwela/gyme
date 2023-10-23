import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUser,
  setUserDisplayName,
  setUserFullName,
} from "../../../store/slices/userSlice";
import EditProfileItem from "../../../components/EditProfileItem";
import { ScrollView } from "react-native-gesture-handler";
import { updateUserDisplayName } from "../../../actions/users/updateUserDisplayName";
import { updateUserEmail } from "../../../actions/users/updateUserEmail";
import { updateUserFullName } from "../../../actions/users/updateUserFullName";

const editProfile = () => {
  const userStore = useSelector(selectUser);
  const dispatch = useDispatch();

  const [fullName, setFullName] = useState(userStore?.fullName || "");
  const [email, setEmail] = useState(userStore?.providerData?.email || "");
  const [displayName, setDisplayName] = useState(userStore?.displayName || "");

  const [editFullName, setEditFullName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editDisplayName, setEditDisplayName] = useState(false);

  const handleFullNameEdit = () => {
    setEditFullName(true);
  };
  const saveFullNameChanges = async () => {
    await updateUserFullName(fullName);
    setEditFullName(false);
    dispatch(setUserFullName(fullName));
  };
  const handleEmailEdit = () => {
    setEditEmail(true);
  };
  const saveEmailChanges = async () => {
    await updateUserEmail(email);
    setEditEmail(false);
  };
  const handleDisplayNameEdit = () => {
    setEditDisplayName(true);
  };
  const saveDisplayNameChanges = async () => {
    await updateUserDisplayName(displayName);
    setEditDisplayName(false);
    dispatch(setUserDisplayName(displayName));
  };

  return (
    <ScrollView style={styles.container}>
      <EditProfileItem
        title={"Full Name:"}
        handleEdit={handleFullNameEdit}
        saveChanges={saveFullNameChanges}
        placeholder={"full name"}
        displayValue={fullName}
        setDisplayValue={setFullName}
        editMode={editFullName}
      />
      {/* <EditProfileItem
        title={"Email:"}
        handleEdit={handleEmailEdit}
        saveChanges={saveEmailChanges}
        placeholder={"email"}
        displayValue={email}
        setDisplayValue={setEmail}
        editMode={editEmail}
      /> */}
      <EditProfileItem
        title={"Display Name:"}
        handleEdit={handleDisplayNameEdit}
        saveChanges={saveDisplayNameChanges}
        placeholder={"display name"}
        displayValue={displayName}
        setDisplayValue={setDisplayName}
        editMode={editDisplayName}
      />
    </ScrollView>
  );
};

export default editProfile;

const styles = StyleSheet.create({
  container: { flex: 1, margin: 20, gap: 20 },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  textTitle: { fontSize: 22, fontWeight: "bold" },
  text: { fontSize: 20, alignSelf: "center" },
  item: { marginVertical: 10, backgroundColor: "#E5E4E2", padding: 20 },
  edit: {
    elevation: 2,
    backgroundColor: "#bab5b5",
    borderRadius: 25,
    padding: 2,
  },
  input: {
    padding: 5,
    fontSize: 20,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
