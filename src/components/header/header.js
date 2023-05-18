import React from 'react';
import "./header.css"

function Header({ username, onLogout }) {
  return (
    <header>
      <div className="logo">
        <h2>Valkiria Records</h2>
        <span>Welcome, <strong>{username}</strong></span>
        <button onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
