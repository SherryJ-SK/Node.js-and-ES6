const inquirer = require("inquirer");
const axios = require("axios");
const htmlJS = require("./generateHTML");
const fs = require("fs");
convertFactory = require("electron-html-to");

const conversion = convertFactory({
    converterPath: convertFactory.converters.PDF
});

function userInfo() {
    return inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub username: "
        },
        {
            type: "list",
            name: "color",
            message: "Choose a color from below list: ",
            choices: ["green", "blue", "pink", "red"]
        }
    ])
};

userInfo()
    .then(function ({ github, color }) {
        api
            .getUser(github)
            .then(function (res) {
                api.getStars(github)
                    .then(function (stars) {
                        htmlJS({ stars, color, ...res.data });
                    })
            });
    })
    .then({ htmlJS }, function (err) {
        if (err) {
            return console.error(err);
        }
    })
api = {
    getUser: function (github) {
        return axios.get(`https://api.github.com/users/${github}`)
    },
    getStars: function (github) {
        return axios.get(`https://api.github.com/users/${github}/repos`)
    }
}
