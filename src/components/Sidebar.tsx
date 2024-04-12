import React from "react";
import ListOfUsers from "./ListOfUsers";
import LoggedInUser from "./LoggedInUser";

interface sidebarProps {
  keyProp: number;
  loggedIn: [boolean, string];
  onLogOut: () => void;
  onDeleteUser: () => void;
  onMakePost: () => void;
  onViewPosts: () => void;
  onRegisterUser: () => void;
  onLogIn: () => void;
}

const Sidebar: React.FC<sidebarProps> = ({
  keyProp,
  loggedIn,
  onLogOut,
  onDeleteUser,
  onMakePost,
  onViewPosts,
  onRegisterUser,
  onLogIn
}) => {
  return (
    <div id="side-bar">
      {loggedIn[0] && (
        <LoggedInUser
          username={loggedIn[1]}
          onLogOut={onLogOut}
          onDeleteUser={onDeleteUser}
          onMakePost={onMakePost}
          onViewPosts={onViewPosts}
        />
      )}
      <div>
        <p id="users-headline">Users</p>
        <ListOfUsers keyProp={keyProp} />
        <button id="sidebar-register-btn" onClick={onRegisterUser}>Register new user</button>
        {!loggedIn[0] && (<button id="sidebar-login-btn" onClick={onLogIn}>Log in</button>)}
      </div>
    </div>
  );
};

export default Sidebar;
