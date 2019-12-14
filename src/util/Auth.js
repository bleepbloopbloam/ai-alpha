import Cookies from "universal-cookie";

const cookies = new Cookies();

// const token = localStorage.getItem("authUserCode") || cookies.get("token");
const token = localStorage.getItem("authUserCode");

export default token;
