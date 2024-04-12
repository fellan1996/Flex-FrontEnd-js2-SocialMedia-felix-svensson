import React from 'react';
import {
    addDoc,
    collection,
    doc,
    updateDoc,
    arrayUnion,
    getDoc,
    getDocs,
  } from "@firebase/firestore";
  import db from '../firebase';

interface makePostFormProps {
  loggedIn: [boolean, string];
}

const MakePostForm: React.FC<makePostFormProps> = ({ loggedIn }) => {
  const [post, setPost] = React.useState("");


  async function handlePostSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const userRef = doc(db, "users", loggedIn[1]);
    await updateDoc(userRef, {
      posts: arrayUnion(post),
    });
    //TODO add some conformation toast to let user know it worked out
    setPost("");
  }



  return (
    <form id="make-post-form" onSubmit={handlePostSubmit}>
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
};

export default MakePostForm;
