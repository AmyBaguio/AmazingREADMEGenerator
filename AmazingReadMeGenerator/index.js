const inquirer = require("inquirer");
const fs = require("fs");
const util = require ("util");

const writeFileAsync = util.promisify(fs.writeFile);

// function that creates the array of questions for user

function promptUser() {
    return inquirer.prompt([
    
    {
        type: "input",
        message: " What is your project name?",
        name: "title"
    },
    {
        type: "input",
        message: "Please write a short description of your project.",
        name: "description"
    },
    {
        type: "checkbox",
        message: "What kind of license should your project have?",
        choices: [
            "Apache",
            "MIT",
            "ISC",
            "GNU GPLv3"
        ],
        name: "license"
    },
    {
        type: "input",
        message: "What command should be run to install dependencies?",
        name: "installation"
    },
    {
        type: "input",
        message: "What are the test instruction?",
        name: "test"
    },
    {
        type: "input",
        message: "How would you like your application to be used?",
        name: "usage"
    },
    {
        type: "input",
        message: "Who can contribute to this project?",
        name: "contribution"
    },
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email"
    },

    ]);

}

function generateMarkdown(response) {
    return `
    # ${response.title}
    
    # Table of Contents
    
    - [Description](#description)
    - [License](#license)
    - [Installation](#installation)
    - [Test](#test)
    - [Usage](#usage)
    - [Contributing](#contribution)
    - [Questions](#questions)

    ##Description:

    ![License](https://img.shields.io/badge/License-${response.license}-blue.svg "License Badge")

        ${response.description}

    ## License:
     
        For more information about the License, click on the link below;
    - [License](https://opensource.org/licenses/${response.license})    
    
    ## Installation:
        ${response.installation}

    ## Test:
        ${response.test} 

    ## Usage:
        ${response.usage} 

    ## Contributing:
        ${response.contribution} 
   
    ## Questions:

        For questions about the Generator, you can go to my 
        GitHub page at the following Link:
    
    - [GitHub Profile](https://github.com/${response.username})


    For additional questions, please reach out to my email at ${response.email}

    `;
}


// // function to initialize program
async function init() {
    try {
        const response = await promptUser();

        const readMe = generateMarkdown(response);

        await writeFileAsync("README.md", readMe);
        console.log("Generating READMe...");
    } catch (err) {
        console.log(err);
    }

}

// // function call to initialize program
init();
