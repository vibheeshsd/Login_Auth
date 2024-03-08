const User = require("../model/user");
const {hashPassword , comparedPassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')

const test = (req, res) => {
  res.json("test is working");
};

// Register Endpoint
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // check if name was entered
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }
    // check is password is good
    if (!password || password.length < 6) {
      return res.json({
        error:
          "Password is required and password must contain atleast 6 charaters long",
      });
    }
    // check email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "user is already exist",
      });
    }

    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      name,
      email,
      password : hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// Login Endpoint

const userLogin = async(req, res) =>{
    try {
        const { email, password} = req.body;

        // check if already exist
        const user = await User.findOne({email})
        if(!user){
            return res.json({
                error: "No user found"
            })
        }
        // Check if password match  
        const match = await comparedPassword(password , user.password)
        if(match){
            jwt.sign({email:user.email,id:user._id,name:user.name}, process.env.JWT_SECRET,{},(err , token)=>{
                if(err) throw err;
                res.cookie('token',token).json(user)
            })
        }
        if(!match){
            res.json({
                error: "Password do not match"
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req,res)=>{
    const {token} = req.cookies
    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err,user)=>{
            if(err) throw err;
            res.json(user)
        })
    }
    else{
        res.json(null)
    }

}

module.exports = {
  test,
  userRegister,
  userLogin,
  getProfile,
};
