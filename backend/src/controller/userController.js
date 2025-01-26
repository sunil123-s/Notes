import User from "../model/userModel.js"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

dotenv.config()
const jwt_secret = process.env.JWT_TOKEN; 

export const Register = async(req, res) => {
    try {
        const {name, email, password} = req.body
         
        if(!name || !email || !password){
            return res.status(500).json({success:false, message:"All Filed Required"}) 
        }

        const existinguser = await User.findOne({email})
        if(existinguser){
            return res
              .status(500)
              .json({ success: false, message: "User Already Exists" }); 
        }

        const hassPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            password:hassPassword
        })

        await user.save()

        const token = jwt.sign({userId:user._id},jwt_secret,{expiresIn:"7d"})

        res.status(200).json({success:true, data:{
            _id : user._id,
            name : user.name,
            email : user.email,
            token,
        }})

    } catch (error) {
         console.error("Error during registration:", error);
         return res
           .status(500)
           .json({ success: false, message: "Failed to Register" }); 
    }
}

export const Login = async(req , res) => {
    try {
        const {email, password} = req.body

        const existinguser = await User.findOne({email})
        if(!existinguser){
            return res
              .status(500)
              .json({ success: false, message: "Invailed Email or password" }); 
        }

        const isMatch = await bcrypt.compare(password, existinguser?.password)

        if(!isMatch){
          return res.status(401).json({success: false,message: "Invalid email or password.",});
        }
        
         const token = jwt.sign({ userId: existinguser._id }, jwt_secret, {expiresIn: "7d"});
        res.status(200).json({
          success: true,
          data: {
            _id: existinguser._id,
            name: existinguser.name,
            email: existinguser.email,
            token,
          },
        });
    } catch (error) {
          console.error("Error during registration:", error);
          return res
            .status(500)
            .json({ success: false, message: "Failed to Login" });
    }
}

export  const getUser = async (req, res) => {
    try {
       const user = req.user

       const isUser = await User.findOne({_id:user._id})
       if(!isUser){
        return res
          .status(401)
          .json({ success: false, message: "User Not Found" });
       }
       res.status(200).json({success:true, data:{
        _id:isUser._id,
        name:isUser.name,
        email:isUser.email,
        createdOn:isUser.createdOn,
       }}) 
    } catch (error) {
        console.log(error)
        return res
          .status(401)
          .json({ success: false, message: "User Not Found" });
    }
}