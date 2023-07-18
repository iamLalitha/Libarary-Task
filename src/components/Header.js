import React from "react";
export default class Header extends React.Component {
  render() {
    return (
      <h1 className="Header">
        <img id="logoHeader" src="logo192.png" alt="React Logo"></img>
        <p>Library Management System</p>
      </h1>
    );
  }
}