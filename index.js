// const questions = [
/// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// init();

const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const html = require("./generateHTML");

function userInfo() {
    return inquirer.prompt([
        {
            type: "input",
            name: "username",
            message: "Enter your name: "
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub username: "
        },
        {
            type: "input",
            name: "location",
            message: "Enter your location: "
        }
    ])
};

userInfo()
    .then(function (data) {

        axios
            .get(`https://api.github.com/users/${data.github}`)
            .then(function (res) {
                const { avatar_id } = res.data;
                const { location } = res.data;
                const { url } = res.data;
                const { public_repos } = res.data;
                const { followers } = res.data;
                const { following } = res.data;
                const { starred_url } = res.data;
                
                returnInfo(data);

                //read information from generateHTML.js
                appendFileAsync("index.html", html.createHtml + "\n").then(function () {
                    readFileAsync("index.html", "utf8").then(function (data) {
                        console.log("Saved");
                        console.log(data);
                    });
                });

            });
    });

function returnInfo(data) {
    return `
    <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
    <h1 class="display-4">Hi! My name is ${data.username}</h1>
    <p class="lead">I am from ${location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${github}</li>
      <li class="list-group-item">GitHub Link: ${url}</li>
    </ul>
    </div>
    </div>
    </body>
    </html>
    `
}


