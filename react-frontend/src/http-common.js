import axios from "axios";

export default axios.create({
  baseURL: "http://3.145.1.248:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});