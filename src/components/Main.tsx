import React from "react";
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

  if (whatToShow === "makePost" && loggedIn[0])
    return <MakePostForm loggedIn={loggedIn} />;

  if (whatToShow === "registerNewUser")
    return <RegisterNewUser onSubmit={onRegisterNewUser} />;

  if (whatToShow.split("-")[0] === "viewPosts" && loggedIn[0])
    return <ViewPosts whosPosts={whatToShow.split("-")[1]} />;

  if (whatToShow === "login" || !loggedIn[0])
    return <LoginForm onSubmit={onLogIn} />;

  return <h4>Something went wrong</h4>;
};

export default Main;
