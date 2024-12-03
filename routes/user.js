const { Router } = require("express");//router is given form express
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const email = req.body.email
    const password = req.body.password
    User.create({
        email:email,
        password:password
    })
    res.send("new user created")
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const responce = await Course.find({})
    res.json({courses:responce})
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    const courseid = req.params.courseId
    const email = req.body.email
    await User.updateOne({
        email:email
    },{
        "$push":{
            purchasedId:courseid
        }
    })
    res.send("purchased done")
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        email: req.body.email
    })
    console.log(user.purchasedId)
    try{
        const courses = await Course.find({
            _id:{
                "$in":user.purchasedId
            }
        })
        res.json({courses:courses})

    }catch(e){
        res.send("you have not buyed any course yet!")
    }
});

module.exports = router