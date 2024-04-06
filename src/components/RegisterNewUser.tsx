import React from "react";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDoc,
  setDoc,
  getDocs,
} from "@firebase/firestore";
import db from "../firebase";

const RegisterNewUser: React.FC<{onSubmit: (newUser: string) => void}> = ({onSubmit}) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [postsAmount, setPostsAmount] = React.useState(0);

  //need to check if username already exists
  //need to add the user to firestore
  //need to have a handleSubmit
  //do we need to have another handleSubmit in the parent component?

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (await checkIfUserAlreadyExists())
      console.log("that user already exists in the db");
    else {
        onSubmit(username);
        addUserToDb()
    };
  };

  const addUserToDb = async () => {
    // Define the collection and document data
    const myCollection = collection(db, "users");
    const myDocumentData = {
      password: password,
      postsAmount: postsAmount,
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
          PostsAmount:
          <input
            type="number"
            value={postsAmount}
            required
            onChange={(event) => setPostsAmount(parseInt(event.target.value))}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterNewUser;
