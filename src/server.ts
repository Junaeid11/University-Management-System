import config from "./app/config";
import mongoose, {  } from "mongoose";
import app2 from "./app";
import { Server } from "http";
let server : Server;

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









process.on('unhandledRejection', ()=>{
    console.log('Shutting down due to unhandled promise rejection ... ⚠️');
    if(server){
        server.close(()=>{
            process.exit(1)
        })
}
process.exit(1)
});

process.on('uncaughtException', ()=>{
    console.log('Shutting down due to unCoughException promise rejection ... ⚠️');
    process.exit(1)
})