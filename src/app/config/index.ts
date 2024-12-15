import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path: path.join(process.cwd(), '.env')});

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT ,
    DATABASE_URL: process.env.DATABASE_URL ,
    default_password: process.env.DEFAULT_PASSWORD,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
   jwt_access_secret: process.env.JWT_ACCESS_SECRET,
   jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
   jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,

}