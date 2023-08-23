const express = require('express');
const router = express.Router();
const { User } = require('./models')

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


// Return all properties & values for currently authenticated User + 200 HTTP status 
router.get('/users', asyncHandler( async(req, res) => {
    const users = await User;
    res.json(users).status(200);
}))

// Create a new user, set Location header to "/" +  201 HTTP status
router.post('/users', (req, res) => {
    res.redirect('/').status(201);
})

module.exports = router;

