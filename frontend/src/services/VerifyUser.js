
import axios from 'axios';

const verifyLogin = () => {

    let currentUser = sessionStorage.getItem('user');

    if (currentUser !== null) {

        let webToken = JSON.parse(currentUser).token;

        try {
            async function verifyToken() {
                //console.log(`currentUser is ${currentUser.name}`)
                const user = await axios.get('/api/users/profile',
                    {
                        headers: {
                            'Content-type': 'application/json',
                            'authorization': `Bearer ${webToken}`
                        }
                    })
                if (user.status === 401) {
                    sessionStorage.removeItem("user");
                    currentUser = {};
                    currentUser.name = 'Intern';
                    console.log(`401: ${currentUser.name}`);
                    return currentUser;
                }
                //console.log(user.data);
                return user.data;
            }
            verifyToken();
        }
        catch (error) {
            console.log(error);
            sessionStorage.clear();
            console.log('token invalid');
        }
        return JSON.parse(currentUser);

    } else {
        //console.log('Unregistered');
        currentUser = {};
        currentUser.name = 'Intern';
        //console.log(currentUser);
        return currentUser
    }
}

export default verifyLogin;