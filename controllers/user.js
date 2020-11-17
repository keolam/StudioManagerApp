const User = require('../models/User');

exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.name
        });
    }
}
    
exports.getUser = (req, res, next) => {
    let id = req.params.id;
    User.findById(id, function(err, singleUser){
        res.json(singleUser);
    });
}

exports.addUser = async (req, res, next) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const user = await User.create(req.body);
        return res.status(201).json({
            success: true,
            data: user
        });
        
    } catch (err) {
        console.log(err); 
    }
}

exports.editUser = async (req, res, next) => {
    try {
        const singleUser = await User.findById(req.params.id);

        if(!singleUser){
            res.status(404).send('User not found');
        } 
        singleUser.name = req.body.name;
        singleUser.email = req.body.added_by
        singleUser.password = req.body.notes;
        singleUser.isAdmin = req.body.isAdmin;

        await singleUser.save();

        return res.status(200).json({
            success: true,
            data: singleUser
        });
    } catch (err) {
        res.status(400).send("Unable to update");
    }     
}    

exports.deleteUser = async (req, res, next) => {
    console.log("User deleted");
    try {
        const singleUser = await User.findById(req.params.id);
        if(!singleUser){
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        await singleUser.remove();

        return res.status(200).json({
            success: true,
            data: {} 
        });
    }   catch (err) {
        return res.status(500).json({
            success: false,
            error: "Unable to delete"
        })  
    }
}