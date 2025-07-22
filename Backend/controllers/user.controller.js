import  User  from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (userId)=>{
    return jwt.sign({id:userId}, process.env.JWT_SECRET,{
        expiresIn: "7d",
    });
}
export const register = async(req,res)=>{
    const {name,email,password} = req.body;

    try {
        
    
          if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields (name, email, password) are required",
        success: false,
      });
    }

         const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long and include 1 lowercase, 1 uppercase, and 1 special character",
                success: false
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message:"User already exists"});

        const hashedPassword = await bcrypt.hash(password,11);

        const user = await  User.create(
            {name,
            email,
            password:hashedPassword
            });
     

         const token= generateToken(user._id);

          return res.status(201)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None" ,
        secure: true,
        maxAge: 7* 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User registered successfully",
        user,
        success: true,
      });

    } catch (error) {
        return res.status(500).json({message:"Registration failed", error: error.message})
    }
}

export const googleAuth = async(req,res)=>{
    const {name,email, googleId} = req.body;

    try {
        let user = await User.findOne({email});

        if(!user)
        {
            user = await User.create({
        email,
        name,
        googleId,
      });
        }

        const token= generateToken(user._id);

          return res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None" ,
        secure: true,
        maxAge: 7* 24 * 60 * 60 * 1000,
      })
      .json({
         message: `Welcome ${user.name}`,
        user,
        success: true,
      });


    } catch (error) {
        return res.status(500).json({message:"Google authentication failed",error: error.message})
    }
}

export const login = async(req,res)=>{
    const {email, password} = req.body;

    try {

        
        if (!email || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        const user = await User.findOne({email});

        if(!user || !user.password ){
             return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

        const token= generateToken(user._id);

         return res.status(200).cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "None"
    }).json({
      message: `Welcome back ${user.name}`,
      user,
      success: true
    });


    } catch (error) {
        return  res.status(500).json({ message: "Login failed", error: error.message });
    }
}


export const logout = async (req, res) => {
    try {

        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true

        })
    } catch (error) {
        console.log(error);
    }
};

