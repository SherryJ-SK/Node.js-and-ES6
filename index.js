const inquirer = require("inquirer");
const axios = require("axios");
const generateHTML = require("./generateHTML");
const fs = require("fs");
const convertFactory = require("electron-html-to");

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
                api.getStars(github).then(function (response) {
                    const starNumber = [];
                    const starResponse = response.data;
                    starResponse.forEach(function (starResponse) {
                        starNumber.push(starResponse.stargazers_count);
                    })
                    const reducer = (total, num) => total += num;
                    const starCount = starNumber.reduce(reducer);
                    // return generateHTML({ starCount, color, ...res.data });
                    const htmlData = generateHTML({ starCount, color, ...res.data });

                    function convertToPDF(htmlData) {
                        const conversion = convertFactory({
                            converterPath: convertFactory.converters.PDF
                        });
                        conversion({ html: htmlData }, function (err, result) {
                            if (err) {
                                return console.error(err);
                            }
                            // console.log(result.logs);
                            result.stream
                                .pipe(fs.createWriteStream("./html.pdf"));
                            conversion.kill();
                            console.log("PDF file has been created.");
                        })
                    };
                    convertToPDF(htmlData);
                })
            });
    })

api = {
    getUser: function (github) {
        return axios.get(`https://api.github.com/users/${github}`)
    },
    getStars: function (github) {
        return axios.get(`https://api.github.com/users/${github}/repos`)
    }
}
