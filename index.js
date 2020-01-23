const inquirer = require("inquirer");
const axios = require("axios");
const generateHTML = require("./generateHTML");
const fs = require("fs");
convertFactory = require("electron-html-to");


const questions = [
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
];

inquirer.prompt(questions)
    .then(function ({ github, color }) {
        console.log("Searching...");
        api
            .getUser(github)
            .then((res) => {
                // console.log("line 32")

                return generateHTML({ color, ...res.data });

            })
            .then((htmlData) => {
                // console.log("line 34");
                // const conversion = convertFactory({
                //     converterPath: convertFactory.converters.PDF
                // });
                // conversion({ htmlData }, function (err, result) {
                //     if (err) {
                //         return console.error(err);
                //     }
                //     console.log(result.logs);
                //     result.stream.pipe(fs.createWriteStream("./html.pdf"));
                // });
            })
            .then(api.getStars(github).then(function (res) {
                // console.log("line 47");
                const starResponse = res.data;

                starResponse.forEach(function (starResponse) {
                    console.log(starResponse.stargazers_count);
                })
            }));
    })


// .catch(function (err) {
//     if (err) {
//         console.log(err);
//     }
// })

api = {
    getUser: function (github) {
        return axios.get(`https://api.github.com/users/${github}`)
    },
    getStars: function (github) {
        return axios.get(`https://api.github.com/users/${github}/repos`)
    }
}

    // console.log("stars");
    // const totalStars = data.reduce(function (accumulator, stargazers_count) {
    //     return accumulator + { stargazers_count };
    // }, 0);
    // console.log(totalStars);



