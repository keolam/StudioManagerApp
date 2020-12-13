
import axios from 'axios';

const verifyLogin = async () => {

    let currentUser = sessionStorage.getItem('user');
    if (currentUser) {   

        let webToken = JSON.parse(currentUser).token;
        try {

            const user = await axios.get('/api/users/profile',
            {
                headers: {
                    'Content-type': 'application/json',
                    'authorization': `Bearer ${webToken}`
                }
            })
            console.log(user.data);
            return user.data;

        }
        catch (error) {
            console.log(error)
        }
    } else {
      console.log('token invalid');
      sessionStorage.clear();
      return;
    }
    console.log('Unregistered');
    return; 
}


export default verifyLogin;