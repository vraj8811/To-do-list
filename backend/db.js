const mongoose = require('mongoose');
const mongoURL = "mongodb://127.0.0.1:27017/todo-list";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL);
        // await mongoose.createConnection(mongoURL,()=>
        // {
        //     useNewUrlParser: true;
        //     useUnifiedTopology: true;
        // });
        console.log("Connected to Mongo successfully..!!");
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }

};

module.exports = connectToMongo;