import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import ListOfUsers from "./components/ListOfUsers";
import RegisterNewUser from "./components/RegisterNewUser";
import Sidebar from "./components/Sidebar";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
} from "@firebase/firestore";
import db from "./firebase";
import LoggedInUser from "./components/LoggedInUser";

function App() {
  const [greeting, setGreeting] = React.useState("No one is logged in");
  const [newUser, setNewUser] = React.useState("username");
  const [loggedIn, setLoggedIn] = React.useState<[boolean, string]>([
    false,
    "",
  ]);
  const [keyProp, setKeyProp] = React.useState(0); // Needed to rerender the ListOfUsers when a new user has been added

  const handleSubmit = async (username: string, password: string) => {
    // check credentials
    const credentialsAreCorrect = await checkCredentials(username, password);
    console.log(credentialsAreCorrect + "  cred");
    if (credentialsAreCorrect) {
      console.log("correct");
      setLoggedIn([true, username]);
    }
  };
  const deleteUser = async () => {
    try {
      if (loggedIn[0] && loggedIn[1] !== "") {
        const docRef = doc(db, "users", loggedIn[1]);
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
        logOut();
        // setNewUser('');
      }
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const logOut = () => {
    setLoggedIn([false, ""]);
    setKeyProp((prevKeyProp) => prevKeyProp + 1);
  };

  React.useEffect(() => {
    if (loggedIn[0]) {
      setGreeting(loggedIn[1]);
    } else {
      setGreeting("No one is logged in");
    }
  }, [loggedIn]);

  React.useEffect(() => {
    //rerender ListOfUsers
    setKeyProp((prevKeyProp) => prevKeyProp + 1);
  }, [newUser]);

  async function checkCredentials(
    username: string,
    password: string
  ): Promise<boolean> {
    const docRefUser = doc(db, "users", username);
    let credentialsAreCorrect = false;
    try {
      const docSnap = await getDoc(docRefUser);
      if (docSnap.exists()) {
        const dbPassword = docSnap.data().password;
        if (password === dbPassword) credentialsAreCorrect = true;
      }
    } catch (error) {
      console.error("Error checking credentials:", error);
    }
    return credentialsAreCorrect;
  }
  return (
    <div className="App">
      <header className="App-header">
        <Sidebar keyProp={keyProp} loggedIn={loggedIn} onLogOut={logOut} onDeleteUser={deleteUser}/>
        <img src={logo} className="App-logo" alt="logo" />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <LoginForm onSubmit={handleSubmit}></LoginForm>
      <RegisterNewUser onSubmit={(user: string) => setNewUser(user)} />
    </div>
  );
}

export default App;
