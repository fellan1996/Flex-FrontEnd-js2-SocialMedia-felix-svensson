import React from 'react';
import {
    addDoc,
    collection,
    doc,
    updateDoc,
    getDoc,
    getDocs,
  } from "@firebase/firestore";
  import db from '../firebase';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(username, password);
  };



  return (
    <>
    <h4>Log in</h4>
    <form onSubmit={handleSubmit} id='login-form'>
      <label>
        Username:&nbsp;  
        <input type="text" value={username} required onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password:&nbsp;  
        <input type="password" value={password} required onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Login</button>
    </form>
    </>
  );
};

export default LoginForm;
