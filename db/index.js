const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:XlzM3Cmi9h0GzGB0@cluster0.xi16d.mongodb.net/Course_App');

// Define schemas
const AdminSchema = new mongoose.Schema({
    email:String,
    password:String
});

const UserSchema = new mongoose.Schema({
    // Schema definition here
    email:String,
    password:String,
    purchasedId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    // Schema definition here
    title:String,
    discription:String,
    imgLink:String,
    price:Number
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
    Admin,
    User,
    Course
}