import React from "react";
import {
  collection,
  doc,
  getDoc,
  setDoc,
} from "@firebase/firestore";
import db from "../firebase";

const RegisterNewUser: React.FC<{onSubmit: (newUser: string) => void}> = ({onSubmit}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [profilePic, setProfilePic] = React.useState('norway');
  
  console.log("is there a loop?")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await checkIfUserAlreadyExists())
      console.log("that user already exists in the db");
    else {
        onSubmit(username);
        await addUserToDb()
    };
  };

  const addUserToDb = async () => {
    const myCollection = collection(db, "users");
    const myDocumentData = {
      password: password,
      picture: profilePic,
      posts: [],
    };

    // Define the document reference
    const myDocRef = doc(myCollection, username);

    // Add or update the document
    await setDoc(myDocRef, myDocumentData);
  };

  async function checkIfUserAlreadyExists(): Promise<boolean> {
    const docRefUser = doc(db, "users", username);
    let userAlreadyExists = true;
    try {
      const docSnap = await getDoc(docRefUser);
      if (!docSnap.exists()) {
        userAlreadyExists = false;
      }
    } catch (error) {
      console.error("Error checking if user exists: ", error);
    }
    return userAlreadyExists;
  }

  return (
    <>
      <h4>Register New User</h4>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <label>
          profilePic:
          <select name="profilePics" id="profilePic-selecter" required onChange={(event) => setProfilePic(event.target.value)}>
            <option value="norway">Norway</option>
            <option value="stockholm">Stockholm</option>
            <option value="tomater">Tomatoes</option>
          </select>
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterNewUser;
