const inquirer = require("inquirer");
const axios = require("axios");
const pdf = require('html-pdf');

class DoMyHomework {
  constructor() {
    this.githubUserName = null;
    this.color = null;
  }

  promptUser() {
    return inquirer.prompt([
      {
        message: 'What is your user name',
        name: 'githubUserName'
      }
    ]).then(({ githubUserName }) => {
      this.githubUserName = githubUserName;
      this.makeApiRequest();
    })
  }
  

  makeApiRequest() {
    return Promise.all(
      [
        axios.get(`https://api.github.com/users/${this.githubUserName}`),
        axios.get(`https://api.github.com/users/${this.githubUserName}/starred`)
      ])
      .then((
        [
          {
            data:
            {
              avatar_url,
              location,
              name,
              blog,
              bio,
              public_repos,
              followers,
              following,
              company,
              url
            }
          },
          {
            data:
            {
              length
            }
          }
        ]
      ) => {
        this.avatar_url = avatar_url;
        this.location = location;
        this.name = name;
        this.blog = blog;
        this.bio = bio;
        this.public_repos = public_repos;
        this.followers = followers;
        this.following = following;
        this.stars = length;
        this.work = company;
        this.github = url;
        this.createHtml();
      })
      
  }
  

  createHtml() {
    this.html = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
          <title>Document</title>
        </head>
        <style>
            .container{
                width: 50%;
                height: 100%;
                background-color: rgb(245, 242, 242);
            }
        #img{
            border-radius: 50%;
        }
        .row{
            text-align: center;
        }
        .lead{
            border: 1px solid #000;
            width: 50%;
            background-color: lightcoral;
            height: 50px;
            text-align: center;
        }
        #Header{
            background-color: rgb(127, 127, 210);
           
        }
        #Footer{
            background-color: rgb(127, 127, 210);
            height: 140px;
        }
        #Head{
            background-color: lightcoral;
            width: 50%;
            text-align: center;
        }
        </style>
        <body>
        <header>
          <div id="Header" class="jumbotron jumbotron-fluid"></div>
          </header>
          <div class="container">
              <div id="Head" class="row-8 ">
          <img id="img" src= ${this.avatar_url} width="150" height="150" style=" border-radius: 50%" >
          <h2>Hi!</h2>
          <h3 class="lead2"> My Name is ${this.name}</h3>
          <h4 class="lead2">Currently ${this.work}</h4>
          <a href=" ${this.blog}">Blog </a>
          <a href=" ${this.github}">GitHub </a>
          <h4 class="lead2">Location ${this.location}</h4>
        </div>
        <div class="row-8 ">
          
             <h4>I build things and teach people to code</h4>
            <h4 class="lead">GitHub Stars ${this.stars}</h4>
            <h3 class="lead"> Puplic Repositories. ${this.public_repos} </h2>
            <h3 class="lead"> followers ${this.followers}</h3>
            <h3 class="lead"> Following ${this.following}</h3>
        </div>
          </div>
          <div id="Footer" class="footer"></div>
        </div>
        
        </body>
       
        </html>`;
    
   
    this.createPdf();
  }

  createPdf() {
    pdf.create(this.html).toFile('./class-test.pdf', function (err, res) {
      if (err) return console.log(err);
      console.log(res);
    });
  }

  
}

var newHomework = new DoMyHomework();
newHomework.promptUser();
