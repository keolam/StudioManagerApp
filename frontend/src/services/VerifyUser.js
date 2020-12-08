
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
            return user.data;

        }
        catch (error) {s
            console.log(error)
        }
    } else {

      sessionStorage.clear();
    }
    console.log("Please Login");
    return; 
}


export default verifyLogin;