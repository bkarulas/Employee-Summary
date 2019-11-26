const inquirer = require('inquirer')


//Questions asked to the user
const questions = [
    {
        type: "list",
        message: "What is your position in the company? ",
        name: "position",
        choices:[
            "Manager",
            "Engineer",
            "Intern"
        ]
    }
    {
        type: "input",
        name: "userEmail",
        message: "What is your Email Address? "
    },
];

const questManager = 