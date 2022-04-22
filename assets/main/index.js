//Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// Function for populating a template literal with User's answers
const generateREADME = (data) =>
  `# ${data.projectTitle}
  [![License: ${data.license}](${data.license.shield})](${data.license.link})

  ## Description
  \`\`\`md
  - ${data.descriptionMotivation}
  - ${data.descriptionWhy}
  - ${data.descriptionWhatLearned}
  - ${data.descriptionAdd}
  \`\`\`  
  ## Table of Contents
   
  - [Installation](#installation)
  - [Usage](#usage)
  - [Credits](#credits)
  - [License](#license)
  - [How To Contribute](#how_to_contribute)
  - [Tests](#tests)
  - [Questions](#questions)
  
  ## Installation
  
  ${data.installation}
  
  ## Usage
  
  ${data.usage}
    
  ## Credits
  
  ${data.credits}
  
  ## License
  
  ${data.license} License

  Copyright (c) [2022] [${data.fullName}]
  
  ## How to Contribute
  
  - [Contributor Covenant](https://www.contributor-covenant.org/) 
  - ${data.contribute}
  
  ## Tests
  
  ${data.test}
  
  ## Questions
  
  \`\`\`md
    For any questions, you can reach me through my [GITHUB](${data.github}) or email: ${data.email} account. 
  \`\`\`  `;

//Create an array of questions for user input
const questions =[ 
  {//A greeting and brief description of the application
    type: "confirm",
    name: "introMssg",
    message: `Hi! Welcome to Node README generator.
    This application will create a high-quality, professional README file for your project.
    PLease answer the following questions. When a question is not applicable, type "N/A". (Hit enter to continue)`,
    default: true,
  },  
  {
    type: "input",
    name: "fullName",
    message: "What is your full name?",
  },
  {
    type: "input",
    name: "projectTitle",
    message: `What is the title of your project?`,
  },
  {
    type: "input",
    name: "github",
    message: `What is the URL to your GitHub account?`,
  },
  {
    type: "input",
    name: "email",
    message: `What is your email address?`,
  },
  {
    type: "confirm",
    name: "descriptionMssg",
    message: `--------------------------------------
    Provide a short description explaining the what, why, and how of your project. Use the following questions as guides (Hit enter to continue):`,
    default: true,
  },
  {
    type: "input",
    name: "descriptionMotivation",
    message: "What was your motivation or reason?",
  },
  {
    type: "input",
    name: "descriptionWhy",
    message: "What problem does it solve?",
  },
  {
    type: "input",
    name: "descriptionWhatLearned",
    message: "What did you learn?",
  },
  {
    type: "input",
    name: "descriptionAdd",
    message: "Anything else you would like to add to your description section?",
  },
  {
    type: "confirm",
    name: "moreQuestions",
    message: `--------------------------------------
    The following questions are about Installation, Usage Information, Contribution Guidelines and Test Instructions. (Hit enter to continue):`,
    default: true,
  },
  {
    type: "input",
    name: "installation",
    message: "What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.",
  },
  {
    type: "input",
    name: "usage",
    message: "Provide instructions and examples if any for use.",
  },
  {
    type: "input",
    name: "contribute",
    message: "The Contributor Covenant (an industry standard) link will be included in the README for other developers to use as a guide for contributing to your project. Are there additional guidelines you would like to add for contributors to follow (Hit enter for no)?",
  },
  {
    type: "input",
    name: "test",
    message: "Are there any tests for your application? If so, provide examples on how to run them here:",
  },
  {
    type: "confirm",
    name: "lastQuestions",
    message: `--------------------------------------
    The last questions are about Credits and type of License for your project: (Hit enter to continue):`,
    default: true,
  },
  {
    type: "input",
    name: "credits",
    message: "List your collaborators, if any, with links to their GitHub profiles. If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. If you followed tutorials, include links to those here as well.",
  },
  {
    type: 'checkbox',
    message: 'A license lets other developers know what they can and cannot do with your project. Please select one from the following options:',
    name: 'license',
    choices: [
      {
        name: 'MIT',
      },
      {
        name: 'ISC',
      },
      {
        name: 'GNU v3.0',
      },
      {
        name: 'Apache v2.0',
      },
    ],
    validate(answer) {
      if (answer == "MIT") {
        answer.link = 'https://opensource.org/licenses/MIT';
        answer.shield = 'https://img.shields.io/badge/License-MIT-yellow.svg';
        return true;
      } else if (answer == "ISC"){
        answer.link = 'https://opensource.org/licenses/ISC';
        answer.shield = 'https://img.shields.io/badge/License-ISC-blue.svg'
        return true
      } else if(answer == 'GNU v3.0'){
        answer.link = 'https://www.gnu.org/licenses/gpl-3.0';
        answer.shield = 'https://img.shields.io/badge/License-GPLv3-blue.svg';
        return true;
      }else {
        answer.link = 'https://opensource.org/licenses/Apache-2.0';
        answer.shield = 'https://img.shields.io/badge/License-Apache_2.0-blue.svg';
        return true;
      }
    },
  },
];

//Create a function to initialize app
function init() {
  inquirer.prompt(questions).then((answers) => {
    const readMeContent = generateREADME(answers);
// Create a function to write README file
    fs.writeFile("README.md", readMeContent, (err) =>
      err ? console.log(err) : console.log("You have successfully created your README file!")
    );
  });
}

//Function call to initialize app
init();
