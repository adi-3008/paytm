const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const authMiddleWare = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({
            message : "Invalid JWT"
        });
    }
    
    const token = authHeader.split(" ")[1];

    try{
        const decodedToken = jwt.verify(token, JWT_SECRET);
        if(decodedToken.userId){
            req.userId = decodedToken.userId
            next();
        }else{
            return res.status(401).json({
                message : "Invalid JWT"
            })
        }
    } catch(err){
        return res.status(401).json({
            message : "Invalid JWT"
        })
    }

}

module.exports = authMiddleWare