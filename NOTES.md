# NOTES

- [Render dynamic content in Node.js using templates](https://levelup.gitconnected.com/render-dynamic-content-in-nodejs-using-templates-a58cae681148)

## Init project

`package.json`

```json
{
  "name": "type-script-node-ejs-starter",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "tsc && node dist/app.js",
    "dev": "env-cmd ts-node-dev --respawn -- src/app.ts",
    "debug": "env-cmd ts-node-dev --respawn --debug --inspect=9226 -- src/app.ts",
    "kill-port": "fuser -k 9226/tcp"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "ejs": "^3.1.2",
    "express": "^4.17.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.8",
    "@types/node": "^13.1.7",
    "env-cmd": "^10.0.1",
    "nodemon": "^2.0.3",
    "ts-node-dev": "^1.0.0-pre.44",
    "typescript": "^3.7.4"
  }
}
```

## Init TSC

`tsconfig.json`

```shell
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "rootDir": "src",
    "outDir": "dist",
    "sourceMap": true,
    "resolveJsonModule": true,
    "lib": ["es6", "dom"],
    "esModuleInterop": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    ".vscode"
  ]
}
```

## Create Express App

```typescript
import express, { Express, Request, Response } from 'express';

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  debugger;
  res.send('<h1>Welcome to EJS world!</h1>');
});

app.listen(3000, () => {
  console.log('server started on port http://localhost:3000');
});
```

## Install dependencies

```shell
$ npm i
```

## Start Project

```shell
$ touch.env
$ npm run debug
```

## Create View

`views/index.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Index page</title>
  </head>
  <body>
    <h1>This is index page!</h1>
  </body>
</html>
```

add `.set("view engine", "ejs")`

```typescript
const app: Express = express()
  .set("view engine", "ejs");
```

## Add Css Styles

`public/css/styles.css`

```css
body {
  font-family: "Lato", "Helvetica", Helvetica, sans-serif;
  background: #aa9a96;
  color: #f7df1e;
  padding: 20px;
  letter-spacing: 1px;
}
```

Add a link to the css file inside the views/index.ejs file

```html
<link rel="stylesheet" href="/css/styles.css" />
```

> also add following code in `index.js` so we can load all the `html`, `css` and javacript files from the public folder.

```typescript
const app: Express = express()
  .set("view engine", "ejs")
  .use(express.static(path.join(__dirname, '..',"/public")));
```

## Add JavaScript files

`public/js/script.js`

```javascript
console.log("This is coming from script.js");
```

add to `index.ejs`

```html
<body>
  <h1>This is index page!</h1>
  <script src='/js/script.js'></script>
</body>
```

## Better organize files

To include a file inside another file we use the following syntax

```html
<%- include('header.ejs') %>
```

`views/index.ejs`

```html
<%- include('header.ejs') %>
<%- include('content.ejs') %>
<%- include('footer.ejs') %>
```

`views/header.ejs`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Index page</title>
    <link rel="stylesheet" href="/css/styles.css" />
  </head>
  <body>
```

`views/footer.ejs`

```html
<script src="/js/script.js"></script>
</body>
</html>
```

`views/content.ejs`

```html
<div class="login-form">
  <form action="/login" method="post">
    <div class="form-control">
      <label for="name">Name</label>
      <input
        type="text"
        name="name"
        id="username"
        placeholder="Enter your name"
      />
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password"
      />
    </div>
    <div class="form-control">
      <button type="submit" class="btn">Login</button>
    </div>
  </form>
</div>
```

`views/success.ejs`

```html
<%- include('header.ejs') %>
<a href="/" class="link">Go Back</a>
<p>Welcome <%=username%>, You are logged in.</p>
<%- include('footer.ejs') %>
```

`views/failure.ejs`

```html
<%- include('header.ejs') %>
<a href="/" class="link">Go Back</a>
<p>Login failed.</p>
<%- include('footer.ejs') %>
```

`public/css/styles.css`

```css
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Lato", "Helvetica", Helvetica, sans-serif;
  background: #aa9a96;
  color: #f7df1e;
  font-size: 1.8rem;
  padding: 1.2rem;
  letter-spacing: 1px;
}

.login-form {
  width: 60%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  font-size: 2.2rem;
}

.login-form form {
  width: 40%;
}

.form-control {
  margin-bottom: 1rem;
  width: 100%;
}

.form-control label {
  display: block;
  margin-bottom: 1rem;
}

.form-control input {
  padding: 0.375rem 0.75rem;
  width: 100%;
  font-size: 1.3rem;
  line-height: 2;
}

.btn {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  color: #fff;
  background-color: #007bff;
  cursor: pointer;
}

.link {
  display: inline-block;
  margin-bottom: 1rem;
}
```

## BodyParser

To parse the input from the form, install the `body-parser` npm package by running following command from the terminal

```shell
$ npm install body-parser
```

and to inform the express to parse the input as JSON object import that in `index.ts`

```typescript
import bodyParser from 'body-parser';

const app: Express = express()
  .use(bodyParser.urlencoded({ extended: false }))
  ...
```

> the form data will be available in req.body object inside the `/login` route

add `/login` route

```typescript
app.post("/login", (req: Request, res: Response) => {
  const { name, password } = req.body;
  if (name === "admin" && password === "admin") {
    res.render("success", {
      // passing as an object in second argument to the render method so it will be available inside that template
      username: name,
    });
  } else {
    res.render("failure");
  }
});
```

If name and password matches, then we display the `success.ejb` template, otherwise display the `failure.ejb`

> Note: **that to pass data** to the `success.ejb` template, we are **passing as an object in second argument to the render method** so it will be available inside that template.

## Building Github repository listing App using EJS template

Inside index.js add the following route

```shell
$ npm install axios
```

add route

```typescript
app.get("/repos", async (req: Request, res: Response) => {
  const username = req.query.username || "koakh";
  try {
    const result = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    const repos = result.data.map((repo) => ({
      name: repo.name,
      url: repo.html_url,
      description: repo.description,
    }));
    res.render("repos", {
      repos
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while getting list of repositories");
  }
});
```
we are taking the repository data and sending it to the repos.ejb template, we are looping through it and displaying the result.

`views/repos.ejs`

```html
<%- include('header.ejs') %>
<ul class="repos">
  <% repos.forEach(function(repo) { %>
  <li class="repo">
    <h2><a href="<%=repo.url%>" class="repo-title"><%=repo.name%></a></h2>
    <p class="repo-description"><%=repo.description%></p>
  </li>
  <% })%>
</ul>
<%- include('footer.ejs') %>
```

As you can see here, we have **written JavaScript code in between** `<%` and `%>`

## Customize default template directory

By default, EJS will look for `.ejs` files inside the views folder in your project and if it does not find it, it will throw an error.
We can also provide our custom path for views directory.

So if we want to store a views folder inside the templates folder, we can specify the path by setting it to express app.

const path = require("path");
const viewsDirPath = path.join(__dirname, "templates", "views");
app.set("views", viewsDirPath);
