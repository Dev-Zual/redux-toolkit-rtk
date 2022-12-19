import axios from "axios";
let URL;
switch (process.env.REACT_APP_ENVIRONMENT) {
  case "DEVELOPMENT":
    URL = "https://moontech-server-g4u6.onrender.com/";
    break;
  case "PRODUCTION":
    URL = "https://moontech-server-g4u6.onrender.com/";
    break;
  default:
    URL = "https://moontech-server-g4u6.onrender.com/";
}

const instance = axios.create({
  baseURL: URL,
});

export default instance;
