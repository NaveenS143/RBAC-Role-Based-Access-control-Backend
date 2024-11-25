const authorizeRoles=(...allowedRoles)=>{
    return(req, res, next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message: "Unauthorized"});
        }
        next();
    };
};

module.exports =authorizeRoles;