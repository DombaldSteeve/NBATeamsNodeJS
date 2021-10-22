import mongoose from 'mongoose';
import { stringify } from 'querystring';
//import { Schema } from 'mongoose';
mongoose.connect('mongodb://localhost:27017/nbateamsdb', {useNewUrlParser:true});

// Model puis intentiation
const userSchema = new mongoose.Schema({
    Username: String,
    Password: String,
    Email: String,
    postedDate: {
      type: Date,
      default: new Date(),
    },
})     
         

const User = mongoose.model('User', userSchema);

export default User;