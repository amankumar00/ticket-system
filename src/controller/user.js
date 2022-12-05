const User = require('../model/user.js')
const shortid = require('shortid');
const { json } = require('body-parser');

const createUser = async(req,res) =>{
    let user = new User();
    user.uid = shortid.generate();
    user.email = req.body.email;
    user.name = req.body.name;

    user.save((error, data)=>{
        if(error){
            return res.status(400).json({
                message: 'Something Went wrong'
            });
        }
        if(data){
            return res.status(201).json({
                message : 'User created Succesfully'
            });
        }
    });
}

const updateUser = async (req,res) =>{
    try{
    await User.findOneAndUpdate({ uid : req.params.uid}, { name : req.body.name})
    return res.status(201).json({"message" : "User updated" })
    }
    catch(e){
        return res.status(400).json({"message": "Something went wrong"})
    } 
}

const deleteUser = async (req,res) =>{
    try{
    await User.findOneAndDelete({uid : req.params.uid})
    return res.status(200).json({"message": "User Deleted~"})
    }
    catch(e){
        return res.status(400).json({"message": "Something went wrong"})
    }
}

module.exports = {
    createUser,
    updateUser,
    deleteUser
}