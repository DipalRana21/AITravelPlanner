import jwt from "jsonwebtoken"


export const authenticateUSer = async(req, res, next)=>{
    const token = req.cookies.token;

    if(!token){
          return res.status(401).json({ message: "Unauthorized, no token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized, token invalid", error: error.message });
    }
}

