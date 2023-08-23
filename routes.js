const express = require('express');
const router = express.Router();
const { User, Course } = require('./models')

// async Handler to run functions through error try catch block

function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}


// Return all properties & values for currently authenticated User + 200 status 
router.get('/users', asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.json(users).status(200);
}));

// Create a new user, set Location header to "/" +  201 status
router.post('/users', asyncHandler(async (req, res) => {
    await User.create(req.body);
    res.status(201).json({ "message": "User created successfully!" }).redirect('/');
}));

// Return all courses including User associated + 200 status
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll();
    res.json(courses).status(200);
}));

// Return corresponding course including the User + 200 status
router.get('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    res.json(course).status(200);
}));

/* Create a new course, set Location header to the URI of created course 
+ 201 status + no content
*/
router.post('/courses', asyncHandler(async (req, res) => {
    const newCourse = await Course.create(req.body);
    res.status(201).render({newCourse, "message" : "Course created successfully!" });
}));

module.exports = router;

