const UserModel = require("../Model/user.model");
const jwt =require("jsonwebtoken");
const bcrypt = require('bcrypt');

const onRegister= async (req,res)=>{
    const{name,email,password}= req.body;

    if(!name || !email || !password){
       return res.status(400).send({success:false, message:"Missing Fields for Register"});
    }
    try{

        const existingUser = await UserModel.findOne({email:email});
        if(existingUser){
          return res.status(400).send({success:false, message:"User already Present with provided Email id"})
        }
        //Salting
        const salt = await bcrypt.genSaltSync(10);
        //Hashing
        const hashedPassword = await bcrypt.hashSync(password,salt)
        //updating password with hased password
        req.body.password=hashedPassword;
        
        const newUser= new UserModel(req.body);
        await newUser.save();
        return res.status(201).send({success:true, message:"Registeration Successful, Please Login"});

    }catch(err){
        return res.status(500).send({message:"Internal Server Error",error:err})
    }
}

const onLogin = async (req,res)=>{

    const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).send({success:false, message:"Either Email or Password is missing"});
    }
    try{
        const existingUser = await UserModel.findOne({email:email});
        if(!existingUser){
            return res.status(400).send({success:false, message:"User with provided Email id not Present"})
        }
        const hashCorrectedPassword = existingUser.password;
        const isPasswordValid = bcrypt.compareSync(password,hashCorrectedPassword)

        if(!isPasswordValid){
            return res.status(400).send({success:false, message:"Invalid password"})
        }

        const token = jwt.sign({userId:existingUser._id},process.env.SECRET_KEY)
        res.status(201).send({
            success:true, 
            message:"Login Successful",
            accessToken:token
        });
    }catch(err){
        return res.status(500).send({message:"Internal Server Error"})
    }
}

const getCurrentUser = (req,res)=>{
    // console.log(req.headers);
    const token = req.headers['access-token'];

    if(!token){
        return res.status(400).send({message:"JWT token not passed"});
    }
    jwt.verify(token,process.env.SECRET_KEY,async (err,payload)=>{
        if(err){
            return res.status(403).send({message: "You are not allowed to access, Invalid Token"})
        }
        // console.log(payload);
        const userId = payload.userId;
        const userResponse = await UserModel.findById(userId);
        const {_id,name,email,role} = userResponse;
         return res.send({_id,name,email,role});
    })
}

module.exports = {onRegister, onLogin, getCurrentUser}