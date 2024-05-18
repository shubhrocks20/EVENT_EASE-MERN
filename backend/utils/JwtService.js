import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from '../config/index.js';
class JwtService{
    static sign(payload, secret = JWT_SECRET_KEY){
        return jwt.sign(payload, secret);
    }
    static verify(token, secret = JWT_SECRET_KEY){
        return jwt.verify(token, secret);

    }
    
}
export default JwtService;