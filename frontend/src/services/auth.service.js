import axios from "axios";

const API_URL = "http://localhost:5000/users/";

const login = async (email, password) => {
    try {
        await axios.post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
}
};

const logout = () => {
  localStorage.removeItem("user");
};

export default { login, logout };