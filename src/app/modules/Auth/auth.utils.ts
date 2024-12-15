
import jwt from 'jsonwebtoken';
export const createToken = (
    JwtPayload: {userId: string, role: string},
    secret: string,
    expiresIn: string
)=>{
   return jwt.sign(JwtPayload, secret, { expiresIn });
}