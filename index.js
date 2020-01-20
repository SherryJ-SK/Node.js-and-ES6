// const questions = [
/// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// init();

const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const htmlJS = require("./generateHTML");
console.log(htmlJS);

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
        console.log(github, color);
        axios
            .get(`https://api.github.com/users/${github}`)
            .then(function (res) {
                const { avatar_id,
                    location,
                    url,
                    public_repos,
                    followers,
                    following,
                    starred_url } = res.data;

                htmlJS({color, ...res.data});
                returnInfo(data);

                //read information from generateHTML.js

                // async function combineHTML(){
                //     try {
                //         const getHTML = await readFileAsync("generateHTML.js","utf8");

                //     }
                // };
                // appendFileAsync("index.html", htmlJS.createHtml + "\n").then(function () {
                //     readFileAsync("index.html", "utf8").then(function (data) {
                //         console.log("Saved");
                //         console.log(data);
                //     });
                // });

            });
    });

function returnInfo(data) {
    return `
    <body>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
    <img href=${avatar_id} alt="avatar>
    <h1 class="display-4">Hi! My name is ${data.username}</h1>
    <p class="lead">I am from ${location}.</p>
    <h3>Example heading <span class="badge badge-secondary">Contact Me</span></h3>
    <ul class="list-group">
      <li class="list-group-item">My GitHub username is ${github}</li>
      <li class="list-group-item">GitHub Link: ${url}</li>
      <li class="list-group-item">Starred: ${starred_url}</li>
      <li class="list-group-item">Number of repos: ${public_repos}</li>
      <li class="list-group-item">Followers: ${followers}</li>
      <li class="list-group-item">Following: ${following}</li>
    </ul>
    </div>
    </div>
    </body>
    </html>
    `
}


