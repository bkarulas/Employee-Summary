const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const Employee = require("./lib/Employee");
var fs = require("fs");
var employees = [];

getManagerInfo()

async function getManagerInfo() {

    const { name, id, email, officeNumber } = await inquirer.prompt([
        {
            message: "What is your Manager's name?",
            name: "name"
        },
        {
            message: "What is your Manager's ID?",
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
    let manager = new Manager(name, id, email, officeNumber);
    employees.push(manager);

    getQuestions();
}

async function getQuestions() {

    const { position } = await inquirer.prompt([
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

    async function getEngineerInfo() {

        const { name, id, email, github } = await inquirer.prompt([
            {
                message: "What is your Engineer's name?",
                name: "name"
            },
            {
                message: "What is your Engineer's ID?",
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
        let engineer = new Engineer(name, id, email, github);
        employees.push(engineer);

        getQuestions();
    }

    async function getInternInfo() {

        const { name, id, email, school } = await inquirer.prompt([
            {
                message: "What is your Intern's name?",
                name: "name"
            },
            {
                message: "What is your Intern's ID?",
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
        let intern = new Intern(name, id, email, school);
        employees.push(intern);

        getQuestions();
    }

    switch (position) {

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
}

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
                border-radius: 10px;
                box-shadow: 5px 10px 8px #888888;
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
                    <div class="info">Office Number: ${person.github}</div>				
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
                    <div class="info">Office Number: ${person.school}</div>				
                </div>
            </div>
        </div>`
    return internCard
}