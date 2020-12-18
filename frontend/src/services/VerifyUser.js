
import axios from 'axios';

const verifyLogin = async () => {

    let currentUser = sessionStorage.getItem('user');
    if (currentUser !== null) {   

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
            if (user.status === 401) {
                currentUser = { };
                currentUser.name = 'Intern';
                console.log(currentUser);
                return currentUser
            }
            return user.data;

        }
        catch (error) {
            console.log(error);
            sessionStorage.clear();
            console.log('token invalid');
      
        }
    }
    console.log('Unregistered');
    currentUser = { };
    currentUser.name = 'Intern';
    console.log(currentUser);
    return currentUser
}

export default verifyLogin;