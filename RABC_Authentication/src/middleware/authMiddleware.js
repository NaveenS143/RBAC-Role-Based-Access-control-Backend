const jwt=require("jsonwebtoken");

const verifyToken=(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({message:"Token is required"});
        }
    }

    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        console.log("The decoded user is: ",req.user);
        next();
    }catch(e){
        res.status(401).json({message:"Invalid token"});
    }
};

module.exports=verifyToken;