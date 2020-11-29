import axios from 'axios';


const login = async (email, password) => {
    try {
        const res = await axios.post('api/users/login', {
            email,
            password
        })
        if (res.data.accessToken) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
    }
    catch(error){
      console.log(error);
    }  
}

const logout = () => {
  localStorage.removeItem('user');
};

export default { login, logout };