const {JWT_SECRET} = require('./config');
const jwt = require('jsonwebtoken')


const authMiddleware =  function(req,res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ') ){
        return res.status(403).json({

        })
    }
    const token = authHeader.split(" ")[1];
  try{

    // now the decoded contains the payload of the token(payload means the info about the user)
    const decoded =  jwt.verify(token, JWT_SECRET);

    // we are extracting the userId from the payload and assigning it to the req.userId so that 
    // it can be accessed by the other routes in which this middleware is used

      req.userId = decoded.userId
      

    next();
  }    
    
catch(err){

    return res.status(403).json({});
  }

}

module.exports = {
authMiddleware
}