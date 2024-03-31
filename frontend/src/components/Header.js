import React from 'react';
import './Header.css';
import UserBox from './UserBox';

function Header({ setPage, setModalBox, token, setToken }) {
  function BasketLink() {
    if (token !== null) {
      return (
        <>
          <li onClick={() => setPage('Basket')}>Basket</li>
        </>
      )
    }
  }

  return (
    <div className="Header">
      <ul>
        <li onClick={() => setPage('Main')}>Main</li>
        <BasketLink />
      </ul>
      <UserBox setModalBox={setModalBox} token={token} setToken={setToken} setPage={setPage} />
    </div>
  );
}

export default Header;
