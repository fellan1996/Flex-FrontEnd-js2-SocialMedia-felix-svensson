import React from "react";
import ListOfUsers from "./ListOfUsers";
import LoggedInUser from "./LoggedInUser";

interface sidebarProps {
  keyProp: number;
  loggedIn: [boolean, string];
  onLogOut: () => void;
  onDeleteUser: () => void;
}

const Sidebar: React.FC<sidebarProps> = ({
  keyProp,
  loggedIn,
  onLogOut,
  onDeleteUser,
}) => {
  return (
    <div id="side-bar">
      {loggedIn[0] && (
        <LoggedInUser
          username={loggedIn[1]}
          onLogOut={onLogOut}
          onDeleteUser={onDeleteUser}
        />
      )}
      <div>
        <p id="users-headline">Users</p>
        <ListOfUsers keyProp={keyProp} />
      </div>
    </div>
  );
};

export default Sidebar;
