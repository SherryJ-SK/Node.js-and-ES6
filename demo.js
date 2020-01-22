const inquirer = require("inquirer");
const axios = require("axios");
const htmlJS = require("./generateHTML");
const fs = require("fs");

const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
    },
    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["red", "blue", "green", "pink"]
    }
];

function init() {
    inquirer.prompt(questions).then(({ github, color }) => {
        console.log("Searching...");
        api
            .getUser(github)
            .then(response =>
                api.getStars(github).then(stars => {
                    return generateHTML({
                        stars,
                        color,
                        ...response.data
                    });
                })
            )
            .catch(function (err) {
                if (err) {
                    console.log(err);
                }
            })
            .then({ htmlJS }, () => {
                console.log();
            })
    });
}
init();

function writeToFile(fileName, data) {
    return fs.writeFileSync(path.join(process.cwd(), fileName), data);
}
writeToFile();


api = {
    getUser: function (github) {
        return axios.get(`https://api.github.com/users/${github}`)
    },
    getStars: function (github) {
        return axios.get(`https://api.github.com/users/${github}/repos`)
    }
}
