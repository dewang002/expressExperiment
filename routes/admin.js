const { Router } = require("express");
const z = require("zod")
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();
// Admin Routes
const schemas=({
    title:z.string(),
    discription:z.string(),
    imgLink:z.string().url(),
    price:z.number()
})
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const email = req.headers.email
    const password = req.headers.password
    await Admin.create({
        email:email,
        password:password
    })
    res.send('created an Adim!')
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic
    try{

        const titleResult = schemas.title.safeParse(req.body.title);
        const discriptionResult = schemas.discription.safeParse(req.body.discription);
        const imgLinkResult = schemas.imgLink.safeParse(req.body.imgLink);
        const priceResult = schemas.price.safeParse(req.body.price);
        

        if (!titleResult.success || 
            !discriptionResult.success || 
            !imgLinkResult.success || 
            !priceResult.success) {
          return res.status(400).json({
            error: "Validation failed"
          });
        }
    
        // All validations passed
        const courseData = await Course.create({
          title: titleResult.data,
          discription: discriptionResult.data,
          imgLink: imgLinkResult.data,
          price: priceResult.data,
        });
    
        res.json({ msg: "Created a course", courseId: courseData._id });
       
    }catch(err){
        res.json({msg:"something went wrong"})
    }
});

router.get('/courses', adminMiddleware, async(req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({})
    res.send(response)
});

module.exports = router;