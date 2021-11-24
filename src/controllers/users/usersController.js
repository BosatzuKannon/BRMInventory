const User = require('../../models/users').users;
const Utils = require('../commons/utils')
const bcrypt = require('bcrypt')

module.exports = {
    async createUser(req,res){
        try{
            const userModel = await Utils.getModel('public',User);
            const hashedPassword = await bcrypt.hash(String(req.body.user.password), 10)
            const userData = {
                doc: req.body.user.doc,
                name: req.body.user.name,
                lastname: req.body.user.lastname,
                password: hashedPassword,
                role: req.body.user.role,
            }
            
            const user = await Utils.insert_data(userData,userModel,'id');            
            
            res.status(200).send(user);
        }catch(err){
            res.status(400).send({'Server error':err.message});        
        }
    }
}