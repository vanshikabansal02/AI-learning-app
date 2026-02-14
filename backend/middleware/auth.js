import jwt  from "jsonwebtoken";
import User from '../models/User.js'

const protect=async(req,res,next)=>{

      console.log("ALL HEADERS:", req.headers);
    let token;
    //check if token exists in header

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
           token=req.headers.authorization.split(' ')[1];

           //verify token
           const decoded=jwt.verify(token,process.env.JWT_SECRET);
           req.user=await User.findById(decoded.id).select('-password');
console.log("AUTH HEADER:", req.headers.authorization);

            if(!req.user){
                return res.status(401).json({
                    success:false,
                    error:'user not found',
                    statusCode:401
                });
            }
            next();
        }
        catch(error){
            console.error('auth middleware error:',error.message);

            if(error.name==='TokenExpiredError'){
                return res.status(401).json({
                    success:false,
                    error:'token has expired',
                    statusCode:401
                                });
            }
        
        return res.status(401).json({
            success:false,
            error:'not authorized,token failed',
            statusCode:401
        });
    }
}
if(!token){
    return res.status(401).json({
        success:false,
        error:'not authorized,no token',
        statusCode:401
    });
}
};
           
export default protect;

