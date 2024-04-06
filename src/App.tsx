import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginForm from "./components/LoginForm";
import ListOfUsers from "./components/ListOfUsers";
import RegisterNewUser from "./components/RegisterNewUser";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  getDoc,
  getDocs,
} from "@firebase/firestore";
import db from "./firebase";

function App() {
  console.log("rendered app.tsx");
  const [greeting, setGreeting] = React.useState(
    "Edit src/App.tsx and save to reload."
  );
  const [newUser, setNewUser] = React.useState("username");
  const [loggedIn, setLoggedIn] = React.useState([false, ""]);
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

  React.useEffect(() => {
    if (loggedIn[0]) setGreeting("Welcome, " + loggedIn[1] + "!");
  }, [loggedIn]);

  React.useEffect(() => {
    //rerender ListOfUsers
    setKeyProp(prevKeyProp => prevKeyProp + 1);
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
        <img src={logo} className="App-logo" alt="logo" />
        <p>{greeting}</p>
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
      <ListOfUsers keyProp={keyProp} />
      <RegisterNewUser
        onSubmit={(user: string) => setNewUser(user)}
      />
    </div>
  );
}

export default App;
