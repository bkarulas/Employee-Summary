const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
var fs = require("fs");
var employees = [];


//Since the Manager is the 1st employee it will ask for their info first.
getManagerInfo()

//Manager info question
async function getManagerInfo() {
    const questionManager = await inquirer.prompt([
        {
            message: "What is your Manager's name?",
            name: "name"
        },
        {
            message: "What is your Manager's ID number?",
            name: "id"
        },
        {
            message: "What is your Manager's email?",
            name: "email"
        },
        {
            message: "What is your Manager's office number",
            name: "officeNumber"
        }
    ])
    //creates a new manager
    let manager = new Manager(questionManager.name, questionManager.id, questionManager.email, questionManager.officeNumber);
    //adds the manager to the employee array
    employees.push(manager);

    //calls the function for the next employee
    getQuestions();
}

//next employee
async function getQuestions() {

    //what type of employee? or are you done?
    const questionNext = await inquirer.prompt([
        {
            type: "list",
            message: "What kind of employee do you want to add?",
            name: "position",
            choices: [
                "Engineer",
                "Intern",
                "Done"
            ]
        }
    ])

    //checks to see what posistion is to be added next or if the user is done
    switch (questionNext.position) {

        case "Engineer":
            return getEngineerInfo();
            break;
        case "Intern":
            return getInternInfo();
            break;
        case "Done":

            fs.writeFile("output/index.html", html(employees), function (err) {

                if (err) {
                    return console.log(err);
                }
            });
            break;
    }

    //askes the question for Engineer if that is what was selected
    async function getEngineerInfo() {

        const questionEngineer = await inquirer.prompt([
            {
                message: "What is your Engineer's name?",
                name: "name"
            },
            {
                message: "What is your Engineer's ID number?",
                name: "id"
            },
            {
                message: "What is your Engineer's email?",
                name: "email"
            },
            {
                message: "What is your Engineer's GitHub username",
                name: "github"
            }
        ])
        //creates a new engineer
        let engineer = new Engineer(questionEngineer.name, questionEngineer.id, questionEngineer.email, questionEngineer.github);
        //adds the engineer to the emplyees array
        employees.push(engineer);

        getQuestions();
    }

    //askes the question for Intern if that is what was selected
    async function getInternInfo() {

        const questionIntern = await inquirer.prompt([
            {
                message: "What is your Intern's name?",
                name: "name"
            },
            {
                message: "What is your Intern's ID number?",
                name: "id"
            },
            {
                message: "What is your Intern's email?",
                name: "email"
            }, 
            {
                message: "What is your Intern's school",
                name: "school"
            }
        ])
        //creates a new intern
        let intern = new Intern(questionIntern.name, questionIntern.id, questionIntern.email, questionIntern.school);
        //addes the intern to the employees array
        employees.push(intern);

        getQuestions();
    }
}

//creates the HTML
let html = function (data) {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <title>My Team</title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
            </head>
            <body class="container">
                <style>
                    .jumbotron{
                        background: #e94854; 
                        color: white;
                        text-align: center;
                    }
                    .cardbody{
                        width: 90%;
                        margin-bottom: 30px;
                    }
                    .card-header{
                        color: white;
                        background: #0f77f7;
                    }
                    .card-body{
                        background: #f6f8f9;
                        padding-top: 40px;
                        padding-bottom: 40px;
                    }
                    .info{
                        background: white;
                        border-style: solid;
                        border-width: 1px;
                        border-color: #e6e6e6;
                        padding: 10px;
                        margin: 0px;
                    }
                </style>
                <div class="jumbotron" style="background: #e94854; color: white" > 
                    <h1>My Team</h1>
                </div>
                <div class="row">        
                    ${makeCards(data)}
                </div>
            </body>
        </html>
        `
}

function makeCards(data) {

    return data.map(person => {
        let position = person.getRole();

        switch (position) {
            case "Manager":
                return makeManagerCard(person);
                break;
            case "Engineer":
                return makeEngineerCard(person);
                break;
            case "Intern":
                return makeInternCard(person);
                break;
        }

    }).join('\n')
}

function makeManagerCard(person) {

    let mangerCard =
        `<div class="col-4">
            <div class="card cardbody">
                <div class="card-header">
                    <h2>${person.name}</h2>
                    <h3><i class="fas fa-mug-hot"></i>&nbsp;Manager</h3>
                </div>
                <div class="card-body">
                    <div class="info">ID: ${person.id}</div>
                    <div class="info">Email: ${person.email}</div>
                    <div class="info">Office Number: ${person.officeNumber}</div>				
                </div>
            </div>
        </div>`

    return mangerCard
}
function makeEngineerCard(person) {
    let engineerCard =
        `<div class="col-4">
            <div class="card cardbody">
                <div class="card-header">
                    <h2>${person.name}</h2>
                    <h3><i class="fas fa-glasses"></i>&nbsp;Engineer</h3>
                </div>
                <div class="card-body">
                    <div class="info">ID: ${person.id}</div>
                    <div class="info">Email: ${person.email}</div>
                    <div class="info">GitHub: ${person.github}</div>				
                </div>
            </div>
        </div>`
    return engineerCard
}
function makeInternCard(person) {
    let internCard =
        `<div class="col-4">
            <div class="card cardbody">
                <div class="card-header">
                    <h2>${person.name}</h2>
                    <h3><i class="fas fa-user-graduate"></i>&nbsp;Intern</h3>
                </div>
                <div class="card-body">
                    <div class="info">ID: ${person.id}</div>
                    <div class="info">Email: ${person.email}</div>
                    <div class="info">School: ${person.school}</div>				
                </div>
            </div>
        </div>`
    return internCard
}