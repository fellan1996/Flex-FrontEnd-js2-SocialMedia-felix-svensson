import React from "react";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
  setDoc,
  getDocs,
} from "@firebase/firestore";
import db from "../firebase";
import LoginForm from "./LoginForm";

interface mainProps {
  whatToShow: string;
  loggedIn: [boolean, string];
  onLogIn: (username: string, password: string) => void;
}

const Main: React.FC<mainProps> = ({ whatToShow, loggedIn, onLogIn }) => {
  const [post, setPost] = React.useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userRef = doc(db, "users", loggedIn[1]);
    await updateDoc(userRef, {
      posts: arrayUnion(post),
    });
    //TODO add some conformation toast to let user know it worked out
    setPost("");
  }

  if (whatToShow === "makePost" && loggedIn[0]) {
    return (
      <form id="make-post-form" onSubmit={handleSubmit}>
        <h4>Let your friends know what is happening in your life</h4>
        <textarea
          id="make-post-text"
          placeholder="Write here"
          value={post}
          onChange={(event) => setPost(event.target.value)}
        ></textarea>
        {post !== "" 
        ? (<button type="submit">Post!</button>) 
        : (<button disabled type="submit">Post!</button>)}
      </form>
    );
  } else if (!loggedIn[0] || whatToShow === "login") {
    return (
      <div>
        <h4>Log in</h4>
        <LoginForm onSubmit={onLogIn} />
      </div>
    );
  } else {
    return <></>;
  }
};

export default Main;
