import config from "./app/config";
import mongoose from "mongoose";
import app2 from "./app";


async function practice (){
    try{
        await mongoose.connect(config.DATABASE_URL as string);
        app2.listen(config.port, ()=>{
            console.log(`Example app listening on port ${config.port} ⚠️ ☢️!`);
        })
}catch(err){
    console.error(`example app not listening on port ${err}!`);
}
}
practice()