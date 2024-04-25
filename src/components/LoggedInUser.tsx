import React from "react";
import {
  doc,
  getDoc,
} from "@firebase/firestore";
import db from "../firebase";
import norway from "../pictures/nordic-landscape.jpg";
import stockholm from "../pictures/stockholm.jpg";
import tomater from "../pictures/tomater.jpg";

interface LoggedInUserProps {
  onLogOut: () => void;
  onDeleteUser: () => void;
  username: string;
  onViewPosts: (username: string) => void;
  onMakePost: () => void;
}
const LoggedInUser: React.FC<LoggedInUserProps> = ({
  onLogOut,
  onDeleteUser,
  username,
  onViewPosts,
  onMakePost
}) => {
  const [picture, setPicture] = React.useState("");
  console.log("loggedInUser")
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
      console.error("Error fetching picture: ", error);
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

  React.useEffect(() => {
    async function fetchPicture() {
      await fetchProfilePicture();
    }
    fetchPicture();
  }, [])

  // fetchPicture();

  return (
    <div id="logged-in-sidebar">
      <div id="user-logged-in">
        <img src={picture} height={60} />
        <p>{username}</p>
      </div>
      <div>

        <button onClick={onMakePost}>Make a post</button>
        <button onClick={() => onViewPosts(username)}>View posts</button>
        <button onClick={onDeleteUser}>Delete account</button>
        <button onClick={onLogOut}>Log out</button>
      </div>
    </div>
  );
};

export default LoggedInUser;
