# Profile Generator - Node.js and ES6+
![pdf image](assets/img/pdf.png)

## Description
This command-line application collect user information from the GitHub by entrying GitHub username, and then generates a PDF profile. This application is using Node.js and ES6+, and it is invoked with the command:

```sh
node index.js
```

To generate the PDF profile, the user can enter the GitHub username and the color they preferred in the above command, the application will fatch the below user information from GitHub API:

* Name
* GitHub Username
* GitHub Avatar
* User location
* User bio
* Number of repositries 
* Number of stars
* Number of followings and followers

## How to use
1. Open the index.js in terminal
2. Enter 'node index.js' in the command line
3. Enter GitHub username
4. Choose the preferred color, which will display on the PDF
5. A PDF will be generated and stored in the same folder with the index.js file. 

[Top](#image)