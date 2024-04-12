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
import RegisterNewUser from "./RegisterNewUser";
import MakePostForm from "./MakePostForm";
import ViewPosts from "./ViewPosts";

interface mainProps {
  whatToShow: string;
  loggedIn: [boolean, string];
  onLogIn: (username: string, password: string) => void;
  onRegisterNewUser: (username: string) => void;
}

const Main: React.FC<mainProps> = ({
  whatToShow,
  loggedIn,
  onLogIn,
  onRegisterNewUser,
}) => {
  console.log(whatToShow);

  if (whatToShow === "makePost" && loggedIn[0]) {
    return <MakePostForm loggedIn={loggedIn} />;
  }

  if (whatToShow === "login") {
    return <LoginForm onSubmit={onLogIn} />;
  }

  if (whatToShow === "registerNewUser") {
    return <RegisterNewUser onSubmit={onRegisterNewUser} />;
  }

  if(whatToShow === "viewPosts") {
    return <ViewPosts loggedIn={loggedIn}/>
  }
  return <h4>Something went wrong</h4>;
};

export default Main;
