const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);
const pdf = require('html-pdf');

inquirer.prompt(
{message: "Enter your GitHub username:",
  name: "username"
})
.then(function({ username }) {
   
    axios
    .get(`https://api.github.com/users/${username}`)

    .then(async function init(res) {
      try {
        console.log(res)
        const answers = await res;
    var Name = res.data.name;
    var img= res.data.avatar_url
    var FollName = res.data.following;
    var BiName = res.data.bio;
    var BName = res.data.blog;
    var LName = res.data.location;
     var LogName = res.data.login;
     var repo=res.data.public_repos;
     var Followers = res.data.followers;
     var work= res.data.company;
     var github= res.data.url

        const html = generateHTML(answers);
        function generateHTML() {
          return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
          <title>Document</title>
        </head>
        <style>
        .img1{
                position: center;
        }
        </style>
        <body>
        <header>
          <div class="jumbotron jumbotron-fluid">
          </header>
          <div class="container">
          <img class="img1" src= ${img} width="200" height="200">
          <h1>Hi!</h1>
          <h2 class="lead"> My Name is ${Name}</h2>
          <h2 class="lead">Currently ${work}</h2>
          <a href=" ${BName}">Blog </a>
          <a href=" ${github}">GitHub </a>
          <h2 class="lead">Location ${LName}</h2>
             <h2>I build things and teach people to code</h2>
            <h3 class="lead">Bio:  ${BiName}</h3>
            <h2 class="lead"> Puplic Repositories. ${repo} </h2>
            <h2 class="lead"> followers ${Followers}</h2>
            <h2 class="lead"> Following ${FollName}</h2>
          </div>
        </div>
        </body>
        </html>`;
      };
  
        await writeFileAsync("index.html", html);
      
          pdf.create(html).toFile('./class-test.pdf', function (err, res) {
            if (err) return console.log(err);
            console.log(res);
          });
        
        console.log("Successfully wrote to index.html");
     } catch(err) {
        console.log(err);
      }
      
    });
   

  })
 
