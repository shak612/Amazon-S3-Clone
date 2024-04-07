const Users = require('../../models/users');
const bcrypt= require('bcrypt');
const { Validator } = require('../../utils/validator');

exports.registerService = async (userData) => {
    const response = {
        status: false,
        message: "",
    }
    const validate = Validator.validateRegisterForm(userData);
    if(!validate.status){
      response.message = validate.message;
      return response; 
    }

    try {
      const hash = await bcrypt.hash(userData.password, 8);
      if(!hash) {
        response.message = "Error while creating hash!!";
        return response;
      }

      const userDoc = new Users({
        fullName: userData.fullName,
        username: userData.username,
        emailId: userData.emailId,
        password: hash  
      })
      
      await userDoc.save();
      response.status = true;
      response.message = "Successfully registered!!"

     return response;
    } catch (error) {
      console.log(error)
        const response = {
            status: false,
            message: error,
        }     
        return response;
    }
}