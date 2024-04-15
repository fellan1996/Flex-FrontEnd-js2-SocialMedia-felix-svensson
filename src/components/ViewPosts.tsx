import React from "react";
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
  whosPosts: string;
}

const ViewPosts: React.FC<viewPostsProps> = ({ whosPosts }) => {
  const [posts, setPosts] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [picture, setPicture] = React.useState("");
  console.log(whosPosts);

  const fetchPosts = async (): Promise<void> => {
    const docRef = doc(db, "users", whosPosts);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().posts.length > 0) {
        setPosts(docSnap.data().posts);
      } else {
        setPosts(["no posts yet"]);
      }
      setLoading(false);
    } catch (error) {
      console.log("error fetching posts: ", error);
    }
  };

  const fetchProfilePicture = async (): Promise<void> => {
    let profilePicName = "";
    const docRef = doc(db, "users", whosPosts);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        profilePicName = docSnap.data().picture;
        console.log(profilePicName);
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
    async function fetchProfileAndPosts() {
      await fetchPosts();
      await fetchProfilePicture();
    }
    fetchProfileAndPosts();
  }, [whosPosts])

  return (
    <div id="list-of-posts">
      <div id="view-post-headline">
        <img src={picture} height={60} />
        <h4>{whosPosts}</h4>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post, index) => (
          <div key={index} className="post">
            <p >{post}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ViewPosts;
