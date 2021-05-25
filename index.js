// Required packages to use the app
// The reason I used Delimeter in schema.sql,it just created the tables only with that
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable =require('console.table');
const { response } = require('express');
// to be able to connect mysql server
const db  = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'kaanbootcamp94',
        database: 'tracker'
    });
    db.connect(function(err) {
        if(err) throw (err);
        startQuestion();
    })
// using inquirer package to get user input
function startQuestion () {
    inquirer.prompt ( [
        {
        type: 'list',
        message: 'What would you like to do ?',
        name: 'option',
        choices: [
            'View All Employees',
            'View All Employees by Roles',
            'View All Employees by Department',
            'Update Employee',
            'Add Employee',
            'Add Role',
            'Add Department'
        ]
    }
    ])
    .then(function(answer){
        switch (answer.option){
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Employees by Roles':
                viewAllRoles();
                break;
            case 'View All Employees by Department':
                viewAllDepartments();
                break;
            case 'Update Employee':
                updateEmployee();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case  'Add Role':
                addRole();
                break;
            case  'Add Department':
                addDepartment();
                break;
                default:
        }
    });
}
// Showin and updating tables from mysql
function viewAllEmployees() {
    db.query(`SELECT * FROM employee `, 
    function(err, res) {
      if (err) throw err
      console.table(res);
      startQuestion();
  })
}
function viewAllRoles() {
    db.query (`SELECT * FROM roles`,
    function(err,res) {
        if(err) throw err
        console.table(res);
        startQuestion();
    })
}
function viewAllDepartments() {
    db.query (`SELECT * FROM department
    LEFT JOIN employee ON department.id = employee.id`,
    function(err,res) {
        if(err) throw err
        console.table(res);
        startQuestion();
    })
}
function updateEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            message:'which employee do you want to update',
            name: 'empUpdate'
        },
        {
            type:'input',
            message:'What do you want to update',
            name: 'empRole'

        }
    ])
    .then(function(answer) {
        db.query(`UPDATE employee SET role_id=? WHERE first_name=?`,[answer.empRole,answer.empUpdate],function(err,res){
            if(err) throw err
            console.table(res);
            startQuestion();
        })
    })
}
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the Role ?',
            name: 'roleName'
        },
        {
            type:'input',
            message: 'salary of the role',
            name: 'roleSalary'
        },
        {
            type:'input',
            message:'department id of the role',
            name: 'roleDept'
        }
    ])
    .then(function(answer) {
        db.query(`INSERT INTO roles (title,salary,department_id) VALUES (?,?,?)`,[answer.roleName,answer.roleSalary,answer.roleDept],function(err,res){
            if(err) throw err
            console.table(res);
            startQuestion();
        })
    })
}
function addEmployee () {
    inquirer.prompt ( [
        {
            type: 'input',
            message: 'what is the name of the name of the employee',
            name: 'empName'
        },
        {
            type: 'input',
            message: 'what is the last name of the employee',
            name: 'empSurname'
        },
        {
            type:'input',
            message: 'what is the role id of the employee',
            name: 'empRoleid'
        },
        {
            type: 'input',
            message: 'what is the manager id of the employee',
            name: 'empManagerid'
        }
    ])
    .then(function(answer){
        db.query(`INSERT INTO employee (first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`,[answer.empName,answer.empSurname,answer.empRoleid,answer.empManagerid],function(err,res){
            if(err) throw err
            console.table(res);
            startQuestion();
        })
    })
}
function addDepartment () {
    inquirer.prompt ([
        {
            type:'input',
            message: 'what is the name of department',
            name: 'depName'
        }
    ])
    .then(function(answer) {
        db.query(`INSERT INTO department (department_name) VALUES (?)`,[answer.depName],function(err,res){
            if(err) throw err
            console.table(res);
            startQuestion();
        })
    })
}