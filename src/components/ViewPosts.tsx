import React, { useState } from "react";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  getDocs,
} from "@firebase/firestore";
import db from "../firebase";
import norway from "../pictures/nordic-landscape.jpg";
import stockholm from "../pictures/stockholm.jpg";
import tomater from "../pictures/tomater.jpg";

interface viewPostsProps {
  loggedIn: [boolean, string];
}

const ViewPosts: React.FC<viewPostsProps> = ({ loggedIn }) => {
  const [posts, setPosts] = React.useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [picture, setPicture] = React.useState("");

  const fetchPosts = async (): Promise<void> => {
    const docRef = doc(db, "users", loggedIn[1]);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPosts(docSnap.data().posts);
        setLoading(false);
      }
    } catch (error) {
      console.log("error fetching posts: ", error);
    }
  };

  const fetchProfilePicture = async (): Promise<void> => {
    let profilePicName = "";
    const docRef = doc(db, "users", loggedIn[1]);
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

  fetchProfilePicture();
  fetchPosts();
  return (
    <div id="list-of-posts">
      <div id="view-post-headline">
        <img src={picture} height={60} />
        <h4>{loggedIn[1]}</h4>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post, index) => (
          <div className="post">
            <p key={index}>{post}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewPosts;
