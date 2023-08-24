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
    res.location('/').status(201).end();
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
    let course;
    if (req.body.title && req.body.description && req.body.userId) {
        course = await Course.create({
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId
        });
    }
    res.location(`localhost:5000/api/courses/${course.id}`).status(201).end();
}));

// Update the corresponding course + 204 status + no content
router.put('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    if (course) {
        await course.update({
            title: req.body.title,
            description: req.body.description,
            userId: req.body.userId
        })
    }
    res.status(204).end();
}));

// Delete the corresponding course + 204 status + no content
router.delete('/courses/:id', asyncHandler(async (req, res) => {
    const course = await Course.findByPk(req.params.id);
    await course.destroy();
    res.status(204).end();
}));

module.exports = router;

//*You are on number 9 - Add Validations!! So proud of you, you're getting routes*//

