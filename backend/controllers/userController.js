const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../module/userModel')

// @desc register new user 
// @route  POST/api/users
// @access public

const registerUser = asyncHandler(async (req,res) =>{
    const{name,email,password} =req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fileds')
    }
    //check user exist
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw Error ('user already exist')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)

        })

    }else{
        res.status(400)
        throw new Error ('invalid user data')
    }

})

// @desc uthenticate user 
// @route  POST/api/users/login
// @access public

const loginUser = asyncHandler(async(req,res) =>{
    const {email,password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password,user.password))) {
        res.json({
            _id:user.id,
            name:user.name,
            email:user.email,  
            token:generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error ('invalid user data')
    }

})


// @desc   get user data
// @route  GET/api/users/me
// @access public

const getMe = asyncHandler(async(req,res) =>{
   const {_id,name,email} = await User.findById(req.user.id)
   res.status(200).json({
    id:_id,
    name,
    email,
   })
})


//generate JWT
const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1d'
    })
}

module.exports = {
    registerUser,
    loginUser,
    getMe
}