// const questions = [
/// ];

// function writeToFile(fileName, data) {
// }

// function init() {

// init();
// const questions = [

// ];

// function writeToFile(fileName, data) {

// }

// function init() {

// init();

const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");
const html = require("generateHTML");

inquirer.prompt([
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
]).then(function (data) {
    // const filename = data.name.toLowerCase().split(" ").join("") + ".json";

    // fs.writeFile(filename, function (err) {
    //     if (err) {
    //         throw err
    //     }
    // })

    const queryUrl = `https://api.github.com/users/${data.github}`;

    axios.get(queryUrl)
        .then(function (res) {
            console.log(res.data)
        })
})
