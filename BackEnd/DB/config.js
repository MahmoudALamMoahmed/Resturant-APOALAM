// getting-started.js
import { connect } from 'mongoose';


const dbConnection = connect('mongodb://127.0.0.1:27017/final-project').then(() => {
    console.log("db connected")
}).catch((err) => {
    console.log(err);
});



export default dbConnection;

