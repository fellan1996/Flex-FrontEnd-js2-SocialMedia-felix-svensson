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
}

const Sidebar: React.FC<sidebarProps> = ({
  keyProp,
  loggedIn,
  onLogOut,
  onDeleteUser,
  onMakePost,
  onViewPosts
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
      </div>
    </div>
  );
};

export default Sidebar;
