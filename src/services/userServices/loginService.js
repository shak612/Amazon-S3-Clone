const Users = require('../../models/users');
const bcrypt = require('bcrypt');
const { Validator } = require('../../utils/validator');
const jwt = require('jsonwebtoken');

exports.loginService = async (userData) => {
    const response = {
        status: false,
        message: "",
    }

    try {
      
      if(!Validator.isEmpty(userData.username)){
       response.message = "User Name should not be empty!!"
       return response;
      }

      if(!Validator.isEmpty(userData.password)){
        response.message = "Password should not be empty!!"
        return response;
      }

      const findUserData = await Users.findOne({ username: userData.username })

      if(findUserData && Object.keys(findUserData).length > 0){
        const result = bcrypt.compareSync(userData.password, findUserData.password)
        if(result){
         const token = jwt.sign(
            {userId: findUserData._id}, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: 86400}
            )
            response.status = true; 
            response["accessToken"] = token;
            response.message = "Successfully Login!!"
        }else{
          response["message"] = "Invalid Password!!"
        }
      }else{
        response.message = "Username is not existed!!"
      }
      
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