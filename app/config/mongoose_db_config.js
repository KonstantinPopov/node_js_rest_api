var mongoose = require('mongoose');

mongoose.connect(process.env.DB_CONNECT);

mongoose.connection.on('error',(err)=>
{
    console.error('Database Connection Error: ' + err);
    process.exit(1);
});

mongoose.connection.on('connected',()=>
{
    console.info('Succesfully connected to MongoDB Database');
});
