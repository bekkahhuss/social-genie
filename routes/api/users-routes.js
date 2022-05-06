const router = require('express').Router();
const {
    getAllUsers,
    getUsersById, 
    createUsers, 
    updateUsers, 
    deleteUsers, 

} = require('../../controllers/users-controller');

// set up GET all and POST at /api/users
router 
    .route('/')
    .get(getAllUsers)
    .post(createUsers);


// set up GET one, PUT and DELETE at /api/users/:id
router 
    .route('/:id')
    .get(getUsersById)
    .put(updateUsers)
    .delete(deleteUsers);

module.exports = router;
