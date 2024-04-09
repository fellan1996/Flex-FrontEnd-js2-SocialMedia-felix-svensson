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
import norway from "../pictures/nordic-landscape.jpg";
import stockholm from "../pictures/stockholm.jpg";
import tomater from "../pictures/tomater.jpg";

interface LoggedInUserProps {
  onLogOut: () => void;
  onDeleteUser: () => void;
  username: string;
}
const LoggedInUser: React.FC<LoggedInUserProps> = ({
  onLogOut,
  onDeleteUser,
  username,
}) => {
  const [picture, setPicture] = React.useState("");

  //Få reda på vilken bild den inloggade användaren har

  const fetchProfilePicture = async (): Promise<void> => {
    let profilePicName = "";
    const docRef = doc(db, "users", username);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        profilePicName = docSnap.data().picture;
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    switch (profilePicName) {
      case "norway":
        setPicture(norway);
        break;
      case "stockholm":
        setPicture(stockholm);
        break;
      case "tomater":
        setPicture(tomater);
        break;
      default:
        console.log("no picture was set");
    }
  };

  fetchProfilePicture();

  return (
    <div id="logged-in-sidebar">
      <div id="user-logged-in">
        <img src={picture} height={60} />
        <p>{username}</p>
      </div>
      <div>
        {/* ska lägga till en "view posts"-knapp */}
        <button onClick={onDeleteUser}>Delete account</button>
        <button onClick={onLogOut}>Log out</button>
      </div>
    </div>
  );
};

export default LoggedInUser;
