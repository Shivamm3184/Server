const mongoose = require('mongoose');
const local_url = 'mongodb://127.0.0.1:27017/MSC'
const live_URL ='mongodb+srv://shivammishra3184:ram123@cluster0.lpfai.mongodb.net/MSC?retryWrites=true&w=majority&appName=Cluster0'

const connectDB = async () => {
    return mongoose.connect(live_URL)
    // return mongoose.connect(local_url)

    .then(()=>{
        console.log('Connected to the database');
    }).catch((error)=>{
        console.log(error)
    })

}
module.exports = connectDB;