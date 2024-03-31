import React from 'react';
import './UserBox.css';
import { jwtDecode } from 'jwt-decode';

function UserBox({ setModalBox, token, setToken, setPage }) {

  function logout() {
    setToken(null);
    localStorage.removeItem('token');
    setPage('Main');
  }

  function MultipleBoxes() {
    if (token !== null && typeof token === 'string') {
      const login = jwtDecode(token).login;

      // console.debug(login)

      return (
        <div className="UserBox">
          <p>Welcome,{login}!</p>
          <button onClick={() => setPage('Cabinet')}>Personal data</button>
          <button onClick={() => logout()}>Exit</button>
        </div>
      );
    }

    return (
      <div className="UserBox">
        <button onClick={() => setModalBox('Login')}>Sign In</button>
        <button onClick={() => setModalBox('Registration')}>Sign Up</button>
      </div>
    );
  }

  return (
    <MultipleBoxes />
  );
}

export default UserBox;
