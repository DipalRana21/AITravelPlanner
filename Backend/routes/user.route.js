import express from "express";
import {register,login,googleAuth,logout} from "../controllers/user.controller.js";
import {authenticateUSer} from "../middleware/authMiddleware.js";

const router= express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/logout",logout)

router.get("/me", authenticateUSer, (req,res)=>{
    return res.status(200).json({
    user: req.user,
    message: "Authenticated user fetched successfully"
    
  });
})


export default router;