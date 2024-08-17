const mongoose = require("mongoose");
const config = require("./config");

exports.mongoConnect = () =>{
    const mongoStringConnection = `mongodb://${config.mongoURI}:${config.port_db}/${config.DB_NAME}`;
    mongoose.set('strictQuery', true);
    mongoose.connect(mongoStringConnection);
    mongoose.Promise = global.Promise;
    const dbConnection = mongoose.connection;
    dbConnection.on("open", () => console.log("Mongodb connection stablished"));
    dbConnection.on("error", console.error.bind(console,"Mongodb connection error"))
}