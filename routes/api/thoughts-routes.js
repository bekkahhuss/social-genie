const router = require('express').Router();
const { get } = require('http');
const {
    getAllThoughts,
    getThoughtsById,
    createThoughts, 
    updateThoughts, 
    deleteThoughts 
} = require('../../controllers/thoughts-controller');

// set up GET and POST at /api/thoughts 

router
    .route('/')
    .get(getAllThoughts)
    .post(createThoughts)

// set up GET one, PUT, and DELETE at /api/thoughts/:id

router
    .route('/:id')
    .get(getThoughtsById)
    .put(updateThoughts)
    .delete(deleteThoughts)

module.exports = router;