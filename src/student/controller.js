const pool = require('../../db.js');
const queries = require('./queries.js');

const getStudents = (req, res) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const getStudentById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
}

const addStudent = (req, res) => {
    const { name, age, email, dob } = req.body;

    // check if email exists
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) {
            res.send('Email Already Exists :(')
        }

        // add student to the dB 
        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) throw error;
            res.status(201).send('Student Created Successfully');
        });
    });

}

const removeStudent = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getStudentById, [id], (error, results) => {
        // check if the student does not exists in dB
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send('Student Does not Exists in the Database');
        }

        // deleting the student 
        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send('Student Removed Successfully.')
        });

    });
}

const updateStudent = (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;

    pool.query(queries.getStudentById, [id], (error, results) => {
        // check if the student does not exists in dB
        const noStudentFound = !results.rows.length;
        if (noStudentFound) {
            res.send('Student Does not Exists in the Database');
        }

        // update the student 
        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error) throw error;
            res.status(200).send('Student Updated Successfully')
        })
    });
}

module.exports = {
    getStudents, getStudentById, addStudent, removeStudent, updateStudent
}