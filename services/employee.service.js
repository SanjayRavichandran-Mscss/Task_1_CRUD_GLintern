const db = require('../config/db')

module.exports.getAllEmployees = async ()=>{
    const [records] = await db.query("SELECT * FROM employees")
    .catch(err => console.log(err))
    return records;
}

module.exports.getEmployeeById = async (id)=>{
    const [[record]] = await db.query("SELECT * FROM employees WHERE id = ?" , [id])
    .catch(err => console.log(err))
    return record;
}

module.exports.deleteEmployee = async (id)=>{
    // const [record] = await db.query("DELETE FROM employees WHERE id = ?" , [id])
    // .catch(err => console.log(err))
    // return record.affectedRows;
    const [{ affectedRows }] = await db.query("DELETE FROM employees WHERE id = ?",[id])
    return affectedRows
}


module.exports.addOrEditEmployee = async (obj,id = 0)=>{
    const [[[{affectedRows}]]] = await db.query("CALL usp_employee_add_or_edit(?,?,?,?)" , [id,obj.name, obj.employee_code,obj.salary])  // Destructuring the affectedRows
    // .catch(err => console.log(err))
    return affectedRows;
}