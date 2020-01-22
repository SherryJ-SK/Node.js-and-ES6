const inquirer = require("inquirer");
const axios = require("axios");
const generateHTML = require("./generateHTML");
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
            .then( (res)=> {
                // console.log("line 32")
                // api.getStars(github)                    
                        return generateHTML({color, ...res.data });

                    // .then(conversion({ htmlJS }), function (err) {
                    //     if (err) {
                    //         throw err;
                    //     };
                    //     console.log(result.numberOfPages);
                    //     console.log(result.log);
                    //     result.stream.pipe(fs.createWriteStream('./html.pdf'));
                    // });                
            })
            .then((htmlData) => {
                console.log(htmlData);

            })

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

