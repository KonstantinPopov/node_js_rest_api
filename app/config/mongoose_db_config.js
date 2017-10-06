const mongoose = require('mongoose');
const dbConfig = 'mongodb://' + process.env.DB_CONNECT;

mongoose.connect(dbConfig)
.then(() => console.info('Succesfully connected to MongoDB Database'))
.catch(err => {console.error('Database Connection Error: ' + err); process.exit(1);});

let db = mongoose.connection;
