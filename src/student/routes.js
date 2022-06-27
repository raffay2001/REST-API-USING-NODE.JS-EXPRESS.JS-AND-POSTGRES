const { Router } = require('express');
const controller = require('./controller.js');

const router = Router();

router
    .route('/')
    .get(controller.getStudents);

router
    .route('/:id')
    .get(controller.getStudentById)

router
    .route('/')
    .post(controller.addStudent);

router
    .route('/:id')
    .delete(controller.removeStudent);

router
    .route('/:id')
    .put(controller.updateStudent);

module.exports = router;