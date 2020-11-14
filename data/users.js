const bcrypt = require('bcryptjs');

const users = [
    {
        name: 'Admin User',
        email: 'admin@hydestreet.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true 
    },
    {
        name: 'Jack Kertzman',
        email: 'jack@hydestreet.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true 

    },
    {
        name: 'Eric Glauser',
        email: 'eric@hydestreet.com',
        password: bcrypt.hashSync('123456', 10),
    
    }
]

module.exports = users;