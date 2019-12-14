import React, { Component } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export class logout extends Component {
  render() {
    localStorage.clear();
    cookies.set("token", "", { path: "/" });
    window.location.href = "/";
    return <div />;
  }
}

export default logout;
