var mongoose = require('mongoose');
console.log( 'mongodb://' + process.env.DB_CONNECT);
const dbConfig = 'mongodb://' + process.env.DB_CONNECT;

mongoose.connect(dbConfig);
let db = mongoose.connection;

db.on('error',(err)=>
{
    console.error('Database Connection Error: ' + err);
    process.exit(1);
});

db.on('connected',()=>
{
    console.info('Succesfully connected to MongoDB Database');
});

db.once('open', function callback () {
    console.info("Connected to DB!");
});