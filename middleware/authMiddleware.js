var jwt = require("jsonwebtoken");
const authMiddleware = (req,res,next)=>{
    //getting token from frontend
    const token = req.header("token");

    // returning error if token doesn't exist

    if(!token){
        return res.status(401).json({msg:"No token"});
    }

    //verifying token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err,decodedToken)=>{
        console.log("decodedToken", decodedToken);
        if(err){
            return res.status(401).json({msg:"Invalid Token"});
        } else {
            req.decodedUser = decodedToken.userData;
            next();
        }
    });
};
module.exports = authMiddleware;