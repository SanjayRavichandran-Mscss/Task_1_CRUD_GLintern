const express = require('express');
router = express.Router()
const service = require('../services/employee.service');
const express = require('express');

// use JSON format to handle the data for below CRUD operations in POSTMAN API

// http://localhost:3000/api/employees/

// READ ALL RECORDS || GET ALL RECORDS
router.get('/',async (req,res)=>{
    const employees = await service.getAllEmployees()
        res.send(employees)
})


// READ RECORD || GET BY ID
router.get('/:id',async (req,res)=>{
    const employee = await service.getEmployeeById(req.params.id)
    if(employee.length == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else 
        res.send(employee)
})

// DELETE RECORD || DELETE
router.delete('/:id',async (req,res)=>{
    const affectedRows = await service.deleteEmployee(req.params.id)
    console.log("affectedRows [deleted rows] : ",affectedRows)
    if(affectedRows == 0)
        res.status(404).json('no record with given id : ' + req.params.id)
    else 
        res.send('Record Deleted Successfully!')
})


// CREATE RECORD || POST
router.post('/',async (req,res)=>{
await service.addOrEditEmployee(req.body)
res.status(201).send('created successfully')
    
})


// UPDATE RECORD  || PUT
// ***here , must update the record in json format in postman , then only it will update to database , otherwise it shows null in mysql database
router.put('/:id',async (req,res)=>{
const affectedRows = await service.addOrEditEmployee(req.body, req.params.id)
console.log("affectedRows [Updated rows] : ",affectedRows)
if(affectedRows == 0)
    res.status(404).json('no record with given id : ' + req.params.id)
else 
    res.send('Record Updated Successfully!')
    
})


module.exports = router;